const projectModel = require("../models/project.model");
const geminiCodeReview = require("../services/gemini.service");

const createController = async (req, res) => {
  try {
    const { name } = req.body;
    const existingUser = await projectModel.findOne({ name });

    if (existingUser) {
      return res.status(400).json({ message: "project is already exist" });
    }

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const project = await projectModel.create({
      name,
      code: " ",
    });

    res.status(201).json({
      data: project,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const listController = async (req, res) => {
  try {
    const projects = await projectModel.find();
    res.status(200).json({
      data: projects,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const reviewCodeController = async (req,res) => {

  const {code} = req.body;

  // const code = `function(){
  //   return a+b;
  // }`

  const response = await geminiCodeReview(code)
  
  res.status(200).json({
    response
  });
};

const updateController = async (req,res) => {
  try{
    const projectId = req.params.projectId;
    const {code} = req.body
    const project = await projectModel.findOneAndUpdate({_id: projectId}, {code}, {new:true})
    res.status(200).json({
      project
    })
  }
  catch(err){
    res.status(400).json({
      message: err.message
    })
  }
}

const getCodeController = async function(req,res){
  try{
    const projectId = req.params.projectId;
    const project = await projectModel.findById(projectId)
    res.status(200).json({
      code: project.code
    })
  }
  catch(err){
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = {
  createController,
  listController,
  reviewCodeController,
  updateController,
  getCodeController
};
