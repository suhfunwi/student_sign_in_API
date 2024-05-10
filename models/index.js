const {Sequelize, DataTypes} = require('sequelize')
const configJson = require('../config.json')
const createStudentModel = require('./student')
const env = process.env.NODE_ENV || 'development'
//looks for an env(environment) variable called NODE_ENV amd read its value
//environment variables are set for your whole computer(or for a server)
//any app running on that computer or server can read the environment variable
//at Azure, we'll create an environment variable for your server called NODE_ENV and set it to "production"
//if there is not NODE_ENV set, like on your computer, we''l use the value development

const config = configJson[env]
//read the configuration object for 'development' or 'production'

const sequelize = new Sequelize(config)

const database = {
    sequelize: sequelize,
    //sequelize object
    Sequelize: Sequelize
    //sequelize library
}

const studentModel = createStudentModel(sequelize,DataTypes)
const studentModelName = studentModel.name //'Student'
database[studentModelName] = studentModel
module.exports = database
//all this means is tell the database to connect to the SQLite or SQLserver that we want to use,
//set up the student table then make it ready to use