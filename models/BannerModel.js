const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerModelSchema = new Schema({
   
    
    bigtext: {
      type: String,
      required: true,
    },
    imgurl: {
        type: String,
        required: true,
      },
    
  });

  const Banner = mongoose.model('Banner', bannerModelSchema);

module.exports = Banner;