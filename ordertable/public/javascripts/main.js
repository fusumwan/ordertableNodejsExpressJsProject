/**************************************************
 // Course: Web and Database Computing (2207)
 // 2019 Group Project
 // Author: Sum Wan,FU
 // Date: 7-5-2019
 // Student ID: 1714470
 // Description: Main javascript
 **************************************************/

var head_nav_opened=false;
App.OnLoad=function(){
	infras.module("docsTemplateUrlDirective").directive("header_div","header.html",function(){
		//-- script-for-resize --
		window.addEventListener("resize", function(){
			var w = window.innerWidth;
			var h = window.innerHeight;
			if(w>768){
				if(document.querySelector(".head-nav ul").style.display=="none"){
					document.querySelector(".head-nav ul").style.display="block"
				}
			}
			else{
				if(head_nav_opened){
					document.querySelector(".head-nav ul").style.display="block";
				}else{
					document.querySelector(".head-nav ul").style.display="none";
				}
			}
		});
		//-- script-for-resize --
		//-- script-for-nav --
		document.querySelector("span.menu").addEventListener("click", function(){
			if(
				document.querySelector(".head-nav ul").style.display=="none" || 
				document.querySelector(".head-nav ul").style.display=="" 
				 ){
				document.querySelector(".head-nav ul").style.display="block"
			}else{
				document.querySelector(".head-nav ul").style.display="none";
			}
			head_nav_opened=!head_nav_opened;
		});
		
		var UserSession=App.BusinessIntelligence.UserSession();
		if(UserSession.account_id=="" || UserSession.account_id==undefined){
			document.getElementById("login_li").style.display="";
			document.getElementById("logout_li").style.display="none";
		}
		else{
			document.getElementById("login_li").style.display="none";
			document.getElementById("logout_li").style.display="";
		}
		
		//-- script-for-nav --

		//-- script-for-logout--
		var login_li_bin=document.getElementById("login_li");
		var logout_li_btn=document.getElementById("logout_li");
		logout_li_btn.addEventListener("click", function(){
			error.protection.preventDefault(event);
			if(App.BusinessIntelligence.Logout()){
				logout_li_btn.style.display="none";
				login_li_bin.style.display="";
				window.location="index.html"
			}
		});
		//-- script-for-logout--
	},false);
	infras.module("docsTemplateUrlDirective").directive("footer_div","footer.html",function(){},false);
};

App.Initialize();


