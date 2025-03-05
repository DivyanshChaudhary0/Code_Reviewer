
const projectModel = require("../models/project.model")

const createController = async (req,res) => {
    try{
        const {name} = req.body;
        const existingUser = await projectModel.findOne({ name });

        if (existingUser) {
            return res.status(400).json({message: "project is already exist"});
        }

        if(!name){
            return res.status(400).json({message: "name is required"})
        }

        const project = await projectModel.create({
            name,
            code: " "
        })

        res.status(201).json({
            data: project
        })
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}

const listController = async (req,res) => {
    try{
        const projects = await projectModel.find();
        res.status(200).json({
            data: projects
        })
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    createController,
    listController
}