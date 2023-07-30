const users = require('../models/users');
const data = require('../models/Data/heliverse_mock_data.json');



module.exports.users = async (req,res) => {
  
   const {page} = req.params;
   const limit = 20;
   const skip = (page - 1) * limit
   const limitData = await users.find().skip(skip).limit(limit);
   const  allData= await users.find();

  

   if(limitData){
    res.json({limitData,nbPages:allData.length});
   }else{
    res.status(404).json('Not Found');
   }


}


