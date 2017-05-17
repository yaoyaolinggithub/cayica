var localdb={},db=null;(function(a){a.openDataBase=function(){try{db=openDatabase("CAYICADB","1.0","CAYICADB",12*1024*1024,function(){});if(db){createTable(db)}}catch(b){}};a.createTable=function(){if(!db){return}db.transaction(function(b){b.executeSql("CREATE TABLE IF NOT EXISTS  ShoppingCart (Id TEXT UNIQUE,TradeName TEXT,ImgUrl TEXT,TradePrice FLOAT,Quantity INT8, UserId TEXT,ProductId INT8,CreateTime DATETIME)",[],function(d,c){},function(c,d){mui.toast("create table error:"+d.message)})})};a.insertData=function(d,i,c,h,b,g,e,f,j){if(!db){return}db.transaction(function(k){k.executeSql("INSERT INTO ShoppingCart (Id ,TradeName,ImgUrl ,TradePrice ,Quantity, UserId,ProductId,CreateTime) values(?, ? , ? , ?, ?, ?,?,?)",[d,i,c,h,b,g,e,f],function(m,l){j(true)},function(l,m){j(false)})})};a.updateData=function(b,e,c,f){if(!db){return}var d="UPDATE ShoppingCart SET Quantity = ? WHERE Id= ?";if(c){d="UPDATE ShoppingCart SET Quantity =Quantity + ? WHERE Id= ?"}db.transaction(function(g){g.executeSql(d,[e,b],function(i,h){f(true)},function(h,i){f(false)})})};a.deleteData=function(c,g){if(!db){return}var e=c.length;var b="?";for(var d=1;d<e;d++){b+=",?"}var f="DELETE FROM ShoppingCart WHERE Id IN("+b+")";db.transaction(function(h){h.executeSql(f,c,function(j,i){g(true)},function(i,j){g(false)})})};a.queryData=function(b,c){if(!db){return}db.transaction(function(d){d.executeSql("SELECT * FROM ShoppingCart WHERE UserId=?  ORDER BY CreateTime DESC",[b],function(e,f){if(f.rows&&f.rows.length){c(f)}else{c(false)}},function(e,f){c(false)})})};a.isExist=function(b,c,d){if(!db){return}db.transaction(function(e){e.executeSql("SELECT Id FROM ShoppingCart WHERE ProductId =? AND UserId=?",[b,c],function(f,g){if(g.rows&&g.rows.length){d(g)}else{d(false)}},function(f,g){d(false)})})}}(localdb));