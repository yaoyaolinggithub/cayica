var ele={updateProgress:sui.gel("updateProgress"),numProcess:sui.gel("numProcess"),Progress_box:sui.gel("Progress_box"),backdrops:sui.gel("backdrops")};var checkServerVersion=function(b,a,c){sui.post("Passport/Upgrade",{appId:plus.runtime.appid,version:a,os:plus.os.name},function(g){if(g){var f=g.IsPass;if(f){var e={DownloadUrl:g.ReturnObject.DownloadUrl,HasVersion:g.ReturnObject.HasVersion,UpdateType:g.ReturnObject.UpdateType,PackageSize:g.ReturnObject.PackageSize,Version:g.ReturnObject.Version,NewFunction:g.ReturnObject.NewFunction};if(e.HasVersion){sui.gel("version").innerText=e.Version;sui.gel("fileSize").innerText=e.PackageSize;sui.gel("updateVersion").setAttribute("data-type",e.UpdateType);sui.gel("updateVersion").setAttribute("data-url",e.DownloadUrl);sui.gel("newfunction").innerHTML=e.NewFunction;if(b=="index"){var d=plus.webview.getWebviewById("main.html");if(d){d.evalJS("openbackdrop();")}}if(mui.os.android&&parseFloat(mui.os.version)<4.4){sui.gel("masked").classList.remove("masked")}sui.gel("version_box").classList.remove("mui-hidden");sui.gel("backdrops").classList.remove("mui-hidden");c(true)}else{c(false)}}else{c(false)}}else{c(false)}})};sui.gel("updateVersion").addEventListener("tap",function(){var a=this.getAttribute("data-type");var b=this.getAttribute("data-url");if(!sui.IsNullOrEmpty(a)&&!sui.IsNullOrEmpty(b)){if(a==1){plus.runtime.openURL(b)}else{sui.gel("version_box").classList.add("mui-hidden");updateApp(b)}}else{plus.nativeUI.alert("更新出错，请退出应用程序稍后重新尝试！",function(){plus.runtime.restart()})}});var updateApp=function(a){ele.updateProgress.style.width="0%";ele.numProcess.innerText="0%";ele.Progress_box.classList.remove("mui-hidden");var b=plus.downloader.createDownload(a,{method:"GET"},function(f,e){if(e==200){plus.runtime.install(f.filename,{force:true},function(){ele.updateProgress.style.width="100%";ele.numProcess.innerText="100%";ele.Progress_box.classList.add("mui-hidden");ele.backdrops.classList.add("mui-hidden");var d=plus.webview.getWebviewById("main.html");if(d){d.evalJS("closebackdrop();")}plus.nativeUI.alert("升级成功, 立即重启应用程序!",function(){plus.runtime.restart()})},function(g){ele.Progress_box.classList.add("mui-hidden");ele.backdrops.classList.add("mui-hidden");var d=plus.webview.getWebviewById("main.html");if(d){d.evalJS("closebackdrop();")}plus.nativeUI.alert("更新失败，请退出应用程序稍后重新尝试！",function(){plus.runtime.restart()})})}else{ele.Progress_box.classList.add("mui-hidden");ele.backdrops.classList.add("mui-hidden");var c=plus.webview.getWebviewById("main.html");if(c){c.evalJS("closebackdrop();")}plus.nativeUI.alert("更新失败，请退出应用程序稍后重新尝试！",function(){plus.runtime.restart()})}});b.addEventListener("statechanged",function(e,c){if(c!=null&&c==200&&e.state!=null){var d=parseInt(100*e.downloadedSize/e.totalSize);if(!d){ele.updateProgress.style.width="0%";ele.numProcess.innerText="0%"}else{d=d>100?100:d;ele.updateProgress.style.width=d+"%";ele.numProcess.innerText=d+"%"}}});b.start()};function checkVersion(a){plus.runtime.getProperty(plus.runtime.appid,function(b){checkServerVersion("index",b.version,a)})}function ManualCheckVersion(a){plus.runtime.getProperty(plus.runtime.appid,function(c){var b=c.version;sui.gel("NewVersion").innerText="擦一擦 V"+b;checkServerVersion("about",b,a)})};