var ui={container:sui.gel("container"),index:1,elem:null};var template=function(d,a,e,c){var b=['<div class="fund_l"><span>'+(d==0?"+":"-")+"￥"+a+"</span><span>"+e+"</span>",'</div><div class="fund_r"><span class="fund_date size">'+c+"</span></div>"].join("");return b};(function(a){a.init({pullRefresh:{container:"#pullrefresh",down:{callback:pulldownRefresh},up:{callback:pullupRefresh}}});a.plusReady(function(){setTimeout(function(){a("#pullrefresh").pullRefresh().pullupLoading()},150)})})(mui);function pulldownRefresh(){setTimeout(function(){sui.request("Fund/GetFundDetailList",{pageIndex:1},true,function(g){if(g){var f=g.IsPass;if(f){var e=g.ReturnDataTable.length;if(e>0){ui.container.innerHTML="";ui.elem=sui.rtips(ui.elem);var c=sui.fragment();for(var d=0;d<e;d++){var b={Amount:sui.rmoney(g.ReturnDataTable[d].Amount),TranTime:sui.formatDate("y-m-d h:i:s",g.ReturnDataTable[d].TranTime),IeFlag:g.ReturnDataTable[d].IeFlag,FundType:g.ReturnDataTable[d].FundType};var a=document.createElement("li");a.className="mui-table-view-cell";a.innerHTML=template(b.IeFlag,b.Amount,b.FundType,b.TranTime);c.appendChild(a)}ui.container.appendChild(c);ui.container.classList.remove("mui-hidden");ui.index=2;mui("#pullrefresh").pullRefresh().endPulldownToRefresh();setTimeout(function(){mui("#pullrefresh").pullRefresh().enablePullupToRefresh();mui("#pullrefresh").pullRefresh().refresh(true)},1000)}else{mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui("#pullrefresh").pullRefresh().disablePullupToRefresh();ui.elem=sui.ctips("comiiszanwushuju","暂无相关记录")}}else{mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui.toast(g.Desc)}}else{mui("#pullrefresh").pullRefresh().endPulldownToRefresh();mui.toast("无法连接到服务器，请检查网络是否连接！")}})},500)}function pullupRefresh(){setTimeout(function(){sui.request("Fund/GetFundDetailList",{pageIndex:ui.index},true,function(g){if(g){var f=g.IsPass;if(f){var e=g.ReturnDataTable.length;if(e>0){var c=sui.fragment();for(var d=0;d<e;d++){var b={Amount:sui.rmoney(g.ReturnDataTable[d].Amount),TranTime:sui.formatDate("y-m-d h:i:s",g.ReturnDataTable[d].TranTime),IeFlag:g.ReturnDataTable[d].IeFlag,FundType:g.ReturnDataTable[d].FundType};var a=document.createElement("li");a.className="mui-table-view-cell";a.innerHTML=template(b.IeFlag,b.Amount,b.FundType,b.TranTime);c.appendChild(a)}ui.container.appendChild(c);if(ui.index==1){ui.container.classList.remove("mui-hidden")}ui.index+=1;mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}else{if(ui.index==1){mui("#pullrefresh").pullRefresh().endPullupToRefresh(true);mui("#pullrefresh").pullRefresh().disablePullupToRefresh();ui.elem=sui.ctips("comiiszanwushuju","暂无相关记录")}else{mui("#pullrefresh").pullRefresh().endPullupToRefresh(true)}}}else{mui.toast(g.Desc);mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}}else{mui.toast("无法连接到服务器，请检查网络是否连接！");mui("#pullrefresh").pullRefresh().endPullupToRefresh(false)}})},500)};