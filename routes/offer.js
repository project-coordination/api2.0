const router = require("express").Router();
const mongoose = require("mongoose");
const Offer = require("../models/offerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Async-Await
router.post("/", async (req, res) => {

    const { titel, name, email, no, startcity, endcity, starttime, endtime,freestorage,resourceType,vehicleType,rout,cost, status} = req.body;
    if ( !titel || !name|| !email|| !no|| !startcity|| !endcity|| !starttime || !endtime || !freestorage || !resourceType  || !vehicleType|| !rout|| !cost|| !status) {
      return res.status(422).json({error:"filled all the fields"});
    }
  
    try {
        
        
        const newOffer = new Offer({ titel, name, email, no, startcity, endcity, starttime, endtime,freestorage,resourceType,vehicleType,rout,cost, status});
  
        const OfferRegister = await newOffer.save();
        const token = await newOffer.genrateAuthToken();
    
        if(OfferRegister) {
          res.status(200).json({message: "Offer registerd succesfully..."});
        } else {
          res.status(500).json({error: "Failed to register"})
        }
  
    } catch(err) {
      console.log(err);
    }
  });
  
  
  router.get("/:id", async (req, res) => {
      try {
        const data = await Offer.findById(req.params.id);
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json(err);
      }
  });
  router.patch("/updateOffer", async (req, res) => {
    const { titel, name, email, no, startcity, endcity, starttime, endtime,freestorage,resourceType,vehicleType,rout,cost, status} = req.body;
    try {
      const OfferExist = await Offer.findOne({ email:email })
      // console.log(userExist);
  
      if(OfferExist) {
        const key = OfferExist._id;
        // console.log(key);
         const updateOffer = new Offer({ titel, name, email, no, startcity, endcity, starttime, endtime,freestorage,resourceType,vehicleType,rout,cost, status});
        Offer.findByIdAndUpdate(key, {
        titel: req.body.titel,
        name: req.body.name,
        email: req.body.email,
        no: req.body.no, 
        startcity: req.body.startcity, 
        endcity: req.body.endcity,
        starttime: req.body.starttime, 
        endtime: req.body.endtime, 
        freestorage: req.body.freestorage, 
        resourceType: req.body.resourceType, 
        vehicleType: req.body.vehicleType,
        rout: req.body.rout, 
        cost: req.body.cost, 
        status: req.body.status}).then(() => 
        {res.status(200).json({message: "Offer Update succesfully..."});
        })
      }
    }
    catch(err) {
    }
  })
  
  router.get("/", async (req, res) => {
    try {
      const data = await Offer.find();
      res.status(200).json(data);
  } catch (err) {
      res.status(500).json(err);
  }
  })
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
    await Offer.findByIdAndRemove(id);
  
    res.json({ message: "Post deleted successfully." });
  });
  
  
  module.exports = router; 