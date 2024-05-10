module.exports = (sequelize, DataTypes) => {
    //defines the model
    const Student = sequelize.define('Student', {
        //defines the columns in the database
        //gives them a name and a type
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }//validation against leaving an empty string
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false
            }
            //todo future = check for aa1234aa
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    })
    //create or update table in the database
    Student.sync({force: false}).then( () =>{
        //force:true means update every time the app restarts
        console.log('Synced student table')
    })
    return Student

}