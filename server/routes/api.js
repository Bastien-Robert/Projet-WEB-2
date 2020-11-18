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

    if (typeof email !== 'string' || email === '' ||
        typeof password !== 'string' || password === '') {
        res.status(400).json({ message: 'bad request' })
        return
    }

    verifmail(email).then(result => {
        if (result.rowCount >= 1) {
            res.status(500).json({ message: 'mail deja utilisé' })
        }

        bcrypt.hash(password, 10).then(hash => {
            save(email, hash).then(resultInsert => {
                res.json({ email: resultInsert.rows[0].email })
            })
        })
    })
})

router.post('/connexion', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (typeof email !== 'string' || email === '' ||
        typeof password !== 'string' || password === '') {
        res.status(400).json({ message: 'bad request' })
        return
    }


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
            } else {
                res.status(500).json({ message: 'identifiants incorrectes' })
            }
        })
    })
})

/**
 *  Composant
 */

router.get('/composant', async(req, res) => {
    // verifie si utilisateur connecté
    if (req.session.userId === undefined) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }

    // reenvoyer une reponse au client
    let result = await client.query({
        text: "SELECT * FROM composants"
    })

    res.json(result.rows)
})

router.get('/composant/:id', async(req, res) => {
    // récuperer l'information dans l'url
    let id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ message: 'bad request' })
        return
    }

    // verifie si utilisateur connecté
    if (req.session.userId === undefined) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }
    // reenvoyer une reponse au client
    let result = await client.query({
        text: "SELECT * FROM composants WHERE id=$1",
        values: [id]
    })

    res.json(result.rows[0])
})

router.get('/composant/:type', async(req, res) => {
    // récuperer l'information dans l'url
    let type = parseInt(req.params.type);

    // verifie si utilisateur connecté
    if (req.session.userId === undefined) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }
    // reenvoyer une reponse au client
    let result = await client.query({
        text: "SELECT * FROM composants WHERE type=$1",
        values: [type]
    })

    res.json(result.rows[0])
})

router.post('/composant', async(req, res) => {
    // récuperer l'information
    const type = req.body.type;
    const marque = req.body.marque;
    const nom = req.body.nom;
    const prix = parseInt(req.body.prix);
    const image = req.body.image;

    //verifie la fiabilité de l'info
    if (typeof type !== 'string' || type === '' ||
        typeof marque !== 'string' || marque === '' ||
        typeof nom !== 'string' || nom === '' ||
        typeof image !== 'string' || image === '' ||
        isNaN(prix)) {
        res.status(400).json({ message: 'bad request' })
        return
    }
    // verifie si utilisateur connecté
    if (req.session.userId === undefined) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }

    // ajouter le composant
    let result = await client.query({
        text: "INSERT INTO composants (type, marque, nom, prix, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        values: [type, marque, nom, prix, image]
    })

    // reenvoyer une reponse au client
    res.json(result.rows[0])
})


router.put('/composant/:id', async(req, res) => {
    // récuperer l'information dans l'url
    let id = parseInt(req.params.id);

    // récuperer l'information dans body
    const type = req.body.type;
    const marque = req.body.marque;
    const nom = req.body.nom;
    const prix = parseInt(req.body.prix);
    const image = req.body.image;

    //verifie la fiabilité de l'info
    if (typeof type !== 'string' || type === '' ||
        typeof marque !== 'string' || marque === '' ||
        typeof nom !== 'string' || nom === '' ||
        typeof image !== 'string' || image === '' ||
        isNaN(prix) || isNaN(id)) {
        res.status(400).json({ message: 'bad request' })
        return
    }
    // verifie si utilisateur connecté
    if (req.session.userId === undefined) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }

    // modifier le composant
    let result = await client.query({
        text: "UPDATE composants SET (type, marque, nom, prix, image) VALUES ($1, $2, $3, $4, $5) WHERE id=$6 RETURNING *",
        values: [type, marque, nom, prix, image, id]
    })

    // reenvoyer une reponse au client
    res.json(result.rows[0])
})

router.delete('/composant/:id', async(req, res) => {
    // récuperer l'information dans l'url
    let id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ message: 'bad request' })
        return
    }

    // verifie si utilisateur connecté
    if (req.session.userId === undefined) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }
    // reenvoyer une reponse au client
    await client.query({
        text: "DELETE FROM composants WHERE id=$1",
        values: [id]
    })

    res.send()
})




//composants

router.get('/Avousdejouer', async(req, res) => {
    // verifie si utilisateur connecté
    if (req.session.userId === undefined) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }

    // reenvoyer une reponse au client
    let result = await client.query({
        text: "SELECT * FROM ordinateurs WHERE username=$1",
        values:[req.session.userId]
    })

    res.json(result.rows)
})

router.post('/Avousdejouer', async(req, res) => {
    // récuperer l'information
    const username = req.session.userId;
    const cpu = req.body.cpu;
    const gpu = req.body.gpu;
    const refroidissement = req.body.refroidissement;
    const stockage = req.body.stockage;
    const alimentation = req.body.alimentation;
    const ram = req.body.ram;

    // verifie si utilisateur connecté
    if (req.session.userId === undefined) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }

    // ajouter le composant
    let result = await client.query({
        text: "INSERT INTO ordinateurs (username, cpu, gpu, refroidissement, stockage, alimentation, ram) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        values: [username, cpu, gpu, refroidissement, stockage, alimentation, ram]
    })

    // reenvoyer une reponse au client
    res.json(result.rows[0])
})


module.exports = router