var ui={screenbox:sui.gel("screen-box"),imgIdArr:[],elem:null,container:sui.gel("container"),priceScreen:0,numScreen:0,priceStyle:sui.gel("priceStyle"),numStyle:sui.gel("numStyle"),categoryId:0,saletype:0,moduleId:0,index:1,searchkey:"",condition:"",orderType:0,minPrice:0,maxPrice:0,isrefresh:false,showMenu:false,w:null,loopPullDown:null,attrChange:true,latitude:null,longitude:null,areaCode:null,isArea:null};var main=null,menu=null,mask=mui.createMask(_closeMenu);(function(a){a.init({pullRefresh:{container:"#pullrefresh",down:{callback:pulldownRefresh},up:{contentdown:"",callback:pullupRefresh}}});a.plusReady(function(){main=plus.webview.currentWebview();ui.longitude=localStorage.getItem("longitude_cayica")||0;ui.latitude=localStorage.getItem("latitude_cayica")||0;ui.categoryId=main.categoryId;ui.saletype=main.saletype;ui.moduleId=main.moduleId;ui.areaCode=localStorage.getItem("areaCode_cayica")||"";ui.searchkey=main.searchkey||"";menu=a.preload({id:"goodsMenu.html",url:"goodsMenu.html",styles:{left:"100%",width:"90%",zindex:9999,scrollIndicator:"none"}});setTimeout(function(){ui.w=sui.wait("请稍候...");goodsList(ui.searchkey,ui.condition,ui.categoryId,ui.saletype,ui.moduleId,ui.orderType,ui.index,ui.minPrice,ui.maxPrice,2,ui.areaCode,ui.longitude,ui.latitude)},180)})})(mui);function openMenu(){if(!ui.showMenu){menu.show("none",0,function(){menu.setStyle({left:"10%",transition:{duration:220,timingfunction:"linear"}})});mask.show();ui.showMenu=true}}function closeMenu(){_closeMenu();mask.close()}function _closeMenu(){if(ui.showMenu){menu.setStyle({left:"100%",transition:{duration:220}});setTimeout(function(){menu.hide()},300);ui.showMenu=false}}window.addEventListener("menu:swiperight",closeMenu);function searchMain(a){ui.searchkey=a;ui.condition="";ui.categoryId=0;ui.saletype=0;ui.moduleId=0;ui.orderType=0;ui.minPrice=0;ui.maxPrice=0;ui.index=1;ui.attrChange=true;setTimeout(function(){ui.w=sui.wait("请稍候...");goodsList(ui.searchkey,ui.condition,ui.categoryId,ui.saletype,ui.moduleId,ui.orderType,ui.index,ui.minPrice,ui.maxPrice,2,ui.areaCode,ui.longitude,ui.latitude)},150)}function pulldownRefresh(){clearTimeout(ui.loopPullDown);setTimeout(function(){ui.index=1;goodsList(ui.searchkey,ui.condition,ui.categoryId,ui.saletype,ui.moduleId,ui.orderType,ui.index,ui.minPrice,ui.maxPrice,2,ui.areaCode,ui.longitude,ui.latitude)},500)}function pullupRefresh(){setTimeout(function(){goodsList(ui.searchkey,ui.condition,ui.categoryId,ui.saletype,ui.moduleId,ui.orderType,ui.index,ui.minPrice,ui.maxPrice,1,ui.areaCode,ui.longitude,ui.latitude)},500)}var goodsList=function(g,f,i,n,d,m,h,j,e,b,k,a,l){if(h==1){if(mui.os.ios){mui("#pullrefresh").pullRefresh().scrollTo(0,0,0)}else{mui("#pullrefresh").pullRefresh().scrollTo(0,0,100)}}var c={searchkey:g,condition:f,categoryId:i,saletype:n,moduleId:d,orderType:m,pageIndex:h,minPrice:j,maxPrice:e,areaCode:k,longitude:a,latitude:l};sui.request("Home/ProductList",c,true,function(u){if(u){var z=u.IsPass;if(z){ui.areaCode=u.ReturnObject.DeliveryAreaCode;if(h==1&&ui.attrChange){var C=JSON.stringify(u.ReturnObject.AttributeList).replace(/\"/ig,"'");var p=null,w=null,o="",y="";if(!ui.isArea){ui.isArea=true;y="true";p=JSON.stringify(u.ReturnObject.OnlineAreaList||[]).replace(/\"/ig,"'");w=JSON.stringify(u.ReturnObject.ShouHuoAddressList||[]).replace(/\"/ig,"'");o=u.ReturnObject.DeliveryAddress}setTimeout(function(){if(menu){menu.evalJS('conditionRefresh("'+C+'","'+p+'","'+w+'","'+o+'","'+ui.areaCode+'","'+y+'")')}ui.attrChange=false},200)}var q=u.ReturnObject.ProductList.length;if(q){ui.elem=sui.rtips(ui.elem);var x=sui.fragment();for(var t=0;t<q;t++){var s=sui.unique(6);ui.imgIdArr.push({id:s,imgurl:u.ReturnObject.ProductList[t].CoverImage});var B=['<img class="mui-pull-left" src="../images/hand.png" id="'+s+'"/>','<div class="mui-media-body"><div class="mui-ellipsis-2">'+u.ReturnObject.ProductList[t].ProductName+"</div>",'<p class="mui-ellipsis">'+u.ReturnObject.ProductList[t].RentTitle+'<span class="price">'+u.ReturnObject.ProductList[t].NowRent+"</span></p> </div>"].join("");var A=document.createElement("li");A.className="mui-table-view-cell";A.setAttribute("data","detail");A.setAttribute("data-v",u.ReturnObject.ProductList[t].ProductSkuId);A.innerHTML=B;x.appendChild(A)}if(h==1){ui.screenbox.classList.remove("mui-hidden");ui.container.innerHTML=""}ui.container.appendChild(x);ui.container.classList.remove("mui-hidden");var v=ui.imgIdArr.length;for(var r=0;r<v;r++){cache.setImg(ui.imgIdArr[r].id,ui.imgIdArr[r].imgurl)}ui.imgIdArr=[];sui.closewait(ui.w);if(b==2){ui.index=2;mui("#pullrefresh").pullRefresh().endPulldownToRefresh();ui.loopPullDown=setTimeout(function(){mui("#pullrefresh").pullRefresh().enablePullupToRefresh();mui("#pullrefresh").pullRefresh().refresh(true)},1000)}else{ui.index++;mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}}else{sui.closewait(ui.w);if(b==2){mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui("#pullrefresh").pullRefresh().disablePullupToRefresh();ui.screenbox.classList.remove("mui-hidden");ui.container.classList.add("mui-hidden");ui.container.innerHTML="";if(!ui.elem){ui.elem=sui.ctips("comiiszanwushuju","暂无相关记录")}}else{if(h==1){mui("#pullrefresh").pullRefresh().endPullupToRefresh(true);mui("#pullrefresh").pullRefresh().disablePullupToRefresh();ui.container.innerHTML="";if(!ui.elem){ui.elem=sui.ctips("comiiszanwushuju","暂无相关记录")}ui.screenbox.classList.remove("mui-hidden");ui.container.classList.add("mui-hidden")}else{mui("#pullrefresh").pullRefresh().endPullupToRefresh(true)}}}}else{sui.closewait(ui.w);if(b==2){mui("#pullrefresh").pullRefresh().endPulldownToRefresh()}else{mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}mui.toast(u.Desc)}}else{sui.closewait(ui.w);if(b==2){mui("#pullrefresh").pullRefresh().endPulldownToRefresh()}else{mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}mui.toast("无法连接到服务器，请检查网络是否连接！")}})};mui("#screen-box").on("tap","li[data=screen]",function(){var b=this;var a=b.getAttribute("data-v");if(a=="screen"){openMenu();return}ui.priceStyle.removeAttribute("class");ui.numStyle.removeAttribute("class");if(a=="price"){switch(ui.priceScreen){case 0:ui.priceScreen=2;ui.numScreen=0;ui.orderType=2;b.classList.remove("rawxia");b.classList.add("shang");break;case 1:ui.priceScreen=2;ui.numScreen=0;ui.orderType=2;b.classList.remove("rawxia");b.classList.add("shang");break;case 2:ui.priceScreen=1;ui.numScreen=0;ui.orderType=1;b.classList.remove("shang");b.classList.add("rawxia");break;default:break}ui.index=1;ui.w=sui.wait("请稍候...");goodsList(ui.searchkey,ui.condition,ui.categoryId,ui.saletype,ui.moduleId,ui.orderType,ui.index,ui.minPrice,ui.maxPrice,2,ui.areaCode,ui.longitude,ui.latitude)}else{if(a=="num"){switch(ui.numScreen){case 0:ui.numScreen=4;ui.priceScreen=0;ui.orderType=4;b.classList.remove("rawxia");b.classList.add("shang");break;case 3:ui.numScreen=4;ui.priceScreen=0;ui.orderType=4;b.classList.remove("rawxia");b.classList.add("shang");break;case 4:ui.numScreen=3;ui.priceScreen=0;ui.orderType=3;b.classList.remove("shang");b.classList.add("rawxia");break;default:break}ui.index=1;ui.w=sui.wait("请稍候...");goodsList(ui.searchkey,ui.condition,ui.categoryId,ui.saletype,ui.moduleId,ui.orderType,ui.index,ui.minPrice,ui.maxPrice,2,ui.areaCode,ui.longitude,ui.latitude)}}});mui(ui.container).on("tap","li[data=detail]",function(){if(ui.showMenu){closeMenu();return false}var a=this.getAttribute("data-v");sui.open("goodsDetailMain.html","goodsDetailMain.html",{pid:a})});function menurefresh(d,b,c,a){ui.index=1;ui.condition=d;ui.minPrice=b;ui.maxPrice=c;if(a){ui.areaCode=a;localStorage.setItem("areaCode_cayica",a)}setTimeout(function(){ui.w=sui.wait("请稍候...");goodsList(ui.searchkey,ui.condition,ui.categoryId,ui.saletype,ui.moduleId,ui.orderType,ui.index,ui.minPrice,ui.maxPrice,2,ui.areaCode,ui.longitude,ui.latitude)},200)}function scrollTop(){mui("#pullrefresh").pullRefresh().scrollTo(0,0,200)}function overrideBack(){if(ui.showMenu){closeMenu();return false}else{if(ui.w){sui.closewait(ui.w)}var a=plus.webview.currentWebview().parent();if(menu){menu.close("none",0)}if(a){a.close()}}};