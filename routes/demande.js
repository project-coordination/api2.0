const router = require("express").Router();
const mongoose = require("mongoose");
const demande = require("../models/demandeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Async-Await
router.post("/", async (req, res) => {

    const { titel, name, email, no, startcity, endcity, neededstorage,resourceType,vehicleType,rout,cost, status} = req.body;
    if ( !titel || !name|| !email|| !no|| !startcity|| !endcity|| !neededstorage || !resourceType  || !vehicleType|| !rout|| !cost|| !status) {
      return res.status(422).json({error:"filled all the fields"});
    }
  
    try {
        
        
        const newdemande = new demande({ titel, name, email, no, startcity, endcity,neededstorage,resourceType,vehicleType,rout,cost, status});
  
        const demandeRegister = await newdemande.save();
        const token = await newdemande.genrateAuthToken();
    
        if(demandeRegister) {
          res.status(200).json({message: "demande registerd succesfully..."});
        } else {
          res.status(500).json({error: "Failed to register"})
        }
  
    } catch(err) {
      console.log(err);
    }
  });
  
  
  router.get("/:id", async (req, res) => {
      try {
        const data = await demande.findById(req.params.id);
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json(err);
      }
  });
  router.patch("/updatedemande", async (req, res) => {
    const { titel, name, email, no, startcity, endcity,neededstorage,resourceType,vehicleType,rout,cost, status} = req.body;
    try {
      const demandeExist = await demande.findOne({ email:email })
      // console.log(userExist);
  
      if(demandeExist) {
        const key = demandeExist._id;
        // console.log(key);
         const updatedemande = new demande({ titel, name, email, no, startcity, endcity,neededstorage,resourceType,vehicleType,rout,cost, status});
        demande.findByIdAndUpdate(key, {
        titel: req.body.titel,
        name: req.body.name,
        email: req.body.email,
        no: req.body.no, 
        startcity: req.body.startcity, 
        endcity: req.body.endcity,       
        neededstorage: req.body.neededstorage, 
        resourceType: req.body.resourceType, 
        vehicleType: req.body.vehicleType,
        rout: req.body.rout, 
        cost: req.body.cost, 
        status: req.body.status}).then(() => 
        {res.status(200).json({message: "demande Update succesfully..."});
        })
      }
    }
    catch(err) {
    }
  })
  
  router.get("/", async (req, res) => {
    try {
      const data = await demande.find();
      res.status(200).json(data);
  } catch (err) {
      res.status(500).json(err);
  }
  })
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
    await demande.findByIdAndRemove(id);
  
    res.json({ message: "Post deleted successfully." });
  });
  
  
  module.exports = router; 