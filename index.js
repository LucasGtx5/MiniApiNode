const express = require('express')
const app = express()
const routes = require('./rotas/routes')



app.use(routes)
app.use(express.json())


app.listen(3000, () => {
    console.log('a api esta rodando em https://localhost/3000')
})

