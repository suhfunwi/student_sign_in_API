const express = require('express')
const database = require('../models')
//will require the index.js file from this directory
const Student = database.Student
//the student model
const router = express.Router()
router.get('/students', function (req,res,next){
    //queries database, gets all files from DB,
    //converts to JSON
    //available in the then function
    Student.findAll({order: ['name']}).then(students =>{
        //sorts students by name
        return res.json(students)
    })
})
router.post('/students', function (req, res, next){
    const newStudent = req.body
    //whatever data the client sends about the new student
    console.log(newStudent)
    Student.create(newStudent).then(result =>{
        return res.status(201).send('New student created')
        //status codes in the 200s usually mean things worked
    }).catch( err =>{
        //400 = bad request = client is sending a request the server can't fulfill
        if (err instanceof database.Sequelize.ValidationError){
            const messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        } else {
            //some other error?
            next(err)
        }
    })
})

router.patch('/students/:id'), function (req, res, next) {
    //matches request to /students/1
//    /students/2 etc
    //req.params stores the id value
    //stores any placeholders in the url
    const studentID = req.params.id
    const updatedStudent = req.body
    //updated data about this student
    console.log(updatedStudent)
    Student.update(updatedStudent, {where: {id: studentID}}).then((result) => {
        //student update finds the row of the student that matches the id and update their info
        const rowsModified = result[0]
        //if 1 row was changed, student was found and updated
        if (rowsModified === 1) {
            return res.send('ok')
        } else {
            res.status(404).send('Student not found')
            //if 0 rows were updated student wasn't found
        }
    }).catch(err => { //database error
        //400 = bad request = client is sending a request the server can't fulfill
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        } else {
            //some other error?
            next(err)
        }
    })
}
router.delete('/students/:id', function (req, res, next){
    const studentID = req.params.id
    Student.destroy({where: {id: studentID}}).then((rowsDeleted)=>{
        // delete request to /api/students/2 will delete student id 2
        if (rowsDeleted === 1) { //student was found and deleted
            return res.send('Student deleted')
        } else {// 0 rows got deleted - student with that id is not in database
            return res.status(404).send('Student not found')
        }
    }).catch(err => {
        return next(err)
    })
})
    module.exports = router

//makes this code available
