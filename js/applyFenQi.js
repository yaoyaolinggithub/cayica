var ui={w:null,btnFenQi:sui.gel("btnFenQi"),errorMsg:sui.gel("errorMsg")};function refresh(){sui.request("User/GetZmxyState",{},false,function(c){if(c){var b=c.IsPass;if(b){var a={State:c.ReturnObject.State,Deposit:c.ReturnObject.Deposit,ZhiMaFen:c.ReturnObject.ZhiMaFen,MianDepositAmount:c.ReturnObject.MianDepositAmount};if(a.State==1){ui.btnFenQi.innerText="审核中...";ui.btnFenQi.setAttribute("disabled","disabled");ui.btnFenQi.classList.remove("mui-btn-warning");ui.btnFenQi.classList.add("mui-btn-grey");ui.btnFenQi.classList.remove("mui-hidden")}else{if(a.State==2){ui.errorMsg.innerText="您的押金分期额度已申请成功，芝麻信用分："+a.ZhiMaFen+" , 分期额度：￥"+sui.rmoney(a.MianDepositAmount);ui.errorMsg.classList.remove("mui-hidden")}else{if(a.State==3){ui.errorMsg.innerText="您的押金分期额度申请失败，原因可能是："+a.Deposit;ui.errorMsg.classList.remove("mui-hidden");ui.btnFenQi.innerText="重新申请";ui.btnFenQi.classList.remove("mui-hidden")}else{ui.btnFenQi.classList.remove("mui-hidden")}}}sui.closewait(ui.w)}else{sui.closewait(ui.w);mui.toast(c.Desc)}}else{sui.closewait(ui.w);mui.toast("无法连接到服务器，请检查网络是否连接！")}})}(function(a){a.plusReady(function(){setTimeout(function(){ui.w=sui.wait("请稍候...");refresh()},250)})})(mui);ui.btnFenQi.addEventListener("tap",function(){sui.open("fenQiMain.html","fenQiMain.html",{})});