var ui={systemTime:sui.gel("systemTime"),system:sui.gel("system"),quanTime:sui.gel("quanTime"),quan:sui.gel("quan"),orderTime:sui.gel("orderTime"),order:sui.gel("order"),recoverTime:sui.gel("recoverTime"),recover:sui.gel("recover"),w:null};(function(a){a.plusReady(function(){setTimeout(function(){ui.w=sui.wait("请稍候...");sui.request("Home/MessageCount",{},true,function(f){if(f){var e=f.IsPass;if(e){var d=f.ReturnList.length;if(d>0){for(var c=0;c<d;c++){var b={MessageType:f.ReturnList[c].MessageType,Count:f.ReturnList[c].Count,LastMessageDate:f.ReturnList[c].LastMessageDate,};switch(b.MessageType){case 0:ui.orderTime.innerText=b.LastMessageDate;if(b.Count>0){ui.order.innerText=b.Count;ui.order.classList.remove("mui-hidden")}break;case 1:ui.quanTime.innerText=b.LastMessageDate;if(b.Count>0){ui.quan.innerText=b.Count;ui.quan.classList.remove("mui-hidden")}break;case 2:ui.recoverTime.innerText=b.LastMessageDate;if(b.Count>0){ui.recover.innerText=b.Count;ui.recover.classList.remove("mui-hidden")}break;case 3:ui.systemTime.innerText=b.LastMessageDate;if(b.Count>0){ui.system.innerText=b.Count;ui.system.classList.remove("mui-hidden")}break;default:break}}}sui.closewait(ui.w)}else{mui.toast(f.Desc);sui.closewait(ui.w)}}else{mui.toast("无法连接到服务器，请检查网络是否连接");sui.closewait(ui.w)}})},250)})})(mui);mui("body").on("tap","li[data=com]",function(){var a=this.getAttribute("data-v");if(a=="sys"){sui.open("msgList.html","msgList.html",{msgType:3});ui.system.classList.add("mui-hidden");if(+ui.system.innerText>0){sui.SetBadge(ui.system.innerText)}}else{if(a=="quan"){sui.open("msgList.html","msgList.html",{msgType:1});ui.quan.classList.add("mui-hidden");if(+ui.quan.innerText>0){sui.SetBadge(ui.quan.innerText)}}else{if(a=="order"){sui.open("msgList.html","msgList.html",{msgType:0});ui.order.classList.add("mui-hidden");if(+ui.order.innerText>0){sui.SetBadge(ui.order.innerText)}}else{if(a=="recover"){sui.open("msgList.html","msgList.html",{msgType:2});ui.recover.classList.add("mui-hidden");if(+ui.recover.innerText>0){sui.SetBadge(ui.recover.innerText)}}}}}});