var ui={btnOk:document.getElementById("btnOk"),maxtime:2};mui.back=function(){return false};function plusReady(){var a={main:plus.webview.getWebviewById("my.html"),cart:plus.webview.getWebviewById("cart.html"),login:plus.webview.getWebviewById("login.html")};if(a.login){a.login.close("none",0)}mui.fire(a.main,"mycenter");a.cart.evalJS("pulldownRefresh();");setTimeout(function(){plus.webview.currentWebview().close()},300)}function CountDown(){if(ui.maxtime>0){ui.btnOk.innerText=ui.maxtime+"秒后自动登陆返回";--ui.maxtime}else{clearInterval(InTime);if(window.plus){plusReady()}else{document.addEventListener("plusready",plusReady,false)}}}InTime=setInterval(CountDown,1000);ui.btnOk.addEventListener("tap",function(){if(window.plus){plusReady()}else{document.addEventListener("plusready",plusReady,false)}});