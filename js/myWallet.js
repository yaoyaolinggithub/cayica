var ui={yue:sui.gel("yue"),cardNum:sui.gel("cardNum"),withdraw:sui.gel("withdraw"),w:null,yjyouHui:sui.gel("yjyouHui"),yhQuan:sui.gel("yhQuan"),recAmount:sui.gel("recAmount"),recNum:sui.gel("recNum"),IsCert:0};function refresh(){sui.request("Fund/GetMyWallet",{},true,function(b){if(b){var a=b.IsPass;if(a){ui.yue.innerText="¥"+sui.rmoney(b.ReturnDataTable[0].AvailBal);ui.cardNum.innerText=b.ReturnDataTable[0].BankNum;ui.yjyouHui.innerText="¥"+sui.rmoney(b.ReturnDataTable[0].AvailDepositAmount);ui.yhQuan.innerText=b.ReturnDataTable[0].QuanNum;ui.recAmount.innerText="¥"+sui.rmoney(b.ReturnDataTable[0].RecommendAward);ui.recNum.innerText=b.ReturnDataTable[0].RecommendNum;ui.IsCert=b.ReturnDataTable[0].IsCert;sui.closewait(ui.w)}else{mui.toast(b.Desc);sui.closewait(ui.w)}}else{mui.toast("无法连接到服务器，请检查网络是否连接");sui.closewait(ui.w)}})}(function(a){a.plusReady(function(){a.init({beforeback:function(){var b=plus.webview.getWebviewById("my.html");if(b){mui.fire(b,"mycenter")}}});setTimeout(function(){ui.w=sui.wait("请稍候...");refresh()},250)})})(mui);ui.withdraw.addEventListener("tap",function(){sui.open("withdraw.html","withdraw.html",{})});mui(".mui-table-view").on("tap","li[data=list]",function(){var a=this.getAttribute("data-p");if(a=="hkmx"){sui.open("repaymentMain.html","repaymentMain.html",{})}else{if(a=="zjmx"){sui.open("fundsDetailMain.html","fundsDetailMain.html",{})}else{if(a=="txjl"){sui.open("withdrawMain.html","withdrawMain.html",{})}}}});mui(".mui-content").on("tap","div[data=com]",function(){var a=this.getAttribute("data-t");if(a=="cardList"){sui.open("bankCardList.html","bankCardList.html",{})}else{if(a=="yajin"){if(ui.IsCert==0){plus.nativeUI.alert("您的实名认证正在审核中，暂时无法申请分期额度",function(){sui.open("realState.html","realState.html",{})},"实名认证")}else{if(ui.IsCert==2){plus.nativeUI.alert("您还未实名认证，暂时无法申请分期额度",function(){sui.open("realName.html","realName.html",{})},"实名认证")}else{sui.open("applyFenQi.html","applyFenQi.html",{})}}}else{if(a=="quan"){sui.open("myQuanMain.html","myQuanMain.html",{})}else{if(a=="tuijian"){sui.open("recommendMain.html","recommendMain.html",{})}}}}});