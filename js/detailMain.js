var ui={more:document.getElementById("more"),msgNum:document.getElementById("msgNum")};var pid=null;(function(a){a.plusReady(function(){pid=plus.webview.currentWebview().pid;a.init({subpages:[{url:"goodsDetailSub.html",id:"goodsDetailSub.html"+Math.random(),styles:{top:(immersed+44)+"px",bottom:"0px"},extras:{pid:pid}}]});ui.more.addEventListener("tap",function(){var b=plus.webview.currentWebview().children()[0];if(b){b.evalJS("toggle();")}})})})(mui);function showMsg(a){ui.msgNum.innerText=a;ui.msgNum.classList.remove("mui-hidden")}function hideMsg(a){ui.msgNum.classList.add("mui-hidden")};