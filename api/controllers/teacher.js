const Teachers = require('../models/teacher.js');

module.exports = {

    // Get all Teachers
    allTeacher: async (req, res, next) => {
        const Teacher = await Teachers.find({})
        res.status(200).json({Teachers: Teacher})
    },

    // Created new Teacher
    newTeacher: async (req, res, next) => {
        const newTeacher = new Teachers(req.body)
        const Teacher = await newTeacher.save()
        res.status(200).json({Teacher: Teacher})
    },

    // Get one Teacher from id
    getOneTeacher: async (req, res, next) => {
        const id = req.params.id
        const Teacher = await Teachers.findById(id)
        res.status(200).json(Teacher)
    },

    // replaceTeacher: async (req, res, next)=>{
    //     const { TeacherId } = req.params.id
    //     const newTeacher = req.body
    //     const oldTeacher =   await Teacher.findByIdAndUpdate(TeacherId, newTeacher)
    //     res.status(200).json({success: true})
    // },

    // Update one Teacher from id
    updateTeacher: async (req, res, next) => {
        const TeacherId = req.params.id
        const newTeacher = req.body
        const oldTeacher = await Teachers.findByIdAndUpdate(TeacherId, newTeacher)
        res.status(200).json(oldTeacher)
    },

    // Delete one Teacher from id
    deleteTeacher: async (req, res, next) => {
        const TeacherId = req.params.id
        await Teachers.findByIdAndRemove(TeacherId)
        res.status(204).json({
            success: true
        })
    }
}