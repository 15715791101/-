var express=require("express");
var router=express.Router();
var pool=require("../pool");

//验证输入的密码的用户名与密码是否正确
router.post("/signin",(req,res)=>{
   var {uname,upwd}=req.body;
 // var {uname,upwd}=req.query;//用get方法客户端验证
  var sql="select * from sony_user where uname=? and upwd=?";
  pool.query(sql,[uname,upwd],(err,result)=>{
    err&&console.log(err);
    if(result.length>0){
      req.session.uid=result[0].uid;//验证成功后在session对相中强行添加一个uid
      res.send({ok:1})
    }else{
      res.send({ok:0,msg:"用户名或密码错误!"})
    }
  })
})//http://localhost:3000/users/signin?uname=yang&&upwd=123456
router.get("/islogin",(req,res)=>{
  if(req.session.uid==null)//先判断session中是否有uid
    res.send({ok:0});
  else{
    var sql="select * from sony_user where uid=?";
    pool.query(sql,[req.session.uid],(err,result)=>{
      res.send({ok:1,uname:result[0].uname});
    })
  }
})//http://localhost:3000/users/islogin
router.get("/signout",(req,res)=>{
  delete req.session.uid;
  res.send();
})

module.exports=router;