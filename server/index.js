const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

const names = [
    {name: 'Maito'},
    {name: 'Mehu'},
    {name: 'Kynsilakka'}
]

app.get("/",(req, res) => {
    res.status(200).json(names)
})

app.post("/new", (req,res) => {
    names.push(req.body) // {name : 'Markku'}
    res.status(200).json(req.body)

})

app.delete("/delete/:name",(req,res) => {
    names.splice(names.findIndex(e => e.name===req.params.name),1)
    console.log(names)
    res.status(200).json(req.params.name)
})


app.listen(port, () => {
    //console.log("server is running on port " + port)
    console.log(`Server is running on port ${port}`)
})