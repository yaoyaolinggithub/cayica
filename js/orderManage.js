var ui={item1mobile:sui.gel("item1mobile"),item2mobile:sui.gel("item2mobile"),item3mobile:sui.gel("item3mobile"),item4mobile:sui.gel("item4mobile"),orderState:-99,index1:1,index2:1,index3:1,index4:1,w:null,elem:null,container:null,index:1,Arr:sui.gel("sliderSegmentedControl").querySelectorAll("a"),panelTitle1:sui.gel("panelTitle1"),panelTitle2:sui.gel("panelTitle2"),panelTitle3:sui.gel("panelTitle3"),panelTitle4:sui.gel("panelTitle4"),imgIdArr:[],nav:sui.gel("nav"),allPay:sui.gel("allPay"),pullrefresh:sui.gel("pullrefresh"),isrefresh1:false,isrefresh2:false,isrefresh3:false,isrefresh4:false,loopPullDown:null};var disabledTap=function(){mui.each(ui.Arr,function(a,b){b.classList.add("mui-disabled")})};var recoverTap=function(){mui.each(ui.Arr,function(a,b){b.classList.remove("mui-disabled")})};var goodsTemplate=function(l,k){var a=k.length;var g="";for(var e=0;e<a;e++){var c=sui.unique(6);ui.imgIdArr.push({id:c,imgurl:k[e].CoverImage});var m="";var h=k[e].SkuAttribute;if(!sui.IsNullOrEmpty(h)){h=JSON.parse(h||"[]");var f=h.length;for(var b=0;b<f;b++){if(b==2){break}m+='<span class="guige">'+h[b].AttrName+"："+h[b].AttrVal+" </span>"}}var d=['<li class="mui-table-view-cell"><img src="../images/hand.png"  id="'+c+'"/>','<div class="order_tit"><div class="mui-ellipsis-2 tit" >'+k[e].OuterName+"</div>"+m,'<span class="price absolute">'+(l==2?"售价":"押金")+" ：¥"+sui.rmoney(k[e].NowDeposit)+"</span></div>",'<span class="mui-badge">×'+k[e].BuyNum+"</span></li>"].join("");g+=d}return g};var call=function(b){var f=plus.android.importClass("android.content.Intent");var c=plus.android.importClass("android.net.Uri");var a=plus.android.runtimeMainActivity();var e=c.parse(b);var d=new f("android.intent.action.CALL",e);a.startActivity(d)};var template=function(c,f,b,k,g,a,h,j,d,i){var m=goodsTemplate(j,h);var e={showPrice:b,buttons:"",word:"",state:"实付款",kefu:'<button type="button" class="mui-btn  mui-btn-outlined gray" data="4009659288" data-t="kefu">联系客服</button>'};switch(k){case -1:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn mui-btn-outlined mui-btn-danger" data-t="del">删除订单</button>';e.word="已关闭";break;case -2:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn mui-btn-outlined mui-btn-danger" data-t="del">删除订单</button>';e.word="已取消";break;case -3:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn mui-btn-outlined red-2 mui-btn-danger" data-t="pay">付差价</button>';e.word="待付差价";e.state="待付换货差价";e.showPrice=i;break;case 1:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined gray" data-t="cancle">取消订单</button>';e.buttons+='<button type="button" class="mui-btn mui-btn-outlined red mui-btn-danger" data-t="pay">付款</button>';e.word="等待付款";break;case 2:e.buttons=e.kefu;e.word="准备出库";break;case 3:e.buttons=e.kefu;e.word="付款失败";break;case 4:e.buttons=e.kefu;e.word="准备出库";break;case 5:e.buttons=e.kefu;e.word="付款失败";break;case 6:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined gray"  data-t="wuliu">查看物流</button>';e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined gray mui-hidden" data-t="cuidan">我要催单</button>';e.word="等待发货";e.state="已付款";e.showPrice=d;break;case 7:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined gray"  data-t="wuliu">查看物流</button>';e.buttons+='<button type="button" class="mui-btn mui-btn-outlined mui-btn-danger mui-hidden" data-t="over">确认收货</button>';e.word="等待收货";e.state="已付款";e.showPrice=d;break;case 8:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined gray"  data-t="wuliu">查看物流</button>';e.word="已收货";e.state="已付款";e.showPrice=d;break;case 9:e.buttons='<button type="button" class="mui-btn  mui-btn-outlined gray"  data-t="wuliu">查看物流</button>';e.buttons+='<button type="button" class="mui-btn mui-btn-outlined mui-btn-danger" data-t="del">删除订单</button>';e.word="已完成";e.state="已付款";e.showPrice=d;break;case 10:e.buttons='<button type="button" class="mui-btn  mui-btn-outlined gray"  data-t="wuliu">查看物流</button>';e.buttons+='<button type="button" class="mui-btn mui-btn-outlined mui-btn-danger" data-t="del">删除订单</button>';e.word="已归还";e.state="已付款";e.showPrice=d;break;case 11:e.buttons='<button type="button" class="mui-btn  mui-btn-outlined gray"  data-t="wuliu">查看物流</button>';e.buttons+='<button type="button" class="mui-btn mui-btn-outlined mui-btn-danger" data-t="del">删除订单</button>';e.word="已完成";e.state="已付款";e.showPrice=d;break;case 12:e.buttons='<button type="button" class="mui-btn  mui-btn-outlined gray"  data-t="wuliu">查看物流</button>';e.buttons+='<button type="button" class="mui-btn mui-btn-outlined mui-btn-danger" data-t="del">删除订单</button>';e.word="已退款";e.state="已付款";e.showPrice=d;break;default:break}var l=['<div class="item1-tit">','<span class="mui-ellipsis mui-checkbox mui-left '+((k==1||k==-3)?"":"pad0")+'">'+((k==1||k==-3)?'<input type="checkbox"  value="'+c+'"/>':""),"订单号:"+f+'</span> <span class="mui-pull-right">'+e.word+"</span>",'</div><ul class="mui-table-view list" data="detail"> '+m+"</ul>",'<div class="item1-tit2"> 共'+g+"件商品  "+e.state+"：¥"+e.showPrice+(k==-3?"":" (含邮费￥"+a+")"),'</div><div class="mui-table-view bg">'+e.buttons+"</div>"].join("");return l};(function(a){a.init({pullRefresh:{container:"#pullrefresh",down:{callback:pulldownRefresh},up:{callback:pullupRefresh}}});a.plusReady(function(){var b=plus.webview.currentWebview().tap;if(b==2){ui.orderState=1;ui.container=ui.item2mobile;ui.index=ui.index2;ui.panelTitle1.classList.remove("mui-active");ui.panelTitle2.classList.add("mui-active");ui.item1mobile.classList.remove("mui-active");ui.item2mobile.classList.add("mui-active")}else{if(b==3){ui.orderState=6;ui.container=ui.item3mobile;ui.index=ui.index3;ui.panelTitle1.classList.remove("mui-active");ui.panelTitle3.classList.add("mui-active");ui.item1mobile.classList.remove("mui-active");ui.item3mobile.classList.add("mui-active")}else{if(b==4){ui.orderState=7;ui.container=ui.item4mobile;ui.index=ui.index4;ui.panelTitle1.classList.remove("mui-active");ui.panelTitle4.classList.add("mui-active");ui.item1mobile.classList.remove("mui-active");ui.item4mobile.classList.add("mui-active")}else{ui.orderState=-99;ui.container=ui.item1mobile;ui.index=ui.index1}}}navShow(ui.orderState);setTimeout(function(){a("#pullrefresh").pullRefresh().pullupLoading()},180)})})(mui);function pulldownRefresh(){disabledTap();var a={container:ui.container,orderState:ui.orderState};clearTimeout(ui.loopPullDown);setTimeout(function(){sui.request("Order/GetOrderList",{orderState:a.orderState,orderType:1,pageIndex:1},true,function(e){if(e){var j=e.IsPass;if(j){var c=e.ReturnList.length;a.container.innerHTML="";if(c>0){ui.elem=sui.rtips(ui.elem);var h=sui.fragment();for(var f=0;f<c;f++){var k={Id:e.ReturnList[f].MyOrder.Id,OrderCode:e.ReturnList[f].MyOrder.OrderCode,QuanKuan:sui.rmoney(e.ReturnList[f].MyOrder.QuanKuan),ProductNum:e.ReturnList[f].MyOrder.ProductNum,State:e.ReturnList[f].MyOrder.State,YunFee:sui.rmoney(e.ReturnList[f].MyOrder.YunFee),Detail:e.ReturnList[f].MyOrderDetail,OrderType:e.ReturnList[f].MyOrder.OrderType,PaidQuanKuan:sui.rmoney(e.ReturnList[f].MyOrder.PaidQuanKuan),DifferencePrice:sui.rmoney(e.ReturnList[f].MyOrder.DifferencePrice)};var b=document.createElement("div");b.className="item1-box";b.setAttribute("data",k.Id);b.setAttribute("data-v",k.OrderCode);b.innerHTML=template(k.Id,k.OrderCode,k.QuanKuan,k.State,k.ProductNum,k.YunFee,k.Detail,k.OrderType,k.PaidQuanKuan,k.DifferencePrice);h.appendChild(b)}a.container.appendChild(h);var g=ui.imgIdArr.length;for(var d=0;d<g;d++){cache.setImg(ui.imgIdArr[d].id,ui.imgIdArr[d].imgurl)}ui.imgIdArr=[];switch(a.orderState){case -99:ui.index1=2;ui.index=ui.index1;navShow(a.orderState);break;case 1:ui.index2=2;ui.index=ui.index2;navShow(a.orderState);break;case 6:ui.index3=2;ui.index=ui.index3;break;case 7:ui.index4=2;ui.index=ui.index4;break;default:break}mui("#pullrefresh").pullRefresh().endPulldownToRefresh();ui.loopPullDown=setTimeout(function(){mui("#pullrefresh").pullRefresh().enablePullupToRefresh();mui("#pullrefresh").pullRefresh().refresh(true)},1000)}else{switch(a.orderState){case -99:ui.index1=1;ui.index=ui.index1;navShow(a.orderState);break;case 1:ui.index2=1;ui.index=ui.index2;navShow(a.orderState);break;case 6:ui.index3=1;ui.index=ui.index3;break;case 7:ui.index4=1;ui.index=ui.index4;break;default:break}mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui("#pullrefresh").pullRefresh().disablePullupToRefresh();if(!ui.elem){ui.elem=sui.ctips("comiiszanwushuju","暂无相关数据")}}}else{mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui.toast(e.Desc)}recoverTap()}else{mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui.toast("无法连接到服务器，请检查网络是否连接！");recoverTap()}})},400)}function pullupRefresh(){disabledTap();var a={container:ui.container,orderState:ui.orderState,index:ui.index};setTimeout(function(){sui.request("Order/GetOrderList",{orderState:a.orderState,orderType:1,pageIndex:a.index},true,function(e){if(e){var j=e.IsPass;if(j){var c=e.ReturnList.length;if(c>0){ui.elem=sui.rtips(ui.elem);var h=sui.fragment();for(var f=0;f<c;f++){var k={Id:e.ReturnList[f].MyOrder.Id,OrderCode:e.ReturnList[f].MyOrder.OrderCode,QuanKuan:sui.rmoney(e.ReturnList[f].MyOrder.QuanKuan),ProductNum:e.ReturnList[f].MyOrder.ProductNum,State:e.ReturnList[f].MyOrder.State,YunFee:sui.rmoney(e.ReturnList[f].MyOrder.YunFee),Detail:e.ReturnList[f].MyOrderDetail,OrderType:e.ReturnList[f].MyOrder.OrderType,PaidQuanKuan:sui.rmoney(e.ReturnList[f].MyOrder.PaidQuanKuan),DifferencePrice:sui.rmoney(e.ReturnList[f].MyOrder.DifferencePrice)};var b=document.createElement("div");b.className="item1-box";b.setAttribute("data",k.Id);b.setAttribute("data-v",k.OrderCode);b.innerHTML=template(k.Id,k.OrderCode,k.QuanKuan,k.State,k.ProductNum,k.YunFee,k.Detail,k.OrderType,k.PaidQuanKuan,k.DifferencePrice);h.appendChild(b)}a.container.appendChild(h);var g=ui.imgIdArr.length;for(var d=0;d<g;d++){cache.setImg(ui.imgIdArr[d].id,ui.imgIdArr[d].imgurl)}ui.imgIdArr=[];switch(a.orderState){case -99:ui.index1++;ui.index=ui.index1;navShow(a.orderState);break;case 1:ui.index2++;ui.index=ui.index2;navShow(a.orderState);break;case 6:ui.index3++;ui.index=ui.index3;break;case 7:ui.index4++;ui.index=ui.index4;break;default:break}mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}else{if(ui.index==1){mui("#pullrefresh").pullRefresh().endPullupToRefresh(true);mui("#pullrefresh").pullRefresh().disablePullupToRefresh();if(!ui.elem){ui.elem=sui.ctips("comiiszanwushuju","暂无相关数据")}}else{mui("#pullrefresh").pullRefresh().endPullupToRefresh(true)}}}else{mui.toast(e.Desc);mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}recoverTap()}else{mui.toast("无法连接到服务器，请检查网络是否连接！");mui("#pullrefresh").pullRefresh().endPullupToRefresh(false);recoverTap()}})},400)}var tapRefresh=function(a){if(ui.index==1){setTimeout(function(){mui("#pullrefresh").pullRefresh().disablePullupToRefresh();mui("#pullrefresh").pullRefresh().pulldownLoading()},100)}else{if(a){setTimeout(function(){mui("#pullrefresh").pullRefresh().pulldownLoading();switch(ui.orderState){case -99:ui.isrefresh1=false;break;case 1:ui.isrefresh2=false;break;case 6:ui.isrefresh3=false;break;case 7:ui.isrefresh4=false;break;default:break}},100)}else{mui("#pullrefresh").pullRefresh().enablePullupToRefresh()}}};var navShow=function(b){if(b==-99){var a=ui.item1mobile.querySelectorAll('input[type="checkbox"]').length;if(a){ui.nav.classList.remove("mui-hidden");ui.pullrefresh.style.paddingBottom="53px"}else{ui.pullrefresh.style.paddingBottom="0px";ui.nav.classList.add("mui-hidden")}}else{if(b==1){var a=ui.item2mobile.querySelectorAll('input[type="checkbox"]').length;if(a){ui.nav.classList.remove("mui-hidden");ui.pullrefresh.style.paddingBottom="53px "}else{ui.pullrefresh.style.paddingBottom="0px";ui.nav.classList.add("mui-hidden")}}else{ui.nav.classList.add("mui-hidden");ui.pullrefresh.style.paddingBottom="0px"}}};var PayOrder=function(a){ui.w=sui.wait("请稍候...");sui.post("Order/PayOrder",{orderIds:a,orderType:0},function(d){if(d){var c=d.IsPass;if(c){var b={PayWaterId:d.ReturnObject.PayWaterId,Amount:d.ReturnObject.Amount,PayTitle:d.ReturnObject.PayTitle,IsNeedPay:d.ReturnObject.IsNeedPay};if(b.IsNeedPay){sui.open("orderPay.html","orderPay.html",{PayWaterId:b.PayWaterId,Amount:b.Amount,PayTitle:b.PayTitle,payType:1})}else{mui.toast("订单付款成功");beforeRefresh()}sui.closewait(ui.w)}else{mui.toast(d.Desc);sui.closewait(ui.w)}}else{mui.toast("无法连接到服务器，请检查网络是否连接");sui.closewait(ui.w)}})};mui("#sliderSegmentedControl").on("tap","a[data=tap]",function(){var b=this;if(~b.className.indexOf("mui-active")){mui("#pullrefresh").pullRefresh().scrollTo(0,0,200);return}var a=b.id;ui.elem=sui.rtips(ui.elem);if(mui.os.ios){mui("#pullrefresh").pullRefresh().scrollTo(0,0,0)}else{mui("#pullrefresh").pullRefresh().scrollTo(0,0,100)}mui("#pullrefresh").pullRefresh().scrollTo(0,0,100);if(a=="panelTitle1"){ui.orderState=-99;ui.container=ui.item1mobile;ui.index=ui.index1;navShow(ui.orderState);tapRefresh(ui.isrefresh1)}else{if(a=="panelTitle2"){ui.orderState=1;ui.container=ui.item2mobile;ui.index=ui.index2;navShow(ui.orderState);tapRefresh(ui.isrefresh2)}else{if(a=="panelTitle3"){ui.orderState=6;ui.container=ui.item3mobile;ui.index=ui.index3;navShow(ui.orderState);tapRefresh(ui.isrefresh3)}else{if(a=="panelTitle4"){ui.orderState=7;ui.container=ui.item4mobile;ui.index=ui.index4;navShow(ui.orderState);tapRefresh(ui.isrefresh4)}}}}});mui("#pullrefresh").on("tap","button[type=button]",function(){var f=this;var d=f.getAttribute("data-t");if(d=="kefu"){var c="4009659288";var g=[{title:"400-965-9288"}];plus.nativeUI.actionSheet({cancel:"取消",buttons:g},function(i){if(i.index==1){if(mui.os.android){var h="tel:"+c;call(h)}else{plus.device.dial(c,false)}}})}else{if(d=="cancle"){var g=[{title:"确认",style:"destructive"}];plus.nativeUI.actionSheet({title:"确认要取消该订单吗?",cancel:"取消",buttons:g},function(h){if(h.index==1){var i=f.parentNode.parentNode.getAttribute("data");ui.w=sui.wait("请稍候...");sui.post("Order/CancelOrder",{orderId:i},function(k){if(k){var j=k.IsPass;if(j){sui.closewait(ui.w);mui.toast("订单取消成功");mui("#pullrefresh").pullRefresh().pulldownLoading();switch(ui.orderState){case -99:ui.isrefresh2=true;break;case 1:ui.isrefresh1=true;break;default:break}}else{mui.toast(k.Desc);sui.closewait(ui.w)}}else{mui.toast("无法连接到服务器，请检查网络是否连接");sui.closewait(ui.w)}})}})}else{if(d=="pay"){var a=f.parentNode.parentNode.getAttribute("data");PayOrder(a)}else{if(d=="wuliu"){var e=f.parentNode.parentNode;var a=e.getAttribute("data");var b=e.getAttribute("data-v");sui.open("logistics.html","logistics.html",{orderId:a,orderCode:b})}else{if(d=="del"){var g=[{title:"确认",style:"destructive"}];plus.nativeUI.actionSheet({title:"确认要删除该订单吗?",cancel:"取消",buttons:g},function(h){if(h.index==1){var i=f.parentNode.parentNode.getAttribute("data");ui.w=sui.wait("请稍候...");sui.post("Order/DeleteOrder",{orderId:i},function(k){if(k){var j=k.IsPass;if(j){sui.closewait(ui.w);mui.toast("订单删除成功");mui("#pullrefresh").pullRefresh().pulldownLoading();switch(ui.orderState){case -99:ui.isrefresh2=true;break;case 1:ui.isrefresh1=true;break;default:break}}else{mui.toast(k.Desc);sui.closewait(ui.w)}}else{mui.toast("无法连接到服务器，请检查网络是否连接");sui.closewait(ui.w)}})}})}else{if(d=="cuidan"){}else{if(d=="over"){}}}}}}}});ui.allPay.addEventListener("tap",function(){if(ui.orderState==-99){var b=ui.item1mobile.querySelectorAll('input[type="checkbox"]:checked').length;if(b){var c=[].slice.call(ui.item1mobile.querySelectorAll('input[type="checkbox"]:checked'));var a="";c.forEach(function(e,d){a+=e.value+","});a=a.substring(0,a.length-1);PayOrder(a)}else{mui.toast("至少选择一个需要付款的订单哦~")}}else{if(ui.orderState==1){var b=ui.item2mobile.querySelectorAll('input[type="checkbox"]:checked').length;if(b){var c=[].slice.call(ui.item2mobile.querySelectorAll('input[type="checkbox"]:checked'));var a="";c.forEach(function(e,d){a+=e.value+","});a=a.substring(0,a.length-1);PayOrder(a)}else{mui.toast("至少选择一个需要付款的订单哦~")}}else{mui.toast("至少选择一个需要付款的订单哦~")}}});mui("#pullrefresh").on("tap","ul[data=detail]",function(){var a=this.parentNode.getAttribute("data");sui.open("orderDetail.html","orderDetail.html",{orderId:a})});function beforeRefresh(){ui.isrefresh1=true;ui.isrefresh2=true;ui.isrefresh3=true;ui.isrefresh4=true;mui("#pullrefresh").pullRefresh().pulldownLoading()};