/**************************************************
 // Author: Sum Wan,FU
 // Date: 7-5-2019
 // Description: Result javascript
 **************************************************/


function ChooseTimeSession(thisObj) {
	var tabless=db.entity.tables.retrieve(thisObj.attributes.alt.value);
	var tables=tabless[0];
	var PageSession=App.BusinessIntelligence.PageSession();
	PageSession.result.tables=tables;
	PageSession.result.reserve_date=PageSession.index.reserve_date;
	var valid=App.BusinessIntelligence.SetPageSession(PageSession);
	if(valid){
		window.location="confirm_booking.html";
	}
	return false;   // The function returns the product of p1 and p2
}

window.addEventListener("load", function(){
    document.getElementById("banner").className="banner banner_small";
    document.getElementById("search-title").style.display="none";
    document.getElementById("home_li").className="active";

    document.getElementById("search_btn").addEventListener("click", function(){
		error.protection.preventDefault(event);
		var reserve_date_txt=document.getElementById("reserve_date_txt");
		var person_sel=document.getElementById("person_sel");
		if(reserve_date_txt!=undefined){
			if(reserve_date_txt.value!=""){
				var PageSession=App.BusinessIntelligence.PageSession();
				PageSession.index.reserve_date=reserve_date_txt.value;
				PageSession.index.person= person_sel.value;
				var valid=App.BusinessIntelligence.SetPageSession(PageSession);
				if(valid){
					window.location="result.html";
				}
			}
		}
	});

	var PageSession=App.BusinessIntelligence.PageSession();
	var reserve_date_txt=document.getElementById("reserve_date_txt");
	var person_sel=document.getElementById("person_sel");
	reserve_date_txt.value=PageSession.index.reserve_date;
	person_sel.value=PageSession.index.person;

	var records=[];
	var table_count=0;
	
	var timeperiods=db.repository.timeperiod.filter("timeperiod_id!='' AND start_period>='"+reserve_date_txt.value+"' AND end_period>='"+reserve_date_txt.value+"'");
	for(var t=0;t<timeperiods.length;t++){
		//alert(timeperiods[t].restaurant_id);
		var restaurants=db.entity.restaurant.retrieve(timeperiods[t].restaurant_id);
		var restaurant=restaurants[0];
		restaurant.image="images/restaurants/"+restaurant.image;
		var times=[];
		var tabless=db.repository.tables.filter("restaurant_id='"+restaurant.restaurant_id+"' AND number_of_sits="+person_sel.value+"");
		restaurant.tabless=tabless;
		table_count+=restaurant.tabless.length;
		for(var j=0;j<restaurant.tabless.length;j++){
			restaurant.tabless[j].available_time=restaurant.tabless[j].available_time+":00";
		}
		records.push(restaurant);
	}
	



	document.getElementById("tables_avail").innerHTML=table_count+" TABLES AVAILABLE";
		var list_results=new Vue({
			el: '#app',
			data: {
				tables: records.length,
				lists: records
			},
			methods: {
				clickCallback: function(page) {
				console.log(page);
			}
		}
	});
});









