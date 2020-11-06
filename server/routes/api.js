const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'mdpsuperuser',
    database: 'Projet'
})
client.connect()




/**
 * Connection
 */
async function save(email, password) {
    const sql = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *"
    return await client.query({
        text: sql,
        values: [email, password]
    })
}

async function addComposant(composant, marque, nom, prix, image) {
    const sql = "INSERT INTO articles (composant, marque, nom, prix, image) VALUES ($1, $2, $3, $4, $5) RETURNING *"
    return await client.query({
        text: sql,
        values: [composant, marque, nom, prix, image]
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


router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    verifmail(email).then(result => {
        if (result.rowCount >= 1) {
            res.status(500).json({ message: 'mail deja utilisé' })
        }

        bcrypt.hash(password, 10).then(hash => {
            save(email, hash).then(resultInsert => {
                console.log(resultInsert)
                res.json({ email: resultInsert.rows[0].email })

            })
        })
    })
})

router.post('/connexion', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    verifmail(email).then(result => {
        if (result.rowCount <= 0) {
            res.status(500).json({ message: 'identifiants incorrectes' })
            return
        }
        const MDP = result.rows[0].password;

        bcrypt.compare(password, MDP).then(accepte => {
            if (accepte) {
                req.session.userId = result.rows[0].id
                res.send()
                return
            } else {
                res.status(500).json({ message: 'identifiants incorrectes' })
            }
        })
    })
})

router.post('/ajouter', (req,res) =>{
    const composant = req.body.composant.composant;
    const marque = req.body.composant.marque;
    const nom = req.body.composant.nom;
    const prix = req.body.composant.prix;
    const image = req.body.composant.image;

    addComposant(composant, marque, nom, prix, image)
})


module.exports = router