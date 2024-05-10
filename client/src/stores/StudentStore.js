import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {mande} from 'mande'
//imports mande library
const studentAPI = mande('api/students')
export const useStudentStore = defineStore('students', () => {

    const sortedStudents = ref([])


    const mostRecentStudent = ref( {} )
    const addNewStudentErrors = ref([])
    function getAllStudents (){
        //make api request to get all students and save them in the store - studentlist
        studentAPI.get().then(students =>{
            //students is the JSON response from the API
            sortedStudents.value = students
        }).catch(err =>{
            console.log(err)
            //catch and log the error
        })
    }

    function addNewStudent(student) {
        studentAPI.post(student).then(() =>{
            getAllStudents()
            //make api call to add new student
            //call getallstudents to re-request list of students from api server
        }).catch(err => {
            addNewStudentErrors.value = err.body
            //adds to the student error array
        })
    }

    function deleteStudent(studentToDelete) {
    //     studentList.value = studentList.value.filter( (student) => {
    //         return studentToDelete != student
    //     })
        const  deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then(()=>{
            mostRecentStudent.value = {}
            getAllStudents()
        }).catch(err =>{
            console.log(err)
        })
     }

    function arrivedOrLeft(student) {
        //TODO make api request
        // Returns -1 if the student is not found
        // const studentToModifyIndex = studentList.value.findIndex(s => s.starID == student.starID)
        // if (studentToModifyIndex != -1) {
        //     mostRecentStudent.value = student
        //     studentList.value[studentToModifyIndex] = student
        // }
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then(()=> {
            mostRecentStudent.value = student
            getAllStudents()
        }).catch(err =>{
            console.log(err)
        })
    }

    // const sortedStudents = computed( () => {
    //     return studentList.value.toSorted( (s1, s2) => {
    //         return s1.name.localeCompare(s2.name)
    //     })
    // })

    const studentCount = computed( () => {
        return sortedStudents.value.length
    })

    return {
        // reactive data
        sortedStudents,
        mostRecentStudent,
        addNewStudentErrors,

        // functions
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,
        getAllStudents,
        // computed properties
        studentCount
    }

})