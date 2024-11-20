const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')

const app = express()
const port  = 8000
app.use(express.urlencoded({extended:true}))

app.get('/api/users',(req,res)=>{
    return res.json(users)
})

app.get('/users',(req,res)=>{
    const html = `
    ${users.map((users)=>`<li>${users.first_name}</li>`).join("")}
    
    `
    return res.send(html)
})

app.get('/api/users/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user)
})

app.post('/api/users',(req,res)=>{
    const body = req.body
    users.push({...body, id: users.length +1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
        return res.json({status:"done"})
    })
    
})

app.put('/api/users/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const body = req.body
    const putuser = users.findIndex(user => user.id === id)

    users[putuser] = {...users[putuser],...body}
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
        return res.json({status:"done"})
    })
    
})

app.delete('/api/users/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const deluser = users.findIndex(user=>user.id === id)

    users.splice(deluser,1)
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
        return res.json({status:"done"})
    })
})

app.listen(port,()=>console.log("server is running on port: ",port))