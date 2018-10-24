$(function(){
    $.ajax({
        url:"http://localhost:3000/main",
        type:"get",
        dataType:"json" //JSON.parse(res)
    }).then(products=>{
        var html="";
    for(var i=0;i<6;i++) {
        var {title,pic_small, bq, details, pic,price,href}=products[i];
        html+=` <li class="cont3">
                                <a href="${href}">
                                    <div class="price_top  status_1">
                                        <span class="price">RMB ${price.toFixed(2)}</span>
                                    </div>
                                    <div class="new_icon">${bq}</div>
                                    <div class="icon-pic"><img src="${pic_small}" alt=""/></div>
                                    <div class="pd_img"><img src="${pic}" alt=""/></div>
                                    <div class="cont_desc">
                                        <h5 class="blue">
                                          ${title}
                                        </h5>
                                        <p>${details}</p>
                                    </div>
                                    
                                </a>
                   </li>`;
    }
    $("div.HKblock>div.block_cont>div.block_right>ul").html(html);

     var  html2="";
    for(var i=6;i<12;i++) {
        var {title,pic_small, bq, details, pic,price,href}=products[i];
        html2+=` <li class="cont3">
          <a href="${href}">
            <div class="price_top  status_1">
                <span class="price">RMB ${price.toFixed(2)}</span>
            </div>
            <div class="new_icon">${bq}</div>
            <div class="icon-pic"><img src="${pic_small}" alt=""/></div>
            <div class="pd_img"><img src="${pic}" alt=""/></div>
            <div class="cont_desc">
                <h5 class="blue" style="display:block">
                  ${title}
                </h5>
                <p>${details}</p>
            </div>
            
        </a>
       </li>`;
                
    }
    $("div.CJblock>div.block_cont>div.block_right>ul").html(html2);

    var  html3="";
    for(var i=12;i<18;i++) {
        var {title,pic_small, bq, details, pic,price,href}=products[i];
        html3+=` <li class="cont3">
          <a href="${href}">
            <div class="price_top  status_1">
                <span class="price">RMB ${price.toFixed(2)}</span>
            </div>
            <div class="new_icon">${bq}</div>
            <div class="icon-pic"><img src="${pic_small}" alt=""/></div>
            <div class="pd_img"><img src="${pic}" alt=""/></div>
            <div class="cont_desc">
                <h5 class="blue" style="display:block">
                  ${title}
                </h5>
                <p>${details}</p>
            </div>
            
        </a>
       </li>`;
                
    }
    $("div.WXblock>div.block_cont>div.block_right>ul").html(html3);













//�����˵��б�
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


//�̶�����
$(window).scroll(function(){
    var scrollTop=$("html,body").scrollTop();
    var offsetTop=$("div.product_fix_bar").offset().top;
   // console.log(offsetTop,scrollTop);
    if(scrollTop>581){
        $(".product_fix_bar").addClass("scroll_product_fix_bar");// console.log(1)
    }else{
        $(".product_fix_bar").removeClass("scroll_product_fix_bar");//console.log(2)
    }
});

//底部图片切换
(function(){
    function changeImg(){
        var $imgShow=$("li.bigitem>div.item2>img.img_change10");
        //console.log($("div.p_list>img.Img_show"));
        $imgShow.removeClass("img_change10");
        //console.log($imgShow.next());
        if($imgShow.next().length>0)
            $imgShow.next().addClass("img_change10");
        else
            $imgShow.parent().children(":first-child").addClass("img_change10");
        // $imgShow.parent().children().eq(0).addClass("Img_show");

    }
    var timer=setInterval(changeImg,4000);

})();


//小图片淡入淡出
 $("div.maincontent_img>div.viewpicture>ul>li>div.item1>img:last-child").mouseenter(function (){
     var $item=$(this);
     $item.fadeOut(4000);

 });
$("div.maincontent_img>div.viewpicture>ul>li>div.item1>img:last-child").mouseleave(function (){
    var $item=$(this);
    $item.fadeIn(4000);
});


//底部轮播图
$(document).ready(function(){
    var temp = 0;
    function interval(){
        temp++;
        if(temp == 2){
            $("div.list_cont>ul").css("left","0px");
            temp = 0;
        }
        var t = temp*(-860);
        $("div.list_cont>ul").stop().animate({
            "left": t+"px"
        },500);
        if(temp == 2){
            $("div.list_cont>ol>li").eq(0).addClass("conit_color").siblings().removeClass("conit_color");
        }else{
            $("div.list_cont>ol>li").eq(temp).addClass("conit_color").siblings().removeClass("conit_color");
        }
    }
    timer = setInterval(interval,5000);
    $("div.list_cont>ol>li").mouseenter(function(){
        clearInterval(timer);
    });
    $("div.list_cont>ol>li").mouseleave(function(){
        timer = setInterval(interval,2000);
    });
    $("div.list_cont>ol>li").click(function(){
        var index = $(this).index();
        temp=index;
        margin = -860 * index + "px";
        $("div.list_cont>ul").stop().animate({
            "left": margin.toString()
        },600);
     $("div.list_cont>ol>li").eq(index).addClass("conit_color").siblings().removeClass("conit_color");
        left = -860 * index + 860;
    });
});

//横向标签连接对于块

$(window).scroll(function(){

    var scrollTop=$("html,body").scrollTop();
    //console.log(scrollTop);
    var offsetTop=$("div.product_nav_list>ul>li.p_nav1").offset().top;
    $("div.product_nav_list>ul>li.p_nav1").click(function(e){
        e.preventDefault();
        window.scrollTo(0,1329.5);
  });
    $("div.product_nav_list>ul>li.p_nav2").click(function(e){
        e.preventDefault();
        window.scrollTo(0,1852);
    });
    $("div.product_nav_list>ul>li.p_nav3").click(function(e){
        e.preventDefault();
        window.scrollTo(0,2335);
    });
    $("div.product_nav_list>ul>li.p_nav4").click(function(e){
        e.preventDefault();
        window.scrollTo(0,2818.5);
    });

});

//电梯效果
   var $divlift=$(".listButton");

    var $listB=$(".listButton>ul");

  $(window).scroll(function(){
      var $fs=$("ul.elevator_floor");
     // console.log($fs);
        var $f1=$fs.first();
       var scrollTop=$("html,body").scrollTop();
      var offsetTop=$f1.offset().top;
    if(innerHeight/2+scrollTop>offsetTop){
        $divlift.removeClass("listButton");
    }
  else{
        $divlift.addClass("listButton");

    }

     $fs.children().each((i,f)=>{
        offsetTop=$(f).offset().top;
     if(innerHeight/2+scrollTop>offsetTop){
        $listB.children(`li:eq(${i})`)
      .addClass("btn_color")
            .siblings()
            .removeClass("btn_color")
     }
    })
  });

 $listB.on("click","li",function(){
      var i=$(this).index();
     //减去的170为固定导航栏的遮挡高度
      var offsetTop=$(`ul.elevator_floor>li:eq(${i})`).offset().top-170;
      $("html").animate({
        scrollTop:offsetTop
    },500);
});


//大小图片切换代码

 $("div.recommend_content>ul>li.cont2>a>div.pd_pic>img").click(function(e){
      e.preventDefault();
      var $img=$(this);
     var src=$img.attr("data-target");
     $("div.recommend_big_img>img").attr({src});
     if($("div.recommend_big_img>img").attr('src')){
        $("div.recommend_big_img>img").click(function(){
            var $bigImg=$(this);
            console.log(111);
            $bigImg.hide();
        });
     }
      
 });


//轮播图
$(document).ready(function(){
    var nowimg=0;
    var timer=null;
    // 克隆第一张图片，并且放到最后
    $(".img_box  li:first").clone().appendTo('.img_box')
    //左右按钮移入样式
    $(".direction_btn>li>a").mouseenter(function(){
        var $dir_btn=$(this);
        $dir_btn.addClass("direction_btn_active");
    });
    $(".direction_btn>li>a").mouseout(function(){
        var $dir_btn=$(this);
        $dir_btn.removeClass("direction_btn_active");
    });
    $(".direction_btn>li>a.right").mouseenter(function(){
        $(".direction_btn>li>a.right").css("transform","rotate(360deg)")

    })
    $(".direction_btn>li>a.right").mouseout(function(){
        $(".direction_btn>li>a.right").css("transform","rotate(180deg)")

    })


    // 右按钮业务
    $(".direction_btn>li.right_btn>a.right").click(rightFunc)
        function rightFunc(){

        if(nowimg<4){
            nowimg++
            $(".img_box").animate({"left":nowimg*-1230},1000)
        }else{
            nowimg=0
            $(".img_box").animate({"left":5*-1230},1000,function(){
                $(".img_box").css("left",0)

            })
        }
        $(".lunbo_btn>li>a").eq(nowimg).addClass('lunbo_btn_active').parent().siblings().find("a").removeClass('lunbo_btn_active')

    }   
    // 左按钮业务
    $(".direction_btn>li.left_btn>a.left").click(function(){
        if(nowimg>0){
            nowimg--
            $(".img_box").animate({"left":nowimg*-1230},1000)
        }else{
            nowimg=5
            $(".img_box").css({"left":5*-1230},1000)
            $(".img_box").animate({"left":nowimg*-1230},1000)
        }
        $(".lunbo_btn>li>a").eq(nowimg).addClass('lunbo_btn_active').parent().siblings().find("a").removeClass('lunbo_btn_active')
    })
    // 底部横条的
    $(".lunbo_btn>li").click(function(){
         nowimg=$(this).index()
         $(".lunbo_btn>li>a").eq(nowimg).addClass('lunbo_btn_active').parent().siblings().find("a").removeClass('lunbo_btn_active')
         $(".img_box").animate({"left":nowimg*-1230}, 1000)
    });

    // 自动轮播

    timer=setInterval(rightFunc,2000)

    $(".main_lunbo").mouseenter(function(){
        clearInterval(timer)
    })
    $(".main_lunbo").mouseout(function(){
        clearInterval(timer)
        timer=setInterval(rightFunc,2000)
    })

})








});

});

