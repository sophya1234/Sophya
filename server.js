const express = require('express')
const fs = require('fs')
const app = express()
 

app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.post('/create', (req, res) => {
fs.writeFileSync(req.body.email+'.json', JSON.stringify(req.body))
res.send({message: "Dados salvos com sucesso!"})
})
https://github.com/sophya1234/TP2-2023-Sophya.git
app.get('/read', (req, res) => {
res.send({lista: fs.readdirSync('./').filter(e => e.includes('.json') && e.includes('@')) })
})

app.get('/read/:email', (req, res) => {
res.send(JSON.parse(fs.readFileSync(req.params.email+'.json')))
})
app.delete('/delete/:email', (req, res) => {
fs.unlinkSync(req.body.email+'.json')
res.send({message: "Dados apagados com sucesso!"})
})
app.put('/update/:email', (req, res) => {
fs.writeFileSync(req.body.email+'.json', JSON.stringify(req.body), {flag: 'w'})
res.send({message: "Dados atualizados com sucesso!"})
})

app.listen(3000, () => console.log(`server rodando`))
// Teste para o git