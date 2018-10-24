var express=require("express");
var router=express.Router();
var pool=require("../pool");
var query=require("./query");


router.get("/",(req,res)=>{
  var sql=
  `SELECT * FROM sony_shoppingcart 
  inner join sony_product on product_id=lid where uid=1 
  ORDER BY sony_shoppingcart.iid ASC`;   
  var uid=req.session.uid;
  pool.query(sql,[uid],(err,result)=>{
    res.send(result);
  })
})
//测试: 先http://localhost:3000/login.html 先登录成功
//     再http://localhost:3000/cartItems
router.get("/add",(req,res)=>{
  var {lid,count}=req.query;
  var uid=req.session.uid;
  var sql="select * from sony_shoppingcart where uid=? and product_id=?";
  query(sql,[uid,lid])//这个query的好处在于支持promise
  .then(result=>{
      //判断这个人的购物车里面是否由这个商品,如果没有插入，如果有就更新
    if(result.length==0){
      var sql="insert into sony_shoppingcart values(null,?,?,?,0)";
      pool.query(sql,[uid,lid,count],(err,result)=>{
        res.send();
      })
    }else{
      var sql="update sony_shoppingcart set count=count+? where uid=? and product_id=?";
      pool.query(sql,[count,uid,lid],(err,result)=>{
        res.send();
      })
    }
  })
})
//测试: 先http://localhost:3000/login.html 先登录成功
//  再http://localhost:3000/cartItems/add?lid=X&count=X
//  结果: 数据库中多一行记录
//  再请求相同地址
//  结果: 数据库中不会多一行记录，而是原记录数量增长
router.get("/delete",(req,res)=>{

})
router.get("/update",(req,res)=>{
  var {iid,count}=req.query;
  if(count>0){
    var sql="update sony_shoppingcart set count=? where iid=?";
    pool.query(sql,[count,iid],(err,result)=>{
      res.send();
    })
  }else{
    var sql="delete from sony_shoppingcart where iid=?";
    pool.query(sql,[iid],(err,result)=>{
      res.send();
    })
  }
})
//http://localhost:3000/cartItems/update?iid=?&count=?
module.exports=router;