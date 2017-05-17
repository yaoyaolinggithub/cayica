var ui = {
	search: document.getElementById("search"),
	editCarts: document.getElementById("editCarts"),
	toggle: false,
	backdrops: document.getElementById("backdrops"),
	first: null,
	goodsNum: document.getElementById("goodsNum")
};
mui.init();
mui.back = function() {
	if(!ui.first) {
		ui.first = new Date().getTime();
		mui.toast("再按一次退出程序");
		setTimeout(function() {
			ui.first = null
		}, 1500)
	} else {
		if(new Date().getTime() - ui.first < 1500) {
			plus.runtime.quit()
		}
	}
};
var subpages = ["default.html", "category.html", "cart.html", "my.html"];
var subpage_style = {
	top: (immersed + 44) + "px",
	bottom: "51px",
	scrollIndicator: "none"
};
var subpage_style2 = {
	top: "0",
	bottom: "51px",
	scrollIndicator: "none",
	decelerationRate: 1,
	bounce: "vertical",
	bounceBackground: "url(/images/bgbg.png)"
};
var aniShow = {};
mui.plusReady(function() {
	var b = plus.webview.currentWebview();
	for(var c = 0; c < 4; c++) {
		var a = {};
		var d = plus.webview.create(subpages[c], subpages[c], (c == 0 || c == 3) ? subpage_style2 : subpage_style);
		if(c > 0) {
			d.hide()
		} else {
			a[subpages[c]] = "true";
			mui.extend(aniShow, a)
		}
		b.append(d)
	}
});
var activeTab = subpages[0];
var title = document.getElementById("title");
mui(".mui-bar-tab").on("tap", "a", function(g) {
	var a = this.getAttribute("href");
	if(a == activeTab) {
		return
	}
	if(a == "default.html") {
		ui.search.classList.add("mui-hidden");
		ui.editCarts.classList.add("mui-hidden");
		var d = plus.webview.getWebviewById("default.html");
		mui.fire(d, "index")
	}
	if(a == "category.html") {
		ui.editCarts.classList.add("mui-hidden");
		ui.search.classList.remove("mui-hidden");
		var f = plus.webview.getWebviewById("category.html");
		mui.fire(f, "category")
	}
	if(a == "cart.html") {
		ui.search.classList.add("mui-hidden");
		ui.editCarts.classList.remove("mui-hidden");
		var h = plus.webview.getWebviewById("cart.html");
		mui.fire(h, "shoppingcart")
	}
	if(a == "my.html") {
		ui.search.classList.add("mui-hidden");
		ui.editCarts.classList.add("mui-hidden");
		var c = plus.webview.getWebviewById("my.html");
		mui.fire(c, "mycenter")
	}
	title.innerHTML = this.querySelector(".mui-tab-label").getAttribute("data-title");
	if(mui.os.ios || aniShow[a]) {
		plus.webview.show(a)
	} else {
		var b = {};
		b[a] = "true";
		mui.extend(aniShow, b);
		plus.webview.show(a, "fade-in", 300)
	}
	plus.webview.hide(activeTab);
	activeTab = a
});
document.addEventListener("gohome", function() {
	var b = document.getElementById("GoIndex");
	mui.trigger(b, "tap");
	var c = document.querySelector(".mui-small-line>.mui-tab-item.mui-active");
	if(b !== c) {
		c.classList.remove("mui-active");
		b.classList.add("mui-active")
	} else {
		ui.search.classList.add("mui-hidden");
		ui.editCarts.classList.add("mui-hidden");
		var a = plus.webview.getWebviewById("default.html");
		mui.fire(a, "index")
	}
});
document.addEventListener("GoCart", function() {
	var a = document.getElementById("GoMyCart");
	mui.trigger(a, "tap");
	var b = document.querySelector(".mui-small-line>.mui-tab-item.mui-active");
	if(a !== b) {
		b.classList.remove("mui-active");
		a.classList.add("mui-active")
	} else {
		ui.search.classList.add("mui-hidden");
		ui.editCarts.classList.remove("mui-hidden");
		var c = plus.webview.getWebviewById("cart.html");
		mui.fire(c, "shoppingcart")
	}
});
document.addEventListener("GoCategory", function() {
	var b = document.getElementById("GoCategory");
	mui.trigger(b, "tap");
	var c = document.querySelector(".mui-small-line>.mui-tab-item.mui-active");
	if(b !== c) {
		c.classList.remove("mui-active");
		b.classList.add("mui-active")
	} else {
		ui.editCarts.classList.add("mui-hidden");
		ui.search.classList.remove("mui-hidden");
		var a = plus.webview.getWebviewById("category.html");
		mui.fire(a, "category")
	}
});
ui.search.addEventListener("tap", function() {
	mui.openWindow({
		url: "goods/goodSearch.html",
		id: "goodSearch.html",
		show: {
			duration: 250,
			aniShow: "pop-in"
		},
		waiting: {
			autoShow: false
		},
		styles: {
			scrollIndicator: "none"
		}
	})
});
ui.editCarts.addEventListener("tap", function() {
	var a = localStorage.getItem("CAYICA_TOKEN");
	if(a) {
		var b = plus.webview.getWebviewById("cart.html");
		if(!ui.toggle) {
			ui.toggle = true;
			ui.editCarts.innerText = "完成";
			b.evalJS("editCarts();")
		} else {
			ui.toggle = false;
			ui.editCarts.innerText = "编辑";
			b.evalJS("toggle();")
		}
	} else {
		mui.openWindow({
			url: "login.html",
			id: "login.html",
			show: {
				duration: 250,
				aniShow: "pop-in"
			},
			waiting: {
				autoShow: false
			}
		})
	}
});

function openbackdrop() {
	ui.backdrops.classList.remove("mui-hidden")
}

function closebackdrop() {
	ui.backdrops.classList.add("mui-hidden")
}

function goodsNum(a) {
	var b = localStorage.getItem("CAYICA_TOKEN");
	if(a > 0 && b) {
		ui.goodsNum.innerText = a > 99 ? "99+" : a;
		ui.goodsNum.classList.remove("mui-hidden")
	} else {
		ui.goodsNum.classList.add("mui-hidden")
	}
};