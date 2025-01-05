const mongoose =require('mongoose');

require('dotenv').config();

const DB_URL=process.env.DB_URL;

exports.dbConnect=async()=>{
  await  mongoose.connect(DB_URL)
  .then(()=>{
    console.log('DB connected Successfully');
  }).catch((err)=>{
    console.log('DB connection Failed with ERROR => ',err);
  })
  ;
}