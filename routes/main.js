const express=require("express");
var router=express.Router();
var pool=require("../pool");
router.get("/",(req,res)=>{
  var sql="SELECT * FROM `main_pro` where seq_recommended!=0 order by seq_recommended";
  pool.query(sql,[],(err,result)=>{
    if (err) throw err;
    
   // console.log(result);
    res.send(result);
  })
 })

module.exports=router;