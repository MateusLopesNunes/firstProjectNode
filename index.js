const express = require("express")
const mongoose = require("mongoose")
const app = express()

const personRoutes = require('./routes/personRoutes')

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use('/person', personRoutes)

app.get('/', (req, res) => {
    res.json({message: 'oi express!'})
})

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.x7vfvui.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    console.log('Conexão realizada com sucesso')
    app.listen(3000)
})
.catch((ex) => console.log(ex))


