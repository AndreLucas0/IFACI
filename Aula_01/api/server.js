const express = require('express')
const cors = require('cors')
const api = express()

//Middlewares
api.use(express.json())
api.use(cors())

const users = []
const sensors = []
let id = 0;

//Rotas users
api.get('/usuarios', (req, res)=>{
    let usuarios = users;

    res.status(200).send(usuarios)
})


api.post('/novoUsuario',(req, res)=>{
    if(users.length <= 0){
        id = 0;
    }
    id = id + 1; //incremento
    
    let user = {
        id: id,
        nome_completo: req.body.nome_completo,
        email: req.body.email,
        senha: req.body.senha
    }
    users.push(user)
    res.status(201).send({
        code: 201,
        msg: "Usuário Criado com sucesso!"})
})
api.delete('/usuarios/:id', (req, res)=>{
    let id = req.params.id
    let index = users.findIndex(p => p.id === parseInt(id))

    if(index !== -1){
        users.splice(index, 1);
        
        return res.status(200).send({
            code: 200,
            msg: "Usuário deletado com sucesso!"
        })
    }
    else{
        return res.status(404).send({
            code: 404,
            msg: "Usuário não encontrado"
        })
    }

})
api.put('/usuarios/:id', (req, res)=>{
    let id = req.params.id
    let newBody = req.body
    let index = users.findIndex(p => p.id === parseInt(id))

    if(index !== -1){
        users[index] = {id: parseInt(id), ...newBody}
        return res.status(200).send({
            code: 200,
            msg: "Usuário editado com sucesso!"
        })
    }
    else{
        return res.status(404).send({
            code: 404,
            msg: "Usuário não encontrado"
        })
    }
})

//Rotas IoT
api.get('/sensores', (req, res) => {
    let sensores = sensors;
    res.status(200).send(sensores)
})

api.post('/sensores', (req, res) => {
    if(users.length <= 0){
        id = 0;
    }
    id = id + 1; //incremento
    
    let sensor = {
        id: id,
        nome_sensor: req.body.nome_sensor,
        temperatura: req.body.temperatura,
        pressao: req.body.pressao,
        umidade: req.body.umidade,
        status_presenca: req.body.status_presenca,
        status_rele: req.body.status_rele
    }
    sensors.push(sensor)
    res.status(201).send({
        code: 201,
        msg: "Sensor Criado com sucesso!"})
})

api.put('/sensores/:id', (req, res) => {
    let id = req.params.id
    let newBody = req.body
    let index = sensors.findIndex(s => s.id === parseInt(id))

    if(index !== -1){
        sensors[index] = {id: parseInt(id), ...newBody}
        return res.status(200).send({
            code: 200,
            msg: "Sensor editado com sucesso!"
        })
    }
    else{
        return res.status(404).send({
            code: 404,
            msg: "Sensor não encontrado"
        })
    }
})

api.delete('/sensores/:id', (req, res) => {
    let id = req.params.id
    let index = sensors.findIndex(s => s.id === parseInt(id))

    if(index !== -1){
        sensors.splice(index, 1);
        
        return res.status(200).send({
            code: 200,
            msg: "Sensor deletado com sucesso!"
        })
    }
    else{
        return res.status(404).send({
            code: 404,
            msg: "Sensor não encontrado"
        })
    }
})

const porta = 8080;
api.listen(porta, ()=>{
    console.log(`API rodando na porta ${porta}`)
})