const Meshs = require('../models/mesh.js');

module.exports = {

    // Get all Meshs
    allMesh: async (req, res, next) => {
        const Mesh = await Meshs.find({})
        res.status(200).json({Meshs: Mesh})
    },

    // Created new Mesh
    newMesh: async (req, res, next) => {
        const {matter, idMetter, dayClass, teacher, semester, hourStart, hourEnd, career, room} = req.body;
        let data = {hourStart, hourEnd, room, semester}
        const cruce = await Meshs.find({data})
        if(!cruce){
            const newMesh = new Meshs({matter, idMetter, dayClass, teacher, semester, hourStart, hourEnd, career, room})
            const Mesh = await newMesh.save()
            res.status(200).json({Mesh: Mesh})
        }else{
            res.status(404).json({message: "Cruce de horarios"})
        }
    },

    // Get one Mesh from id
    getOneMesh: async (req, res, next) => {
        const id = req.params.id
        const Mesh = await Meshs.findById(id)
        res.status(200).json(Mesh)
    },

    // replaceMesh: async (req, res, next)=>{
    //     const { MeshId } = req.params.id
    //     const newMesh = req.body
    //     const oldMesh =   await Mesh.findByIdAndUpdate(MeshId, newMesh)
    //     res.status(200).json({success: true})
    // },

    // Update one Mesh from id
    updateMesh: async (req, res, next) => {
        const MeshId = req.params.id
        const newMesh = req.body
        const oldMesh = await Meshs.findByIdAndUpdate(MeshId, newMesh)
        res.status(200).json(oldMesh)
    },

    // Delete one Mesh from id
    deleteMesh: async (req, res, next) => {
        const MeshId = req.params.id
        await Meshs.findByIdAndRemove(MeshId)
        res.status(204).json({
            success: true
        })
    }
}