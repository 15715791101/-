const express=require("express");
var router=express.Router();
var query=require("./query");
var pool=require("../pool");
router.get("/",(req,res)=>{
     var output={
        count:0, //总数量
        pageSize:12,//每页数量
        pageCount:0,//总共几页
        //pno:0,//现在是第几页
       pno:req.query.pno,
        data:[]

     };

    var kw=req.query.kw;//请求url并且携带参数获取参数
   //console.log(kw);
   //key 为title中关键字[DSC hx rx ]
   var kws=kw.split(" ");//先切割再拼接
   kws.forEach((elem,i,arr)=>{
    arr[i]=`title like '%${elem}%'`;
  })
  var where=kws.join(" and ");

  var sql=`select * from sony_product where ${where}`;
  query(sql,[])
  .then(result=>{
    output.count=result.length;
    output.pageCount=
      Math.ceil(output.count/output.pageSize);
    sql+=` limit ?,?`;
    return query(sql,[output.pageSize*output.pno,output.pageSize]);
  })
  .then(result=>{
    output.data=result;
    res.send(output);
  })


 
 })

module.exports=router;