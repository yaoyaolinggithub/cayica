var ui={search:document.getElementById("search"),container:document.getElementById("container"),localstore:document.getElementById("localstore"),btnSearch:document.getElementById("btnSearch"),speech:document.getElementById("speech")};var nativeWebview,imm,InputMethodManager;var initNativeObjects=function(){if(mui.os.android){var a=plus.android.runtimeMainActivity();var b=plus.android.importClass("android.content.Context");InputMethodManager=plus.android.importClass("android.view.inputmethod.InputMethodManager");imm=a.getSystemService(b.INPUT_METHOD_SERVICE)}else{nativeWebview=plus.webview.currentWebview().nativeInstanceObject()}};var showSoftInput=function(){var a=plus.webview.currentWebview().nativeInstanceObject();if(mui.os.android){plus.android.importClass(a);a.requestFocus();imm.toggleSoftInput(0,InputMethodManager.SHOW_FORCED)}else{a.plusCallMethod({setKeyboardDisplayRequiresUserAction:false})}setTimeout(function(){mui.trigger(ui.search,"tap");ui.search.focus()},200)};function startRecognize(){var a={};a.engine="iFly";plus.speech.startRecognize(a,function(b){ui.search.value+=b.toString().replace(/\,/g,"").replace(/\，/g,"").replace(/\。/g,"");if(ui.search.value.trim()!=""){ui.speech.classList.add("mui-hidden");ui.btnSearch.classList.remove("mui-hidden")}},function(b){})}(function(e){if(e.os.ios){ui.container.classList.add("ios-scroll-bounce")}var b=JSON.parse(localStorage.getItem("searchKey_cayica")||"[]");var a=b.length;var c="";if(a){for(var d=0;d<a;d++){c+='<li class="mui-table-view-cell" data="search" data-v="'+b[d]+'"><div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red" data="del">删除</a>';c+='</div><div class="mui-slider-handle"><span class="mui-icon iconfont icon-sousuo"></span>'+b[d]+"</div></li>"}c+='<li class="mui-table-view-cell center" data="delAll">清空搜索历史</li>';ui.localstore.innerHTML=c;ui.localstore.classList.remove("mui-hidden")}e.plusReady(function(){initNativeObjects();showSoftInput();ui.btnSearch.addEventListener("tap",function(){var f=ui.search.value.replace(/\'/g,"").replace(/\\/g,"").replace(/\//g,"");if(f==""){mui.toast("请输入搜索关键字")}else{setItem(f);operater(f)}});ui.speech.addEventListener("tap",function(){ui.search.blur();startRecognize()})})})(mui);var operater=function(a){ui.search.blur();mui.openWindow({url:"goodsList.html",id:"goodsList.html",show:{duration:250,aniShow:"pop-in"},waiting:{autoShow:false},extras:{categoryId:0,saletype:0,moduleId:0,searchkey:a}});setTimeout(function(){var b=plus.webview.getWebviewById("goodsDetailMain.html");if(b){b.close("none",0)}plus.webview.currentWebview().close("none",0)},600)};ui.search.addEventListener("keydown",function(c){var b=this;if(13==c.keyCode){var a=b.value.replace(/\'/g,"").replace(/\\/g,"").replace(/\//g,"");if(a==""){mui.toast("请输入搜索关键字");mui.trigger(ui.search,"tap");setTimeout(function(){ui.search.focus()},200)}else{setItem(a);operater(a)}}},false);ui.search.addEventListener("input",function(){var a=this.value.trim();if(a==""){ui.btnSearch.classList.add("mui-hidden");ui.speech.classList.remove("mui-hidden")}else{ui.speech.classList.add("mui-hidden");ui.btnSearch.classList.remove("mui-hidden")}});mui("body").on("tap",".mui-icon-clear",function(){var a=ui.search.value.trim();if(a==""){ui.btnSearch.classList.add("mui-hidden");ui.speech.classList.remove("mui-hidden")}else{ui.speech.classList.add("mui-hidden");ui.btnSearch.classList.remove("mui-hidden")}});mui(ui.container).on("tap","span[data=word]",function(){var a=this.innerText;operater(a)});var setItem=function(c){var b=JSON.parse(localStorage.getItem("searchKey_cayica")||"[]");removeArr(b,c);var a=b.length;if(a>=10){b.pop();b.unshift(c)}else{b.unshift(c)}localStorage.setItem("searchKey_cayica",JSON.stringify(b))};mui(ui.container).on("tap","li[data=search]",function(){var a=this.getAttribute("data-v");operater(a)});mui(ui.container).on("tap","a[data=del]",function(){var d=this.parentNode.parentNode;var c=d.getAttribute("data-v");d.parentNode.removeChild(d);var b=JSON.parse(localStorage.getItem("searchKey_cayica")||"[]");removeArr(b,c);var a=ui.localstore.querySelectorAll("li").length;if(a<=1){ui.localstore.classList.add("mui-hidden");ui.localstore.innerHTML=""}localStorage.setItem("searchKey_cayica",JSON.stringify(b))});mui(ui.container).on("tap","li[data=delAll]",function(){localStorage.removeItem("searchKey_cayica");ui.localstore.classList.add("mui-hidden");ui.localstore.innerHTML=""});var removeArr=function(a,d){var b=-1;for(var c=0;c<a.length;c++){if(a[c]==d){b=c}}if(b>-1){a.splice(b,1)}};