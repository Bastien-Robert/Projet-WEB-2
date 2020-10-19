const express = require('express')
const { push } = require('../data/articles.js')
const router = express.Router()
const articles = require('../data/articles.js')

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}


const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'mdpsuperuser',
 database: 'Projet'
})

client.connect()


async function save(email,password){
  const sql = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *"
  return await client.query({
    text: sql,
    values: [email, password]
  })
}

async function verifmail(email) {
  return await client.query({
      text: "SELECT * FROM users WHERE email=$1",
      values: [email]
  })
}

async function verifIdentifiants(email, password) {
  return await client.query({
      text: "SELECT * FROM users WHERE email=$1 AND password=$2",
      values: [email, password]
  })
}


router.post('/register', (req, res)=>{
  const email = req.body.email;
  const password = req.body.password;

  verifmail(email).then(result =>{
    if (result.rowCount >=1){
      res.status(500).json({message: 'mail deja utilisé'})
    }

    bcrypt.hash(password, 10).then(hash => {
      save(email, hash).then(resultInsert =>{
        console.log(resultInsert)
        res.json({email:resultInsert.rows[0].email})

      })
    })
  })
})

router.post('/login', (req, res)=>{
  const email = req.body.email;
  const password = req.body.password;

  verifmail(email).then(result =>{
    if (result.rowCount <=0){
      res.status(500).json({message: 'identifiants incorrectes'})
      return
    }
    const MDP=result.rows[0].password;

    bcrypt.compare(password,MDP).then(accepte => {
      if(accepte){
        req.session.userId = result.rows[0].id
        res.send()
        return
      }
      else{
        res.status(500).json({message: 'identifiants incorrectes'})
      }
    })
})
})




/**
 * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
 * Ces requêtes concernent l'ajout ou la suppression d'articles sur le site
 * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
 *
 * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
 * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
 */

/**
 * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

/*
 * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
 */
router.get('/panier', (req, res) => {
  console.log(req.session.panier.articles)
  res.json(req.session.panier.articles)
})

/*
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité voulue
 */
router.post('/panier', (req, res) => {
  var i=1
  var ID=2
  var nb=5
  for (i=0;i<=articles.length;i++){
    console.log(articles[i])
    
    if (i==ID){
      if (req.session.panier.articles.indexOf(articles[i])!=-1){
        res.status(400).json({ message: 'bad request' })
      }
      req.session.panier.articles.push(articles[i])
      console.log(req.session.panier.articles)
    }
    if (i>articles.length){
      res.status(404).json({ message: 'Not found' })
    }
    if (nb<0){
      res.status(400).json({ message: 'bad request' })
    }
  } 
  console.log(req.session.panier.articles)
  res.json(req.session.panier.articles)
})

/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {
  var nom ="Blesse"
  var prenom="Louis"
  req.session.destroy()
  res.send("Merci "+ prenom+" "+ nom+ " pour votre achat")
})

/*
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:articleId', (req, res) => {
  var articleId=1
  var nb=3
  if (articleId < req.session.panier.articles.length || nb <1){
    res.status(501).json({ message: 'Not implemented' })
  }
  else{
    nb=4
  }
  console.log(nb)
  res.json(nb)
})

/*
 * Cette route doit supprimer un article dans le panier
 */
router.delete('/panier/:articleId', (req, res) => {
  var articleId=1
  if (articleId < req.session.panier.articles.length){
    res.status(501).json({ message: 'Not implemented' })
  }
  else{
    delete req.session.panier.articles[articleId]
    console.log(req.session.panier.articles)
    res.json(req.session.panier.articles)
  }
})


/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', (req, res) => {
  res.json(articles)
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = parseInt(req.body.price)

  // vérification de la validité des données d'entrée
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const article = {
    id: articles.length + 1,
    name: name,
    description: description,
    image: image,
    price: price
  }
  articles.push(article)
  // on envoie l'article ajouté à l'utilisateur
  res.json(article)
})

/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const article = articles.find(a => a.id === req.articleId)
  if (!article) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = article
  next()
}

router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    req.article.name = name
    req.article.description = description
    req.article.image = image
    req.article.price = price
    res.send()
  })

  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex(a => a.id === req.articleId)

    articles.splice(index, 1) // remove the article from the array
    res.send()
  })

module.exports = router
