const express=require('express');
const cookieParser = require('cookie-parser');
const fileUpload=require('express-fileupload');
const cors = require('cors');


require("dotenv").config();
const PORT=process.env.PORT || 5000;

require('./config/dbConnect').dbConnect();
require('./config/cloudinaryConfig').cloudinaryConnect();


const app=express();

app.use(cors());
// app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

const authRoute=require('./Routes/authRoute');
const otpSendingRoutes=require('./Routes/otpSendingRoute')
const resetPassMailRoute=require('./Routes/resetPassMailRoute')
const createCourseRoute=require('./Routes/createCourseRoute')
const catagotyRoute=require('./Routes/catagotyRoute')
const sectionRoute=require('./Routes/sectionRoute')
const subSectionRoutes=require('./Routes/subSectionRoutes')
const profileRoute=require('./Routes/profileRoute')
const addCartRoute=require('./Routes/addCartRoute')
const esewa=require('./Routes/esewaRoute')

app.use('/api/v1',authRoute);
app.use('/api/v1',otpSendingRoutes);
app.use('/api/v1',resetPassMailRoute);
app.use('/api/v1',createCourseRoute);
app.use('/api/v1',catagotyRoute);
app.use('/api/v1',sectionRoute);
app.use('/api/v1',subSectionRoutes);
app.use('/api/v1',profileRoute);
app.use('/api/v1',addCartRoute);
app.use('/api/v1',esewa);

app.get('/',(req,res)=>{
	res.send("This Is Home Route");
})

app.listen(PORT,()=>{
	console.log(`Server is Live On PORT:${PORT}`);
})