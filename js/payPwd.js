var ui={oldPwd:sui.gel("oldPwd"),txtMobile:sui.gel("txtMobile"),btnSend:sui.gel("btnSend"),txtYzm:sui.gel("txtYzm"),newPwd:sui.gel("newPwd"),btnSure:sui.gel("btnSure"),w:null,isSend:0,channel:2};var getMobile=function(){ui.w=sui.wait("请稍候...");sui.request("User/GetProfile",{},true,function(b){if(b){var a=b.IsPass;if(a){ui.txtMobile.value=b.ReturnDataTable[0].Mobile;sui.closewait(ui.w)}else{sui.closewait(ui.w);ui.txtMobile.value="获取手机号";mui.toast(b.Desc)}}else{sui.closewait(ui.w);ui.txtMobile.value="获取手机号";mui.toast("无法连接到服务器，请检查网络是否连接")}})};(function(a){a.plusReady(function(){ui.channel=plus.os.name=="Android"?2:3;setTimeout(function(){getMobile()},250);ui.txtMobile.addEventListener("tap",function(){var e=ui.oldPwd.value.trim();if(sui.IsNullOrEmpty(e)){getMobile()}});ui.btnSend.addEventListener("tap",function(){var e=ui.oldPwd.value.trim();var f=ui.txtMobile.value.trim();if(sui.IsNullOrEmpty(e)){a.toast("请输入原支付密码");return}else{if(sui.IsNullOrEmpty(f)){a.toast("手机号码初始化失败，请点击获取手机号");return}}ui.isSend=0;ui.btnSend.innerText="请稍候...";ui.btnSend.setAttribute("disabled","disabled");sui.request("Passport/GetTime",{},true,function(h){if(h){var g=h.IsPass;if(g){b(h.ReturnObject,e)}else{a.toast("获取验证码失败,请稍候再试");ui.btnSend.removeAttribute("disabled");ui.btnSend.innerText="获取验证码"}}else{a.toast("获取验证码失败，请检查网络是否连接");ui.btnSend.removeAttribute("disabled");ui.btnSend.innerText="获取验证码"}})});var d=function(f){if(f!=null){var g,e;e=/\d*/i;g=f.match(e);return(g==f)?true:false}return false};var c=function(l){hash=hex_md5(l);var f="000000";var g=0;for(var k=hash.length;k>0;k--){var h=0;var e=hash.substring(k-1,k);if(d(e)){g++;if(g==7){break}var h=9-parseInt(e);f=f+h.toString()}}f=f.substring(f.length-6,f.length);return f};var b=function(f,g){f=c(f)+f;var e={imgCode:f,channel:ui.channel,codeType:0,bussinessType:2,pwd:g};sui.post("Passport/GetLoginPhoneCode",e,function(k){if(k){var j=k.IsPass;if(j){ui.isSend=1;ui.txtMobile.setAttribute("disabled","disabled");var i=180;function h(){if(i>=0){ui.btnSend.innerText=i+"s";--i}else{clearInterval(InTime);ui.btnSend.innerText="获取验证码";ui.btnSend.removeAttribute("disabled")}}InTime=setInterval(h,1000)}else{ui.btnSend.innerText="获取验证码";ui.btnSend.removeAttribute("disabled");a.toast(k.Desc)}}else{ui.btnSend.removeAttribute("disabled");ui.btnSend.innerText="获取验证码";a.toast("发送失败,请检查网络是否连接")}})};ui.btnSure.addEventListener("tap",function(){var f=ui.oldPwd.value.trim();var g=ui.newPwd.value.trim();var h=ui.txtYzm.value.trim();if(!ui.isSend){a.toast("请获取手机验证码");return}else{if(sui.IsNullOrEmpty(f)){a.toast("请输入原支付密码");return}else{if(sui.IsNullOrEmpty(h)){a.toast("请输入验证码");return}else{if(sui.IsNullOrEmpty(g)){a.toast("请输入新支付密码");return}}}}ui.w=sui.wait("正在提交...");var e={code:h,oldPwd:f,newPwd:g};sui.post("User/ModifyPayPassword",e,function(j){if(j){var i=j.IsPass;if(i){sui.closewait(ui.w);a.toast("新支付密码设置成功");plus.webview.currentWebview().close()}else{sui.closewait(ui.w);a.toast(j.Desc)}}else{sui.closewait(ui.w);a.toast("提交失败，请检查网络是否连接！")}})})})})(mui);