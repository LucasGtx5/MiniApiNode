const express = require('express')
const routes =  express.Router()
const db = require('../db.json')
const fs = require('fs')
const app = express()

routes.use(express.json())

module.exports = routes


//retorna todos clientes
routes.get('/clientes', (req, res) => {
    res.json(db)
})


// cadastra cliente
routes.post('/cadastrar', (req, res) => {
    const body = req.body;
    const data = [...db, body]
   
    if(!body){
      return  res.status(404).send('sem corpo')
    }

    for (const key in db){
        const id = db[key].id
    if (id === body.id){
        return res.status(404).send('ID já esta cadastrado')
    }
    }

    fs.writeFileSync('db.json', JSON.stringify(data))

    return res.status(201).send(body)
})


// deleta cliente
routes.delete('/deletar/:id', (req, res) => {
    const id = req.params.id
    const result = db.find(cliente => cliente.id === id )
    if (!result){
        res.status(404).send("não exites")
    }

    const data = db.filter((cliente) =>{
       return cliente.id !== id
    } )

    fs.writeFileSync('db.json', JSON.stringify(data))
    const clientes = res.json(db)
    return res.status(201).send(clientes)
})


//busca cliente por id
routes.get('/cliente/:id', (req, res) => {
        const id = req.params.id
        const result = db.find(cliente => cliente.id === id)
        if(!result){
            return res.status(404).send("ID não existe")
        }

        return res.status(201).json(result)
})


//altera cliente
routes.put('/alterar/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    const result = db.find(cliente => cliente.id === id)
    if (!result){
        return res.status(404).send('id não existe')
    }


    const data = db.map((cliente) => {
        if (cliente.id === id) {
            const dados = {
                id : id,
                ...body
            }

            return dados
        }

        return cliente
    
        
    })

    fs.writeFileSync('db.json', JSON.stringify(data))

        return res.status(200).json(body)
})