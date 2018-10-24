
$(function(){
    var lid=1;//aaaa没有写商品详情后台数据库,解决方法，借用product数据库请求出lid,在购物车的按钮上绑定一个自定义的属性data-lid=${lid}，此时var lid=$btn.attr("data-lid");
    var count=$("#pro_count").html();
$("#goCart_btn").click(function(e){  
    e.preventDefault;
   $.ajax({
         url:"http://localhost:3000/users/islogin",
            type:"get",
            dataType:"json",
            success:function(data){
              if(data.ok==0){
                alert("请先登录!");
                location.href="http://localhost:3000/login.html?back="+location.href;
              }else{
                $.ajax({
                  url:"http://localhost:3000/cartItems/add",
                  type:"get",
                  data:{lid,count},
                  success:function(){
                    $("#pro_count").html(1);
                    alert("添加购物车成功!");
					loadCart();
                  }
                })
              }
            }
          })
     });


//确定是否登录后data.ok==1才开始加载购物车的内容
function loadCart(){
  $("#gotoCartLine>p:gt(0):not(:last)").remove();

$.ajax({
      url:"http://localhost:3000/users/islogin",
      type:"get",
      dataType:"json",
      success:function(data){
        if(data.ok==1){
          $.ajax({
            url:"http://localhost:3000/cartItems",
            type:"get",
            dataType:"json",
            success:function(items){
                 //console.log(items);
                 var html=""
                 var $cartCon=$("#cart"),total=0,totalCount=0;
              for(var item of items){
                var {title,price,count,iid}=item;
                totalCount+=count;
                total+=price*count;
                html+=`
                        <p>  
                             <span>商品名称：${title}</span>&nbsp;&nbsp;&nbsp;
                             <button class="cartList_btn_jian"  data-iid="${iid}">-</button>
                            
                             <span id="cartList_co">${count}</span>
                             
                             <button class="cartList_btn_add" data-iid="${iid}">+</button>                               
                             &nbsp;&nbsp;&nbsp; <span>单价：RMB ${price}</span> 
                         </p><br>`;                                                 
                }
                 $("#gotoCartLine").html(html);
                 $("#cartListNumber").html(`${totalCount}`);
                 $("#cartListPrice").html(`${total.toFixed(2)}`);
                 $("#shoppingCartButton").html(`${totalCount}`);
            }
          })
        }
      }  
  })  

}
loadCart();
   
$("#gotoCartLine>p").on("click","button",function(){
  var $btn=$(this);
  var count=$("#cartList_co").html();
  if($btn.html()=="+")
  count++;
  else
  count--;
  var iid=$btn.attr("data-iid");
  $.ajax({
    url:"http://localhost:3000/cartItems/update",
    type:"get",
    data:{iid,count},
    success:loadCart
  })
})






});  













/*******图片大小切换****/
var $bigImg=$("img.bigImg");
$("img.smallImg").click(function(e){
    e.preventDefault();
    var $img=$(this);
  var src=$img.attr("data-target");//获得data-target属性值
    //console.log(src); src输出结果为img/details/big/1.jpg  img/details/big/2.jpg......
    $bigImg.attr({src});//属性添加给bigImg
});

$("li.st").mouseenter(function(){
     var $li=$(this);
    $li.children(":last-child").addClass("after_details_shade");
    
});
$("li.st").mouseleave(function(){
    var $li=$(this);
    $li.children(":last-child").removeClass("after_details_shade");
});

//购物车商品数量
var count=1;
$("div.count_nav>span.coun_subtract").click(function(e){
    e.preventDefault();
    //count = Math.max(0,count--);
    
    $("div.count_nav>div.input_count>span").html(count);
    if(count<=0){
        count=0;
    }else{
       count--;
    }

});
$("div.count_nav>span.coun_add").click(function(e){
    e.preventDefault();
    count++;
    $("div.count_nav>div.input_count>span").html(count);
});
