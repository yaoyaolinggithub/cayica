var ui={btnReset:sui.gel("btnReset"),btnSure:sui.gel("btnSure"),txtMin:sui.gel("minPrice"),txtMax:sui.gel("maxPrice"),conditionbox:sui.gel("condition"),container:sui.gel("container"),main:null,txtArea:sui.gel("txtArea"),cityData4:null,provicebox:sui.gel("provicebox"),citybox:sui.gel("citybox"),districtbox:sui.gel("districtbox"),roadbox:sui.gel("roadbox"),itemprovice:sui.gel("itemprovice"),itemcity:sui.gel("itemcity"),itemdistrict:sui.gel("itemdistrict"),itemroad:sui.gel("itemroad"),abox:sui.gel("sliderSegmentedControl").querySelectorAll("a"),AreaPicker:sui.gel("AreaPicker"),otherAddr:sui.gel("otherAddr"),myAddr:sui.gel("myAddr"),sliderbox:sui.gel("sliderSegmentedControl"),pcdr:sui.gel("pcdr"),areaCode:null,addrlen:0,tempArea:null,closePicker:sui.gel("closePicker"),returnAddr:sui.gel("returnAddr"),styleHidden:sui.gel("styleHidden")};(function(a){if(a.os.ios){ui.container.classList.add("ios-scroll-bounce")}a.init({keyEventBind:{backbutton:false,menubutton:false}});a.plusReady(function(){ui.main=plus.webview.currentWebview().opener()})})(mui);function closeMenu(){mui.fire(ui.main,"menu:swiperight")}var pickerData=function(d,h,b){ui.container.classList.remove("sui-hidden");ui.container.scrollTop=0;ui.returnAddr.classList.add("mui-hidden");ui.closePicker.classList.remove("mui-hidden");for(var e=1;e<4;e++){ui.abox[e].classList.add("mui-hidden");ui.abox[e].classList.remove("mui-active");ui.abox[e].innerText="请选择"}ui.itemcity.classList.remove("mui-active");ui.itemdistrict.classList.remove("mui-active");ui.itemroad.classList.remove("mui-active");ui.provicebox.innerText="请选择";ui.provicebox.classList.add("mui-active");ui.itemprovice.classList.add("mui-active");var g=d.length;var f="";ui.itemprovice.innerHTML="";for(var c=0;c<g;c++){f+='<p class="sui-p "  data-v="'+d[c].value+'" data="provice" idx="'+c+'">'+d[c].text+'<span class="mui-icon mui-icon-checkmarkempty"></span></p>'}ui.itemprovice.innerHTML=f;ui.itemcity.innerHTML="";ui.itemdistrict.innerHTML="";ui.itemroad.innerHTML="";if(sui.isLogin()&&ui.addrlen){if(b){var l=ui.myAddr.querySelectorAll("li");var g=l.length;if(!sui.IsNullOrEmpty(h)){var l=ui.myAddr.querySelectorAll("li");var g=l.length;for(var a=0;a<g;a++){if(ui.areaCode==l[a].getAttribute("data-c")){l[a].classList.add("sui-active");break}else{l[a].classList.remove("sui-active")}}}else{for(var a=0;a<g;a++){l[a].classList.remove("sui-active")}}}ui.sliderbox.classList.add("mui-hidden");ui.pcdr.classList.add("mui-hidden");ui.otherAddr.classList.remove("mui-hidden");ui.myAddr.classList.remove("mui-hidden")}else{ui.otherAddr.classList.add("mui-hidden");ui.myAddr.classList.add("mui-hidden");ui.sliderbox.classList.remove("mui-hidden");ui.pcdr.classList.remove("mui-hidden")}};mui(ui.conditionbox).on("tap","span[data=switch]",function(){var c=this;var a=c.parentNode.parentNode.querySelector('div[data="hidden"]');var b=c.getAttribute("data-v");if(b==0){c.innerHTML='全部<span class="mui-icon mui-icon-arrowup"></span>';c.setAttribute("data-v",1);a.classList.remove("mui-hidden")}else{c.innerHTML='全部<span class="mui-icon mui-icon-arrowdown"></span>';c.setAttribute("data-v",0);a.classList.add("mui-hidden")}});mui(ui.conditionbox).on("tap","span[data=attr]",function(){var c=this;var b=c.getAttribute("data-c");var a=c.getAttribute("data-w");if(b==0){c.innerHTML='<span class="mui-icon mui-icon-checkmarkempty"></span>'+a;c.classList.add("active");c.setAttribute("data-c",1)}else{c.innerHTML=a;c.classList.remove("active");c.setAttribute("data-c",0)}});ui.btnReset.addEventListener("tap",function(){ui.txtMin.value="";ui.txtMax.value="";var b={hiddenArr:ui.conditionbox.querySelectorAll('div[data="hidden"]'),switchArr:ui.conditionbox.querySelectorAll('span[data="switch"]'),attrArr:ui.conditionbox.querySelectorAll('span[data-c="1"]')};var a={hLen:b.hiddenArr.length,sLen:b.switchArr.length,aLen:b.attrArr.length};for(var e=0;e<a.hLen;e++){b.hiddenArr[e].classList.add("mui-hidden")}for(var d=0;d<a.sLen;d++){b.switchArr[d].innerHTML='全部<span class="mui-icon mui-icon-arrowdown"></span>';b.switchArr[d].setAttribute("data-v",0)}for(var c=0;c<a.aLen;c++){b.attrArr[c].innerHTML=b.attrArr[c].getAttribute("data-w");b.attrArr[c].classList.remove("active");b.attrArr[c].setAttribute("data-c",0)}});ui.btnSure.addEventListener("tap",function(){var e={min:ui.txtMin.value.trim()||"0",max:ui.txtMax.value.trim()||"0",Arr:ui.conditionbox.querySelectorAll('div[data="parabox"]'),conditions:""};if(!e.min.isFloat()){mui.toast("请输入正确的最低价，价格只能是数字，允许保留两位小数");return}else{if(!e.max.isFloat()){mui.toast("请输入正确的最高价，价格只能是数字，允许保留两位小数");return}else{if(+e.max<(+e.min)&&e.max!=0){mui.toast("价格区间有误，最低价不能高于最高价");return}}}var l=e.Arr.length;for(var f=0;f<l;f++){var h=e.Arr[f].getAttribute("data-v");var k=e.Arr[f].querySelectorAll('span[data-c="1"]');var m=k.length;var n="";if(m){for(var d=0;d<m;d++){var a=(d==0?h+"_"+k[d].getAttribute("data-v"):k[d].getAttribute("data-v"));n+=a+","}n=sui.IsNullOrEmpty(n)?"":n.substring(0,n.length-1);e.conditions+=n+"@"}}var c=sui.IsNullOrEmpty(e.conditions)?"":e.conditions.substring(0,e.conditions.length-1);var g=e.min;var b=e.max;closeMenu();ui.main.evalJS('menurefresh("'+c+'","'+g+'","'+b+'","'+(ui.areaCode||"")+'");')});function conditionRefresh(r,v,s,a,b,u){var l=JSON.parse(r.replace(/\'/ig,'"'));var g="";var m=l.length;for(var p=0;p<m;p++){var h=l[p].AttrValList.length;var d=['<div class="'+(h>0?"":"mui-hidden")+'"  data="parabox" data-v="'+l[p].AttrId+'"><div class="h-box"><span>'+l[p].AttrName+"</span>",h>6?'<span class="right" data="switch" data-v="0">全部<span class="mui-icon mui-icon-arrowdown"></span></span>':"",'</div><div class="h-container">{%attr%}</div>{%attrmore%}</div>'];var f=h>6?'<div class="h-container mui-hidden" data="hidden">{%more%}</div>':"";var e="",t="";for(var n=0;n<h;n++){if(n>5){t+='<span class="mui-dge" data-c="0" data="attr" data-v="'+l[p].AttrValList[n].AttrValId+'" data-w="'+l[p].AttrValList[n].AttrValName+'">'+l[p].AttrValList[n].AttrValName+"</span>"}else{e+='<span class="mui-dge"  data-c="0" data="attr" data-v="'+l[p].AttrValList[n].AttrValId+'" data-w="'+l[p].AttrValList[n].AttrValName+'">'+l[p].AttrValList[n].AttrValName+"</span>"}}f=f==""?"":f.replace("{%more%}",t);g+=d.join("").replace("{%attr%}",e).replace("{%attrmore%}",f)}ui.conditionbox.innerHTML=g;if(!sui.IsNullOrEmpty(u)){ui.cityData4=JSON.parse(v.replace(/\'/ig,'"')||"[]");var c=JSON.parse(s.replace(/\'/ig,'"')||"[]");ui.areaCode=b;ui.txtArea.innerText=a;ui.addrlen=c.length;var o="";if(ui.addrlen&&sui.isLogin()){for(var q=0;q<ui.addrlen;q++){o+='<li class="mui-table-view-cell" data="addr" data-c="'+c[q].AreaCode+'" ><span class="mui-icon iconfont icon-dizhi1"></span>'+c[q].Area+c[q].Address+'<span class="mui-icon mui-icon-checkmarkempty"></span></li>'}ui.myAddr.innerHTML=o}pickerData(ui.cityData4,u,true)}}mui(ui.pcdr).on("tap","p[data=provice]",function(){var j=this;var k=j.classList.contains("active");if(k){return false}else{var c=ui.itemprovice.querySelectorAll("p[data=provice]");var h=c.length;for(var a=0;a<h;a++){c[a].classList[j==c[a]?"add":"remove"]("sui-active")}var d=j.getAttribute("data-v");var f=j.innerText;var l=j.getAttribute("idx");var b=ui.cityData4[l].children;if(b&&b.length){ui.provicebox.innerText=f;ui.provicebox.classList.remove("mui-active");ui.districtbox.classList.add("mui-hidden");ui.roadbox.classList.add("mui-hidden");ui.citybox.classList.remove("mui-hidden");ui.citybox.classList.add("mui-active");ui.citybox.innerText="请选择";var g="";for(var e=0;e<b.length;e++){g+='<p class="sui-p"  data-v="'+b[e].value+'" data="city"  pidx="'+l+'"  idx="'+e+'">'+b[e].text+'<span class="mui-icon mui-icon-checkmarkempty"></span></p>'}ui.itemcity.innerHTML=g;ui.itemprovice.classList.remove("mui-active");ui.itemcity.classList.add("mui-active");ui.tempArea=f}else{ui.txtArea.innerText=f;ui.areaCode=d;ui.provicebox.innerText=f;ui.AreaPicker.classList.remove("mui-active");pickerData(ui.cityData4,"",true)}}});mui(ui.pcdr).on("tap","p[data=city]",function(){var k=this;var l=k.classList.contains("active");if(l){return false}else{var c=ui.itemcity.querySelectorAll("p[data=city]");var h=c.length;for(var a=0;a<h;a++){c[a].classList[k==c[a]?"add":"remove"]("sui-active")}var d=k.getAttribute("data-v");var f=k.innerText;var m=k.getAttribute("idx");var j=k.getAttribute("pidx");var b=ui.cityData4[j].children[m].children;ui.tempArea+=f;if(b&&b.length){ui.citybox.innerText=f;ui.citybox.classList.remove("mui-active");ui.districtbox.classList.remove("mui-hidden");ui.districtbox.classList.add("mui-active");ui.districtbox.innerText="请选择";ui.roadbox.classList.add("mui-hidden");var g="";for(var e=0;e<b.length;e++){g+='<p class="sui-p"  data-v="'+b[e].value+'" data="district" pidx="'+j+'" idx="'+m+'" dx="'+e+'">'+b[e].text+'<span class="mui-icon mui-icon-checkmarkempty"></span></p>'}ui.itemdistrict.innerHTML=g;ui.itemcity.classList.remove("mui-active");ui.itemdistrict.classList.add("mui-active")}else{ui.txtArea.innerText=ui.tempArea;ui.areaCode=d;ui.AreaPicker.classList.remove("mui-active");pickerData(ui.cityData4,"",true)}}});mui(ui.pcdr).on("tap","p[data=district]",function(){var k=this;var l=k.classList.contains("active");if(l){return false}else{var n=ui.itemdistrict.querySelectorAll("p[data=district]");var g=n.length;for(var j=0;j<g;j++){n[j].classList[k==n[j]?"add":"remove"]("sui-active")}var b=k.getAttribute("data-v");var e=k.innerText;var m=k.getAttribute("idx");var h=k.getAttribute("pidx");var o=k.getAttribute("dx");var a=ui.cityData4[h].children[m].children[o].children;ui.tempArea+=e;if(a&&a.length){ui.districtbox.innerText=e;ui.districtbox.classList.remove("mui-active");ui.roadbox.classList.remove("mui-hidden");ui.roadbox.classList.add("mui-active");ui.roadbox.innerText="请选择";var f="";for(var c=0;c<a.length;c++){f+='<p class="sui-p"  data-v="'+a[c].value+'" data="road">'+a[c].text+"</p>"}ui.itemroad.innerHTML=f;ui.itemdistrict.classList.remove("mui-active");ui.itemroad.classList.add("mui-active")}else{ui.txtArea.innerText=ui.tempArea;ui.areaCode=b;ui.AreaPicker.classList.remove("mui-active");pickerData(ui.cityData4,"",true)}}});mui(ui.pcdr).on("tap","p[data=road]",function(){var b=this;var c=b.getAttribute("data-v");var a=b.innerText;ui.tempArea+=a;ui.txtArea.innerText=ui.tempArea;ui.areaCode=c;ui.AreaPicker.classList.remove("mui-active");pickerData(ui.cityData4,"",true)});ui.otherAddr.addEventListener("tap",function(){this.classList.add("mui-hidden");ui.myAddr.classList.add("mui-hidden");ui.sliderbox.classList.remove("mui-hidden");ui.pcdr.classList.remove("mui-hidden");ui.closePicker.classList.add("mui-hidden");ui.returnAddr.classList.remove("mui-hidden");ui.itemprovice.scrollTop=0;ui.itemcity.scrollTop=0;ui.itemdistrict.scrollTop=0;ui.itemroad.scrollTop=0});ui.returnAddr.addEventListener("tap",function(){this.classList.add("mui-hidden");ui.closePicker.classList.remove("mui-hidden");ui.pcdr.classList.add("mui-hidden");ui.sliderbox.classList.add("mui-hidden");ui.myAddr.classList.remove("mui-hidden");ui.otherAddr.classList.remove("mui-hidden")});mui(ui.myAddr).on("tap","li[data=addr]",function(){var c=this;var d=ui.myAddr.querySelectorAll("li");var a=d.length;for(var b=0;b<a;b++){d[b].classList[c==d[b]?"add":"remove"]("sui-active")}ui.txtArea.innerText=c.innerText;ui.areaCode=c.getAttribute("data-c");ui.AreaPicker.classList.remove("mui-active");pickerData(ui.cityData4,"",false)});ui.styleHidden.addEventListener("tap",function(){ui.container.classList.add("sui-hidden");ui.myAddr.scrollTop=0});ui.closePicker.addEventListener("tap",function(){ui.container.classList.remove("sui-hidden")});