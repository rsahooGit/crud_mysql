const express=require("express");
const router=new express.Router();
const conn=require("../db/conn");

//
router.post("/create",(req,res)=>
{
    //console.log(req.body);
    const{name,email,age,mobile,work,add,desc}=req.body;

    if(!name||!email||!age||!mobile||!work||!add||!desc){
    
        res.status(422).json("please fill the all data");
    }


    try {
        conn.query("SELECT * FROM users WHERE email=?",email,(err,result)=>{
            if(result.length){
                res.status(422).json("This data is already exists");
            }
            else{
                conn.query("INSERT INTO users SET ?",{name,email,age,mobile,work,add,desc},(err,result)=>{
                    if(err){
                        console.log("err" + err);
                    }
                    else{
                        res.status(201).json(req.body);
                    }
                })
            }

        })
    } catch (error) {
        res.status(422).json(error);
    }

});

// get userdata

router.get("/getusers",(req,res)=>{

    conn.query("SELECT * FROM users",(err,result)=>{
        if(err){
            res.status(422).json("nodata available herrre");
        }else{
            console.log(result);
            res.status(201).json(result);
        }
    })
});


// user delete api

router.delete("/deleteuser/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("DELETE FROM users WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});



// get single user

router.get("/induser/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("SELECT * FROM users WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});


// update users api


router.patch("/updateuser/:id",(req,res)=>{

    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE users SET ? WHERE id = ? ",[data,id],(err,result)=>{
        if(err){
            res.status(422).json({message:"error"});
        }else{
            console.log(result);
            res.status(201).json(result);
            
        }
    })
});


module.exports=router;