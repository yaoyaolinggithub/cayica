var ui={w:null,container:sui.gel("container"),title:sui.gel("title")};(function(a){a.plusReady(function(){var c=plus.webview.currentWebview();var b=c.pid;var d=c.schemeId;setTimeout(function(){ui.w=sui.wait("正在加载...");sui.request("Home/ProductRentRuleDetail",{productSkuId:b,ruleId:d},true,function(k){if(k){var h=k.IsPass;if(h){ui.title.innerText="押金："+k.ReturnObject.Deposit;var j=k.ReturnObject.DetailList;var e=j.length;var f=' <div class="row">租期</div><div class="row">租金</div>';for(var g=0;g<e;g++){f+='<div class="row">'+j[g].RentDate+'</div> <div class="row">'+j[g].RentMoney+"</div>"}ui.container.innerHTML=f;sui.closewait(ui.w)}else{mui.toast(k.Desc);sui.closewait(ui.w)}}else{mui.toast("无法连接到服务器，请检查网络是否连接！");sui.closewait(ui.w)}})},250)})})(mui);