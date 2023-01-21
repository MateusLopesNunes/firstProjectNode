const router = require('express').Router()
const { json } = require('express/lib/response')
const Person = require('../models/Person')


router.post('/', async (req, res) => {
    const {name, salary, aproved} = req.body

    if (!name) {
        res.status(422).json({error: 'O campo nome é obrigatório'})
        console.log('error')
        return
    }

    if (!salary) {
        res.status(422).json({error: 'O campo salario é obrigatório'})
        console.log('error')
        return
    }

    if (!aproved) {
        res.status(422).json({error: 'O campo aprovado é obrigatório'})
        console.log('error')
        return
    }

    const person = {
        name,
        salary,
        aproved
    }

    try {
        await Person.create(person)
        res.status(201).json({message: 'Pessoa inserida com sucesso'})
    }
    catch(ex) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    }
    catch(ex) {
        res.status(500).json({error: ex})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})  //filtro
        //const person = await Person.findById(id)

        if (!person) {
            res.status(404).json({error: 'Usuário não encontrado'})
            console.log('error')
            return
        }

        res.status(200).json(person)
    }
    catch(ex) {
        res.status(500).json({error: ex})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, salary, aproved} = req.body

    const person = {
        name,
        salary,
        aproved
    }

    try {
        const updatePerson = await Person.updateOne({_id: id}, person)

        if (updatePerson.matchedCount === 0) {
            res.status(404).json({error: 'Usuário não encontrado'})
            return
        }

        res.status(200).json(person)
    }
    catch(ex) {
        res.status(500).json({error: ex})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id})  //filtro
        //const person = await Person.findById(id)

    if (!person) {
        res.status(404).json({error: 'Usuário não encontrado'})
        console.log('error')
        return
    }

    try {
        const deletePerson = await Person.deleteOne({_id: id})
        res.status(200).json({message: 'Usuário deletado com sucesso'})
    }
    catch(ex) {
        res.status(500).json({error: ex})
    }
})

module.exports = router