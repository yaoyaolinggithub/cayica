var ui={message:localStorage.getItem("CayicaNoticeMsg"),AndroidShow:document.getElementById("AndroidShow"),AndroidSwitch:document.getElementById("AndroidSwitch"),btn_Switch:document.getElementById("btn_Switch"),AndroidTips:document.getElementById("AndroidTips"),iosTips:document.getElementById("iosTips"),AndroidSet:document.getElementById("AndroidSet"),iosSet:document.getElementById("iosSet")};(function(a){if(a.os.android){if(ui.message){ui.AndroidShow.innerText="已关闭";ui.btn_Switch.setAttribute("style","");ui.AndroidSwitch.classList.remove("mui-active");plus.push.setAutoNotification(false)}else{ui.AndroidShow.innerText="已开启";ui.btn_Switch.setAttribute("style","");ui.AndroidSwitch.classList.add("mui-active")}}else{ui.AndroidSet.style.display="none";ui.AndroidTips.style.display="none";ui.iosTips.style.display="block";ui.AndroidShow.innerText="去设置"}a.plusReady(function(){if(a.os.ios){var b=plus.ios.importClass("UIApplication");var e=b.sharedApplication();var d=0;if(e.currentUserNotificationSettings){var c=e.currentUserNotificationSettings();d=c.plusGetAttribute("types")}else{d=e.enabledRemoteNotificationTypes()}if(0==d){a.confirm("检测到您还未开启通知消息提醒功能，是否立即设置？","",["取消","确定"],function(f){if(f.index==0){return false}else{plus.runtime.openURL("app-settings:")}})}plus.ios.deleteObject(e)}ui.AndroidSwitch.addEventListener("toggle",function(j){var f=plus.android.importClass("com.igexin.sdk.PushManager");var i=plus.android.runtimeMainActivity();function h(){f.getInstance().turnOnPush(i)}function g(){f.getInstance().turnOffPush(i)}if(j.detail.isActive){ui.AndroidShow.innerText="已开启";localStorage.removeItem("CayicaNoticeMsg");h()}else{ui.AndroidShow.innerText="已关闭";localStorage.setItem("CayicaNoticeMsg","close");g()}});ui.iosSet.addEventListener("tap",function(){if(a.os.ios){plus.runtime.openURL("app-settings:")}})})})(mui);