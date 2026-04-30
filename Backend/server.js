require('dotenv').config();
const app =require("./src/app");
const connectDB=require("./src/db/db");


connectDB();

const PORT=process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Welcome to Post Create Web API")
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
