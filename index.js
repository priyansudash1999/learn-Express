import express from "express";

const app = express()
const port = 3000

/*
app.get("/", (req, res) => {
    res.send("Hello users...")
})

app.get("/tea", (req, res) => {
    res.send("Hello users... take your tea")
})

app.get("/twitter", (req, res) => {
    res.send("Hello users... its my twitter account 'priyansu.com'")
})

*/

app.use(express.json())

let tea_data = []
let next_id= 1


// add new tea
app.post('/tea', (req, res) => {
    const {name, price} = req.body
    const  newTea = {id: next_id++, name, price}
    tea_data.push(newTea)
    res.status(201).send(newTea)
})

// get all tea
app.get('/tea', (req, res) => {
    res.status(200).send(tea_data)
})

// get a tea with id
app.get('/tea/:id', (req, res) => {
    console.log("Requested ID:", req.params.id);
    console.log("Current Tea Data:", tea_data);

    const search_tea = tea_data.find(tea => tea.id === parseInt(req.params.id))
    if(!search_tea){
        return res.status(404).send("tea not found")
    }
    else{
        return res.status(200).send(search_tea)
    }
})

// update tea
app.put('/tea/:id', (req, res)=>{
    const id = req.params.id
    const tea = tea_data.find(tea => tea.id === parseInt(id))
    if(!tea){
        return res.status(404).send("tea not found")
    }
    else{
        const {name, price} = req.body
        tea.name = name
        tea.price = price
        res.status(200).send("Updated")
    }
})

// delete tea
app.delete('/tea/:id', (req, res) => {
    const index = tea_data.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("tea not found")
    }
    tea_data.splice(index, 1)
    return res.status(200).send("Deleted")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})