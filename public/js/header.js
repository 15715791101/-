$(function(){
    $.ajax({
      url:"http://localhost:3000/header.html",
      type:"get"
      //success:function(res){
        //document.getElementById("header")
         // .innerHTML=res;
      //}
    }).then(res=>{
        document.getElementById("header")
          .innerHTML=res;

        var  btnSearch=document.querySelector("div.header>div.header-main>div.headerSearch>a.btn_go");
        var input=btnSearch.previousElementSibling;
         btnSearch.onclick=function(){
         
            if(input.value.trim()!=="")                  
              location.href=`http://localhost:3000/products.html?kw=${input.value}`;
             
          }
          
         input.onkeyup=function(e){
            if(e.keyCode==13)
             btnSearch.onclick();
         }
         //把传入的参数取出来放入输入框中
          if(location.search.indexOf("kw=")!=-1){
           input.value=
             decodeURI(location.search.split("=")[1]);
         }



         $("#user_login").click(function(e){
            e.preventDefault();
            location.href=
              "http://localhost:3000/login.html?back="+location.href;
          })  



 













        $("[data-trigger=dropdown]")//a
    .next()//ul
    .hide()//ul  ʹ��ʼ״̬�����ص�
    .parent()//div
    .mouseenter(function(){
        $(this).children(":last").slideDown();
        //.show();
    })
    .mouseleave(function(){
        $(this).children(":last").slideUp();
        //.hide();
    });

//���ﳵ��������
$(".scButton").mouseenter(function(){
    var $cart=$(".shoppingCartArea");
    $cart.css("display","block");
});
$(".shoppingCartBlock").mouseleave(function(){
    var $cart=$(".shoppingCartArea");
    $cart.css("display","none");
});







    })

  })

