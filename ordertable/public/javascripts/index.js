/**************************************************
 // Author: Sum Wan,FU
 // Date: 27-5-2019
 // Description: Index javascript
 **************************************************/


window.addEventListener("load", function(){
    document.getElementById("home_li").className="active";
    //-- script-for-search --
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
		//-- script-for-search --
});


