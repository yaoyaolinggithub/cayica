var ui={w:null,elem:null,container:sui.gel("container"),index:1,channel:2,shares:{},loopPullDown:null};(function(a){if(a.os.ios){document.getElementById("safari").classList.remove("mui-hidden")}a.init({pullRefresh:{container:"#pullrefresh",down:{callback:pulldownRefresh},up:{callback:pullupRefresh}}});a.plusReady(function(){ui.channel=plus.os.name=="Android"?2:3;setTimeout(function(){a("#pullrefresh").pullRefresh().pullupLoading();plus.share.getServices(function(d){if(d&&d.length>0){for(var c=0;c<d.length;c++){var b=d[c];ui.shares[b.id]=b}}},function(){a.toast("获取分享服务列表失败")})},180)})})(mui);var template=function(a){var c={border:"",classVal:"primary",word:"租",state:"立即领取",fontsize:"",length:a.Amount.length};if(c.length==3||c.length==4){c.fontsize="font-size3"}else{if(c.length>=5){c.fontsize="font-size5"}}if(a.CanGet){if(a.QuanType==0){c.border="border";c.word="押";c.classVal="main"}}else{if(a.QuanType==0){c.word="押"}c.border="border2";c.state="已经领取";c.classVal="gray"}var b=['<div class="desc '+c.border+'"><div class="box"><span class="mui-badge-circle">'+c.word+"</span>",'<span class="quandesc"><span class="mui-ellipsis">'+a.Name+'</span><span class="mui-ellipsis">'+a.UseCategory+"</span>",'</span></div><div class="date"> 有效日期：'+a.ValidTime+'</div></div><ul class="quan" >','<li class="'+c.classVal+" "+c.fontsize+'" data="'+(a.CanGet==true?"com":"")+'" data-v="'+a.Id+'"><span class="sign">¥</span>'+a.Amount+'<span class="sign block">'+c.state+"</span></li></ul>"].join("");return b};function pulldownRefresh(){clearTimeout(ui.loopPullDown);setTimeout(function(){sui.request("Home/QuanList",{pageIndex:1,useRange:3},true,function(f){if(f){var e=f.IsPass;if(e){var b=f.ReturnList.length;ui.container.innerHTML="";if(b>0){ui.elem=sui.rtips(ui.elem);var c=sui.fragment();for(var d=0;d<b;d++){var a={Id:f.ReturnList[d].Id,Name:f.ReturnList[d].Name,QuanType:f.ReturnList[d].QuanType,Amount:f.ReturnList[d].Amount,ValidTime:f.ReturnList[d].ValidTime,UseCategory:f.ReturnList[d].UseCategory,CanGet:f.ReturnList[d].CanGet};var g=document.createElement("div");g.className="quan-box";g.innerHTML=template(a);c.appendChild(g)}ui.container.appendChild(c);ui.index=2;mui("#pullrefresh").pullRefresh().endPulldownToRefresh();ui.loopPullDown=setTimeout(function(){mui("#pullrefresh").pullRefresh().enablePullupToRefresh();mui("#pullrefresh").pullRefresh().refresh(true)},1000)}else{ui.index=1;mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui("#pullrefresh").pullRefresh().disablePullupToRefresh();ui.elem=sui.ctips("comiiszanwushuju","还没有可领取的优惠券哦~")}}else{mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui.toast(f.Desc)}}else{mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui.toast("无法连接到服务器，请检查网络是否连接！")}})},500)}function pullupRefresh(){setTimeout(function(){sui.request("Home/QuanList",{pageIndex:ui.index,useRange:3},true,function(f){if(f){var e=f.IsPass;if(e){var b=f.ReturnList.length;if(b>0){var c=sui.fragment();for(var d=0;d<b;d++){var a={Id:f.ReturnList[d].Id,Name:f.ReturnList[d].Name,QuanType:f.ReturnList[d].QuanType,Amount:f.ReturnList[d].Amount,ValidTime:f.ReturnList[d].ValidTime,UseCategory:f.ReturnList[d].UseCategory,CanGet:f.ReturnList[d].CanGet};var g=document.createElement("div");g.className="quan-box";g.innerHTML=template(a);c.appendChild(g)}ui.container.appendChild(c);ui.index+=1;mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}else{if(ui.index==1){mui("#pullrefresh").pullRefresh().endPullupToRefresh(true);mui("#pullrefresh").pullRefresh().disablePullupToRefresh();ui.elem=sui.ctips("comiiszanwushuju","还没有可领取的优惠券哦~")}else{mui("#pullrefresh").pullRefresh().endPullupToRefresh(true)}}}else{mui.toast(f.Desc);mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}}else{mui.toast("无法连接到服务器，请检查网络是否连接！");mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}})},500)}mui(ui.container).on("tap","li[data=com]",function(){if(!sui.isLogin()){sui.open("login.html","login.html",{});return}var a=this.getAttribute("data-v");ui.w=sui.wait("请稍候...");sui.post("Home/ReceiveQuan",{quanId:a,channel:ui.channel},function(c){if(c){var b=c.IsPass;if(b){pulldownRefresh();mui.toast("领取成功");sui.closewait(ui.w)}else{mui.toast(c.Desc);sui.closewait(ui.w)}}else{mui.toast("无法连接到服务器，请检查网络是否连接！");sui.closewait(ui.w)}})});var shareMessage=function(c,b,a){var f={extra:{scene:b}};var e=sui.shared()+"#/getcoupon?source=2";f.href=e;var d="擦一擦优惠券发放中，快来领取优惠券吧！！！";if(a==3){d=d+e}f.title="擦一擦优惠券发放中";f.content=d;f.thumbs=["_www/images/appicon.png"];f.pictures=["_www/images/appicon.png"];c.send(f,function(){},function(g){})};var shareAction=function(d,b,a){var c=null;if(!d||!(c=ui.shares[d])){mui.toast("无效的分享服务！");return}if(c.authenticated){shareMessage(c,b,a)}else{c.authorize(function(){shareMessage(c,b,a)},function(f){})}};function copyVal(f){if(plus.os.name=="Android"){var c=plus.android.importClass("android.content.Context");var a=plus.android.runtimeMainActivity();var d=a.getSystemService(c.CLIPBOARD_SERVICE);plus.android.invoke(d,"setText",f)}else{var b=plus.ios.importClass("UIPasteboard");var e=b.generalPasteboard();e.setValueforPasteboardType(f,"public.utf8-plain-text")}mui.toast("已复制到剪贴板")}mui("body").on("tap","a[class=share_li]",function(){var e=this;var b=parseInt(e.getAttribute("sid"));var d=sui.shared()+"#/getcoupon?source=2";var a="擦一擦优惠券发放中，快来领取优惠券吧！！！ (分享自@擦一擦)。 "+d;if(b==4){var f=plus.messaging.createMessage(plus.messaging.TYPE_SMS);f.body=a;plus.messaging.sendMessage(f)}else{if(b==5){var f=plus.messaging.createMessage(plus.messaging.TYPE_EMAIL);f.body=a;plus.messaging.sendMessage(f)}else{if(b==6){plus.runtime.openURL(d)}else{if(b==7){copyVal(d)}else{var c=[{id:"weixin",ex:"WXSceneSession"},{id:"weixin",ex:"WXSceneTimeline"},{id:"qq"},{id:"sinaweibo"}];shareAction(c[b].id,c[b].ex,b)}}}}mui("#Share").popover("toggle")});function toggle(){mui("#Share").popover("toggle")};