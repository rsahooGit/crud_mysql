const express=require("express");
const app=express();
const mysql=require("mysql2");
const cors=require("cors");

require("./db/conn");
const router=require("./Routes/router");

const port=8001;

app.get("/",(req,res)=>{
    res.send("server start")
});

//middle wire
app.use(express.json());
app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log("server start on port no :"+ port);
});

