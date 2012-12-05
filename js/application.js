//转到订餐页面
function goHelp(){
	window.location.href='help.html';
}
//转到订单显示
function goCheck(){
	window.location.href='check.html';
}
//显示人名页面
function choseUser(){
	window.location.href='choseUser.html';
}
//显示人名
function loadUser(){

	document.write("<div data-role='header' data-position='fixed' id='content'>");
	document.write("<a data-role='button' data-theme='a'  data-rel='back'>back</a>");
	document.write("<h1>选人</h1>")
	document.write("</div>");
	document.write("<ul data-role='listview' id='content'>");
	for(i=0;i<users.length;i++)
	{		
		var x="<li><a href='#' onclick='getUser(";
		var y=users[i].name;
		var z=")'>";
		var m="</a></li>"
		var n='"';
		document.write(x+n+y+n+z+y+m);
	}
	document.write("</ul>");
}
//得到人名
function  getUser(user){
	window.localStorage.user = user;
	window.history.back();
}
//在订餐页面显示人名
function readUser(){
		var user = (window.localStorage.user == null)?null:window.localStorage.user;
		var userEle = document.getElementById('user');
		userEle.value = user;
}	
//显示餐厅页面
function choseRes(){
	window.location.href='choseRes.html';
}
//显示餐厅名
function loadRes(){
	document.write("<div data-role='header' id='content'>");
	document.write("<a data-role='button' data-theme='a'  data-rel='back'>back</a>");
	document.write("<h1>选餐厅</h1>")
	document.write("</div>");
	document.write("<ul data-role='listview' id='content'>");
	for(i=0;i<restaurants.length;i++)
	{		
		var x="<li><a href='#' onclick='getRes(";
		var y=restaurants[i].name;
		var z=")'>";
		var m="</a></li>"
		var n='"';
		document.write(x+n+y+n+z+y+m);
	}
	document.write("</ul>");
}
//得到餐厅名
function getRes(res){
	
	window.localStorage.res = res;
	window.history.go(-1);
}
//在订餐页面显示餐名
function readRes(){
	var res = (window.localStorage.res == null)? null:window.localStorage.res;
	var resEle = document.getElementById('res');
	resEle.value = res;	
}

//显示套餐页面
function choseFood(){
	window.location.href='choseFood.html';
}
//显示套餐
function loadFood(){
	document.write("<div data-role='header' data-position='fixed' id='content'>");
	document.write("<a data-role='button' data-theme='a'  data-rel='back'>back</a>");
	document.write("<h1>选套餐</h1>")
	document.write("</div>");
	document.write("<ul data-role='listview' id='content'>");
	var res = window.localStorage.res;
	if(res == null)
	{
		alert("请选餐厅");
		window.history.go(-1);
	}
	for(a in foods)
	{
		if(a == res)
		{
			for(b in foods[a])
			{
				var x="<li><a href='#' onclick='getFood(";
				var y=foods[a][b].name;
				var z=")'>";
				var m="</a></li>"
				var n='"';
				var p=foods[a][b].price;
				var q=','
				document.write(x+n+y+n+q+n+p+n+z+y+p+m);
			}
		}
	}
	document.write("</ul>");
}
//传递套餐和价格
function getFood(food,price)
{
	window.localStorage.food = food;
	window.localStorage.price = price;
	window.history.go(-1);	
}
//在订餐页面显示已定套餐
function readFood()
{
	var food = (window.localStorage.food == null)? null:window.localStorage.food;
	var foodEle = document.getElementById('food');
	foodEle.value = food;
}

//提交订单
function submit(){
	
	if(document.getElementById('user').value == "")
	{
		alert("请选择订餐者");
		return;
	}
	if(document.getElementById('food').value == "")
	{
		alert("请选择套餐");
		return;
	}
	
	window.localStorage.customer += window.localStorage.user + "*";
	window.localStorage.noshery += window.localStorage.res + "*";
	window.localStorage.snack += window.localStorage.food + "*";
	window.localStorage.money += window.localStorage.price + "*";
	window.localStorage.removeItem('user');
	window.localStorage.removeItem('food');
	window.location.href="help.html";
}


//显示订单
function getOrder(){
	//将传递的值变为数组
	var user = new Array();
	var res = new Array();
	var food = new Array();
	var price = new Array();
	
	user = window.localStorage.customer.split("*");
	res = window.localStorage.noshery.split("*");
	food = window.localStorage.snack.split("*");
	price = window.localStorage.money.split("*");
	
	//输出未定的人名单，得到以定人数
	var count=0;
	var str="";
	for(i=0;i<users.length;i++)
	{
		var same=0;
		for(m=0;m<user.length-1;m++)
		{
			if(user[m] == users[i].name)
			{count++;same=1;break;}
		}
		if(same == 0)
		{str+="<li>" + users[i].name + "</li>";}
		//alert(str);
	}

	var str1="";
	str1 += "<li data-theme='b'>" + (users.length-count) + "人未定</li>" + str;
	$("#unorder").html(str1);
	
	//输出一定的人名单
	var str2 = "<li data-theme='b'>" + count + "人已定</li>";
	for(i=0;i<user.length-1;i++)
	{	
		str2 += "<li><h4 class='ui-li-heading'>" + user[i] + "</h4><p class='ui-li-aside'>";
		if(price[i]>12)
		{
			str2+="<p class='ui-li-aside ui-li-desc' style='color:red'>￥" + price[i] + "(超出" + (price[i]-12) + "元)</p>" ;
		}else{
			str2+= "<p class='ui-li-aside ui-li-desc'>￥" + price[i] + "</p>";
		}
		str2+="<p class='ui-li-desc'>" + res[i] + " " + food[i] + "</p></li>";
	}
	$("#order").html(str2);
	//显示总计
	var sum = 0;
	for(i=0;i<price.length-1;i++)
	{
		sum+=parseFloat(price[i]);
	}
	var footer="<font>" + count + "人已定" + (users.length) + "人未定 " + "总计:" + sum + "元</font>";
	$("#footer").html(footer);
}


$(function(){
		if(!window.localStorage.customer)
		{
			window.localStorage.customer="";	
		}
		if(!window.localStorage.noshery)
		{
			window.localStorage.noshery="";	
		}
		if(!window.localStorage.snack)
		{
			window.localStorage.snack="";	
		}
		if(!window.localStorage.money)
		{
			window.localStorage.money="";	
		}
	})

