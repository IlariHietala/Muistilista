const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

const names = [
    {name: 'Jouni'},
    {name: 'Tuula'},
    {name: 'Teppo'}
]

app.get("/",(req, res) => {
    res.status(200).json(names)
})

app.post("/new", (req,res) => {
    names.push(req.body)
    res.status(200).json(req.body)

})

app.listen(port, () => {
    //console.log("server is running on port " + port)
    console.log(`Server is running on port ${port}`)
})