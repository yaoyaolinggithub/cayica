var ui={item1mobile:sui.gel("item1mobile"),item2mobile:sui.gel("item2mobile"),item3mobile:sui.gel("item3mobile"),item4mobile:sui.gel("item4mobile"),recycleState:-99,index1:1,index2:1,index3:1,index4:1,w:null,elem:null,container:null,index:1,Arr:sui.gel("sliderSegmentedControl").querySelectorAll("a"),panelTitle1:sui.gel("panelTitle1"),panelTitle2:sui.gel("panelTitle2"),panelTitle3:sui.gel("panelTitle3"),panelTitle4:sui.gel("panelTitle4"),imgIdArr:[],isrefresh1:false,isrefresh2:false,isrefresh3:false,isrefresh4:false,loopPullDown:null};var disabledTap=function(){mui.each(ui.Arr,function(a,b){b.classList.add("mui-disabled")})};var recoverTap=function(){mui.each(ui.Arr,function(a,b){b.classList.remove("mui-disabled")})};var goodsTemplate=function(k){var a=k.length;var f="";for(var e=0;e<a;e++){var c=sui.unique(6);ui.imgIdArr.push({id:c,imgurl:k[e].CoverImage});var g=k[e].SkuAttribute;var l="";if(!sui.IsNullOrEmpty(g)){g=JSON.parse(g||"[]");var h=g.length;for(var b=0;b<h;b++){if(b==2){break}l+='<span class="guige">'+g[b].AttrName+"："+g[b].AttrVal+" </span>"}}var d=['<li class="mui-table-view-cell"><img src="../images/hand.png"  id="'+c+'"/>','<div class="order_tit"><div class="mui-ellipsis-2 tit" >'+k[e].ProductName+"</div>",'<div class="top12"> '+l+' </div></div> <span class="mui-badge ">×'+k[e].BuyNum+"</span></li>"].join("");f+=d}return f};var call=function(b){var f=plus.android.importClass("android.content.Intent");var c=plus.android.importClass("android.net.Uri");var a=plus.android.runtimeMainActivity();var e=c.parse(b);var d=new f("android.intent.action.CALL",e);a.startActivity(d)};var template=function(d,c,b){var f=goodsTemplate(c);var e={buttons:"",word:"",kefu:'<button type="button" class="mui-btn  mui-btn-outlined gray" data="4009659288" data-t="kefu">联系客服</button>'};switch(b){case 0:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined mui-btn-danger red-2" data-t="del">删除</button>';e.word="已关闭";break;case 1:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined mui-btn-danger red-2" data-t="del">删除</button>';e.word="已取消";break;case 2:e.word="待付租金";e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined mui-btn-danger" data-t="cancle">取消归还</button>';e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined mui-btn-danger red" data-t="pay">去支付</button>';break;case 3:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined mui-btn-danger" data-t="cancle">取消归还</button>';e.word="等待派单";break;case 4:e.buttons=e.kefu;e.word="归还中";break;case 5:e.buttons=e.kefu;e.word="归还中";break;case 6:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined mui-btn-danger red-2" data-t="del">删除</button>';e.word="拒绝归还";break;case 7:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined mui-btn-danger red-2" data-t="del">删除</button>';e.word="已完成";break;case 8:e.buttons=e.kefu;e.buttons+='<button type="button" class="mui-btn  mui-btn-outlined mui-btn-danger red-2" data-t="del">删除</button>';e.word="已完成";break;default:break}var a=['<div class="item1-tit"> <span class="mui-ellipsis">归还单号:'+d+"</span>",'<span class="mui-pull-right">'+e.word+'</span> </div>	<ul class="mui-table-view list" data="detail">',f+'</ul><div class="mui-table-view bg">'+e.buttons+" </div>",].join("");return a};(function(a){a.init({pullRefresh:{container:"#pullrefresh",down:{callback:pulldownRefresh},up:{callback:pullupRefresh}}});a.plusReady(function(){var b=plus.webview.currentWebview().tap;if(b==2){ui.recycleState=3;ui.container=ui.item2mobile;ui.index=ui.index2;ui.panelTitle1.classList.remove("mui-active");ui.panelTitle2.classList.add("mui-active");ui.item1mobile.classList.remove("mui-active");ui.item2mobile.classList.add("mui-active")}else{if(b==3){ui.recycleState=4;ui.container=ui.item3mobile;ui.index=ui.index3;ui.panelTitle1.classList.remove("mui-active");ui.panelTitle3.classList.add("mui-active");ui.item1mobile.classList.remove("mui-active");ui.item3mobile.classList.add("mui-active")}else{if(b==4){ui.recycleState=8;ui.container=ui.item4mobile;ui.index=ui.index4;ui.panelTitle1.classList.remove("mui-active");ui.panelTitle4.classList.add("mui-active");ui.item1mobile.classList.remove("mui-active");ui.item4mobile.classList.add("mui-active")}else{ui.recycleState=-99;ui.container=ui.item1mobile;ui.index=ui.index1}}}setTimeout(function(){a("#pullrefresh").pullRefresh().pullupLoading()},180)})})(mui);function pulldownRefresh(){disabledTap();var a={container:ui.container,recycleState:ui.recycleState};clearTimeout(ui.loopPullDown);setTimeout(function(){sui.request("Order/GetRestoreList",{recycleState:a.recycleState,pageIndex:1},true,function(e){if(e){var j=e.IsPass;if(j){var c=e.ReturnList.length;a.container.innerHTML="";if(c>0){ui.elem=sui.rtips(ui.elem);var h=sui.fragment();for(var f=0;f<c;f++){var k={RecycleId:e.ReturnList[f].RecycleId,RecycleCode:e.ReturnList[f].RecycleCode,Detail:e.ReturnList[f].MyGuiHuanDetail,State:e.ReturnList[f].State};var b=document.createElement("div");b.className="item1-box";b.setAttribute("data",k.RecycleId);b.innerHTML=template(k.RecycleCode,k.Detail,k.State);h.appendChild(b)}a.container.appendChild(h);var g=ui.imgIdArr.length;for(var d=0;d<g;d++){cache.setImg(ui.imgIdArr[d].id,ui.imgIdArr[d].imgurl)}ui.imgIdArr=[];switch(a.recycleState){case -99:ui.index1=2;ui.index=ui.index1;break;case 3:ui.index2=2;ui.index=ui.index2;break;case 4:ui.index3=2;ui.index=ui.index3;break;case 8:ui.index4=2;ui.index=ui.index4;break;default:break}mui("#pullrefresh").pullRefresh().endPulldownToRefresh();ui.loopPullDown=setTimeout(function(){mui("#pullrefresh").pullRefresh().enablePullupToRefresh();mui("#pullrefresh").pullRefresh().refresh(true)},1000)}else{switch(a.recycleState){case -99:ui.index1=1;ui.index=ui.index1;break;case 3:ui.index2=1;ui.index=ui.index2;break;case 4:ui.index3=1;ui.index=ui.index3;break;case 8:ui.index4=1;ui.index=ui.index4;break;default:break}mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui("#pullrefresh").pullRefresh().disablePullupToRefresh();if(!ui.elem){ui.elem=sui.ctips("comiiszanwushuju","暂无相关数据")}}}else{mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui.toast(e.Desc)}recoverTap()}else{mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui.toast("无法连接到服务器，请检查网络是否连接！");recoverTap()}})},400)}function pullupRefresh(){disabledTap();var a={container:ui.container,recycleState:ui.recycleState,index:ui.index};setTimeout(function(){sui.request("Order/GetRestoreList",{recycleState:a.recycleState,pageIndex:a.index},true,function(e){if(e){var j=e.IsPass;if(j){var c=e.ReturnList.length;if(c>0){ui.elem=sui.rtips(ui.elem);var h=sui.fragment();for(var f=0;f<c;f++){var k={RecycleId:e.ReturnList[f].RecycleId,RecycleCode:e.ReturnList[f].RecycleCode,Detail:e.ReturnList[f].MyGuiHuanDetail,State:e.ReturnList[f].State};var b=document.createElement("div");b.className="item1-box";b.setAttribute("data",k.RecycleId);b.innerHTML=template(k.RecycleCode,k.Detail,k.State);h.appendChild(b)}a.container.appendChild(h);var g=ui.imgIdArr.length;for(var d=0;d<g;d++){cache.setImg(ui.imgIdArr[d].id,ui.imgIdArr[d].imgurl)}ui.imgIdArr=[];switch(a.recycleState){case -99:ui.index1++;ui.index=ui.index1;break;case 3:ui.index2++;ui.index=ui.index2;break;case 4:ui.index3++;ui.index=ui.index3;break;case 8:ui.index4++;ui.index=ui.index4;break;default:break}mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}else{if(ui.index==1){mui("#pullrefresh").pullRefresh().endPullupToRefresh(true);mui("#pullrefresh").pullRefresh().disablePullupToRefresh();if(!ui.elem){ui.elem=sui.ctips("comiiszanwushuju","暂无相关数据")}}else{mui("#pullrefresh").pullRefresh().endPullupToRefresh(true)}}}else{mui.toast(e.Desc);mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}recoverTap()}else{mui.toast("无法连接到服务器，请检查网络是否连接！");mui("#pullrefresh").pullRefresh().endPullupToRefresh(false);recoverTap()}})},400)}var tapRefresh=function(a){if(ui.index==1){setTimeout(function(){mui("#pullrefresh").pullRefresh().disablePullupToRefresh();mui("#pullrefresh").pullRefresh().pulldownLoading()},100)}else{if(a){setTimeout(function(){mui("#pullrefresh").pullRefresh().pulldownLoading();switch(ui.orderState){case -99:ui.isrefresh1=false;break;case 3:ui.isrefresh2=false;break;case 4:ui.isrefresh3=false;break;case 8:ui.isrefresh4=false;break;default:break}},100)}else{mui("#pullrefresh").pullRefresh().enablePullupToRefresh()}}};mui("#sliderSegmentedControl").on("tap","a[data=tap]",function(){var b=this;if(~b.className.indexOf("mui-active")){mui("#pullrefresh").pullRefresh().scrollTo(0,0,200);return}var a=b.id;ui.elem=sui.rtips(ui.elem);if(mui.os.ios){mui("#pullrefresh").pullRefresh().scrollTo(0,0,0)}else{mui("#pullrefresh").pullRefresh().scrollTo(0,0,100)}if(a=="panelTitle1"){ui.recycleState=-99;ui.container=ui.item1mobile;ui.index=ui.index1;tapRefresh(ui.isrefresh1)}else{if(a=="panelTitle2"){ui.recycleState=3;ui.container=ui.item2mobile;ui.index=ui.index2;tapRefresh(ui.isrefresh2)}else{if(a=="panelTitle3"){ui.recycleState=4;ui.container=ui.item3mobile;ui.index=ui.index3;tapRefresh(ui.isrefresh3)}else{if(a=="panelTitle4"){ui.recycleState=8;ui.container=ui.item4mobile;ui.index=ui.index4;tapRefresh(ui.isrefresh4)}}}}});var PayOrder=function(a){ui.w=sui.wait("请稍候...");sui.post("Order/PayOrder",{orderIds:a,orderType:1},function(d){if(d){var c=d.IsPass;if(c){var b={PayWaterId:d.ReturnObject.PayWaterId,Amount:d.ReturnObject.Amount,PayTitle:d.ReturnObject.PayTitle,IsNeedPay:d.ReturnObject.IsNeedPay};if(b.IsNeedPay){sui.open("orderPay.html","orderPay.html",{PayWaterId:b.PayWaterId,Amount:b.Amount,PayTitle:b.PayTitle,payType:2})}else{mui.toast("付款成功");beforeRefresh()}sui.closewait(ui.w)}else{mui.toast(d.Desc);sui.closewait(ui.w)}}else{mui.toast("无法连接到服务器，请检查网络是否连接");sui.closewait(ui.w)}})};mui("#pullrefresh").on("tap","button[type=button]",function(){var d=this;var c=d.getAttribute("data-t");if(c=="kefu"){var b="4009659288";var e=[{title:"400-965-9288"}];plus.nativeUI.actionSheet({cancel:"取消",buttons:e},function(g){if(g.index==1){if(mui.os.android){var f="tel:"+b;call(f)}else{plus.device.dial(b,false)}}})}else{if(c=="cancle"){var e=[{title:"确认",style:"destructive"}];plus.nativeUI.actionSheet({title:"确认要取消归还吗?",cancel:"取消",buttons:e},function(f){if(f.index==1){var g=d.parentNode.parentNode.getAttribute("data");ui.w=sui.wait("请稍候...");sui.post("Order/CancelRestore",{restoreId:g},function(i){if(i){var h=i.IsPass;if(h){sui.closewait(ui.w);mui.toast("取消归还成功");mui("#pullrefresh").pullRefresh().pulldownLoading();switch(ui.recycleState){case -99:ui.isrefresh2=true;break;case 3:ui.isrefresh1=true;break;default:break}}else{mui.toast(i.Desc);sui.closewait(ui.w)}}else{mui.toast("无法连接到服务器，请检查网络是否连接");sui.closewait(ui.w)}})}})}else{if(c=="del"){var e=[{title:"确认",style:"destructive"}];plus.nativeUI.actionSheet({title:"确认要删除该归还单吗?",cancel:"取消",buttons:e},function(f){if(f.index==1){var g=d.parentNode.parentNode.getAttribute("data");ui.w=sui.wait("请稍候...");sui.post("Order/DeleteRestore",{restoreId:g},function(i){if(i){var h=i.IsPass;if(h){sui.closewait(ui.w);mui.toast("归还单删除成功");mui("#pullrefresh").pullRefresh().pulldownLoading();switch(ui.recycleState){case -99:ui.isrefresh2=true;break;case 3:ui.isrefresh1=true;break;default:break}}else{mui.toast(i.Desc);sui.closewait(ui.w)}}else{mui.toast("无法连接到服务器，请检查网络是否连接");sui.closewait(ui.w)}})}})}else{if(c=="pay"){var a=d.parentNode.parentNode.getAttribute("data");PayOrder(a)}}}}});mui("#pullrefresh").on("tap","ul[data=detail]",function(){var a=this.parentNode.getAttribute("data");sui.open("recoverDetail.html","recoverDetail.html",{RecycleId:a})});function beforeRefresh(){ui.isrefresh1=true;ui.isrefresh2=true;ui.isrefresh3=true;ui.isrefresh4=true;mui("#pullrefresh").pullRefresh().pulldownLoading()};