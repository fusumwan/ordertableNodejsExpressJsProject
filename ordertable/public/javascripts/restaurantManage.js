/**************************************************
 // Author: Sum Wan,FU
 // Date: 7-6-2019
 // Description: Restarurant Manage javascript
 **************************************************/
var UserSession=App.BusinessIntelligence.UserSession();
if(UserSession==undefined || UserSession.account_id==""){
    alert("Please kindly login our OrderTable account system!");
    window.location="login.html";
}
else if(UserSession.user_type!="restaurant manager"){
	alert("Only allow restaurant manager to login restarurant management system!");
	window.location="login.html";
}

window.addEventListener("load", function(){
    document.getElementById("banner").className="banner banner_small"
    document.getElementById("search-container").style.display="none";
    document.getElementById("manage_booking_li").className="active";
});

