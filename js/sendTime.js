var ui={navbox:sui.gel("navbox"),btnSure:sui.gel("btnSure"),container:sui.gel("container"),w:null,keyWay:0,timeStr:"",picker:null,cartIds:"",wayId:"",way:"",deliveryTime:"",imgIdArr:[],hass:false};(function(a){if(a.os.ios){ui.container.classList.add("ios-scroll-bounce")}a.plusReady(function(){var b=plus.webview.currentWebview();ui.cartIds=b.cartIds;ui.wayId=b.wayId;ui.deliveryTime=b.deliveryTime;ui.picker=new a.PopPicker({layer:2});setTimeout(function(){ui.w=sui.wait("正在加载...");sui.request("Order/GetDeliveryMethod",{cartIds:ui.cartIds,methodId:ui.wayId,deliveryTime:ui.deliveryTime},true,function(l){if(l){var s=l.IsPass;if(s){var x={ProductImgs:l.ReturnObject.ProductImgs,pLen:l.ReturnObject.ProductImgs.length,DeliveryMethods:l.ReturnObject.DeliveryMethods,deliveryLen:l.ReturnObject.DeliveryMethods.length,Dates:l.ReturnObject.Dates,dateLen:l.ReturnObject.Dates.length,Times:l.ReturnObject.Times,timeLen:l.ReturnObject.Times.length,DingProductImgs:l.ReturnObject.DingProductImgs,DingPLen:l.ReturnObject.DingProductImgs.length,DingDescription:l.ReturnObject.DingDescription};var q="";if(x.pLen>0){ui.hass=true;q+='<ul class="mui-table-view"><li class="mui-table-view-cell white"><div class="box-one"><span class="mui-icon iconfont icon-daishouhuo"></span><span class="icon-word">配送方式</span></div>';for(var n=0;n<x.pLen;n++){var g=sui.unique(6);ui.imgIdArr.push({id:g,imgurl:x.ProductImgs[n]});q+='<img src="../images/hand.png"  id="'+g+'"/>'}q+='<div class="box-three">';for(var h=0;h<x.deliveryLen;h++){q+='<button class="mui-btn mui-btn-outlined '+(x.DeliveryMethods[h].IsSelected?"mui-btn-warning":"")+'" type="button" data-v="'+x.DeliveryMethods[h].Key+'">'+x.DeliveryMethods[h].Value+"</button>"}var u=[];var v=[];var c="";for(var w=0;w<x.timeLen;w++){if(x.Times[w].IsSelected){c=x.Times[w].Value}v.push({value:x.Times[w].Value,text:x.Times[w].Value})}for(var r=0;r<x.dateLen;r++){if(x.Dates[r].IsSelected){c=x.Dates[r].Value+" "+c}u.push({value:x.Dates[r].Value,text:x.Dates[r].Value,children:v})}ui.picker.setData(u);var p=document.querySelector(".mui-poppicker-body");if(a.os.ios&&parseFloat(a.os.version)>8&&p){p.classList.add("ios-poppicker")}c='<div data="default">'+c+"</div>";q+='</div></li><li class="mui-table-view-cell" data="select"><a class=" mui-navigate-right"><div>送货时间</div>'+c+"</a></li></ul>"}if(x.DingPLen>0){q+='<ul class="mui-table-view '+(x.pLen?"mtop":"")+'"><li class="mui-table-view-cell white">';for(var f=0;f<x.DingPLen;f++){var g=sui.unique(6);ui.imgIdArr.push({id:g,imgurl:x.DingProductImgs[f]});q+='<div class="box-two"><img src="../images/hand.png"  id="'+g+'"/></div>'}q+='<div class="desc">'+x.DingDescription+"</div></li></ul>"}ui.container.innerHTML=q;ui.navbox.classList.remove("mui-hidden");var o=ui.imgIdArr.length;for(var e=0;e<o;e++){cache.setImg(ui.imgIdArr[e].id,ui.imgIdArr[e].imgurl)}sui.closewait(ui.w)}else{a.toast(l.Desc);sui.closewait(ui.w)}}else{a.toast("无法连接到服务器，请检查网络是否连接");sui.closewait(ui.w)}})},250)})})(mui);mui(ui.container).on("tap","li[data=select]",function(){var b=this.querySelector('div[data="default"]');if(b){var a=b.innerText.trim();if(!sui.IsNullOrEmpty(a)){var c=a.split(" ");ui.picker.pickers[0].setSelectedValue(c[0]);setTimeout(function(){ui.picker.pickers[1].setSelectedValue(c[1])},100)}}ui.picker.show(function(f){var e=f[0].value;var d=f[1].value;if(e!=undefined&&e!="undefined"&&d!=undefined&&d!="undefined"){ui.deliveryTime=f[0].text+" "+f[1].text;b.innerText=ui.deliveryTime}})});mui("body").on("tap","button[type=button]",function(){var d=this;var c=d.parentNode.querySelectorAll('button[type="button"]');var a=c.length;for(var b=0;b<a;b++){c[b].classList.remove("mui-btn-warning")}d.classList.add("mui-btn-warning");ui.wayId=d.getAttribute("data-v");ui.way=d.innerText});ui.btnSure.addEventListener("tap",function(){if(ui.hass){if(sui.IsNullOrEmpty(ui.wayId)){mui.toast("请选择配送方式");return}else{if(sui.IsNullOrEmpty(ui.deliveryTime)){mui.toast("请选择送货时间");return}}var a=plus.webview.currentWebview().opener();if(a){a.evalJS('sendWay("'+ui.wayId+'","'+ui.way+'","'+ui.deliveryTime+'");')}}setTimeout(function(){plus.webview.currentWebview().close()},100)});