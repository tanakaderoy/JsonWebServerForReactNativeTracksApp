const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
    timestamp:{
type: Number
    },
    coords:{
        latitude:{
            type: Number
                },
                longitude:{
            type: Number
                },
                altitude:{
            type: Number
                },
                accuracy:{
            type: Number
                },
                heading:{
            type: Number
                },
                speed:{
            type: Number
                },
    },
    

})

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    default: ""
  },
  locations: [pointSchema]
});

mongoose.model('Track',trackSchema)

