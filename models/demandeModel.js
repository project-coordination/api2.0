const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const demandeSchema = new mongoose.Schema({
    titel: {
        type: String,
        require: true
    },
    name: {
        type:String, 
    },
    email: {
        type:String,
    },
    no: {
        type:Number,  
    },
    startcity: {
        type: String
    },endcity: {
        type: String
    },
    
    neededstorage: {
        type: String
    },
    resourceType: {
        type: String
    },
    vehicleType: {
        type: String
    },
    rout: {
        type: String
    },
    cost: {
        type: Number
    },
    status: {
        type: String
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
},
{timestamps: true});   


//we are genrating token
demandeSchema.methods.genrateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id:this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token:token });
        await this.save();
        return(token);
    } catch (err) {
        console.log(err);
    }
}


module.exports = mongoose.model("mydemande", demandeSchema);