const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

//--- express stuff here
let persons = [{
    "persons": [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "sdfdff",
        "number": "sdffd",
        "id": 4
      }
    ]
  }]

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

   app.get('/info', (req, res) => {
     let msg ="puhelinluettelossa on " +persons[0].persons.length + " nimeä<p> nyt on " + new Date().toISOString()
    res.send(msg)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons[0].persons.find(person => {
      //console.log(parseInt(id), person.id, person.id === parseInt(id))
      return person.id === id
    })
    if(!person) {
      res.status(404).end()
    }else {
      res.json(person)
    }
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    //delete person
    persons[0].persons = persons[0].persons.filter(person => person.id !== id)
    res.status(204).end()
  })
 
  app.post('/api/persons', (req, res) => {
    const person = req.body
    person.id = Math.floor(Math.random() * 1111)
    //console.log(person)
    persons[0].persons.push(person)
    res.json(persons)
  })
//-------
const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)