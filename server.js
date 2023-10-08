const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()

if(process.env.config === 'dev'){
    dotenv.config({
        path: './config/.env.dev'
    })
}
if(process.env.config ===  'prod'){
    dotenv.config({
        path: './config/.env.prod'
    })
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(process.env.DB)
.then(() => console.log('Mongodb Conectado!'))
.catch(err => console.log('err' + err))

const usuarios = mongoose.Schema({
    _id: {
        type: String
    },
    nome: {
        type: String
    },
    email: {
        type: String
    },
    senha: {
        type: String
    }
})

mongoose.model('usuarios', usuarios)
const Usuario = new mongoose.model('usuarios')

app.post('/create', async (req, res) => {
    let _id = req.body._id
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha
    await Usuario.insertMany({
        _id,
        nome,
        email,
        senha,
    })
    res.send({ message: "Dados salvos com sucesso!" })
})
https://github.com/sophya1234/TP2-2023-Sophya.git
app.post('/read', async (req, res) => {
   const showUser = await Usuario.findOne({_id: req.body._id})
   res.send({ message: showUser })
})

app.put('/update/:id', async (req, res) => {
    const update = await Usuario.findOneAndUpdate({ _id: req.params.id }, req.body)
    if(!update) return res.send({ message: "id inexistente" })
    res.send({ message: "Dados atualizados! dados antigos: ",data: update })
})

app.delete('/delete/:id', async (req, res) => {
    const data = await Usuario.findOneAndDelete({ _id: req.params.id }, { _id: req.params.id })
    if(!data) return res.send({ message: "id inexistente!" })
    res.send({ message: "Dados apagados com sucesso!" }) 
})

app.use((req, res) => {
    res.send({ message: 'Rota Inexistente!' })
})
app.listen(3000, () => console.log(`server rodando`))