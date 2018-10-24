jQuery(function(){
  jQuery("#submit").click(function(){
      var uname=jQuery("#uname").val();
      var upwd=jQuery("#upwd").val();
      jQuery.ajax({
        url:"http://localhost:3000/users/signin",
        type:"post",
        data:{uname,upwd},
        dataType:"json",
        success:function(data){
          if(data.ok==0) alert(data.msg);
          else{
            alert("登录成功,自动返回上一页!");
            //如果登录成功返回上一页，没有上一页返回主页
            if(location.search.indexOf("back=")!=-1){
              var back=location.search.slice(6);
              location.href=back;
            }else{
              location.href="http://localhost:3000/main.html"
            }
          }
        }
      })
    })
  })