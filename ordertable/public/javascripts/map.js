/**************************************************
 // Author: Sum Wan,FU
 // Date: 7-5-2019
 // Description: Map javascript
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

var map_canvas=null;
var head_nav_opened=false;
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
    if(w>=1024){
        if(document.getElementById("map-canvas-container1").style.display=="block"){
            deleteChild("map-canvas-container1");
            moveMap(map_canvas);
        }
    }else{
        if(document.getElementById("map-canvas-container2").style.display=="block"){
            deleteChild("map-canvas-container2");
            moveMap(map_canvas);
        }
    }



});


function moveMap(map_canvas){
    var w = window.innerWidth;
    var h = window.innerHeight;
    if(w>=1024){
        document.getElementById("map-canvas-container2").appendChild(map_canvas);
        document.getElementById("map-canvas-container1").style.display="none";
        document.getElementById("map-canvas-container2").style.display="block";
    }else{
        document.getElementById("map-canvas-container1").appendChild(map_canvas);
        document.getElementById("map-canvas-container1").style.display="block";
        document.getElementById("map-canvas-container2").style.display="none";
    }
}

function deleteChild(id) { 
    var e = document.getElementById(id); 
    //e.firstElementChild can be used. 
    var child = e.lastElementChild;  
    while (child) { 
        e.removeChild(child); 
        child = e.lastElementChild; 
    } 
} 

window.addEventListener("load", function(){

    

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
                    window.location="map.html";
                }
            }
        }
    });

    var PageSession=App.BusinessIntelligence.PageSession();
    var reserve_date_txt=document.getElementById("reserve_date_txt");
    var person_sel=document.getElementById("person_sel");
    reserve_date_txt.value=PageSession.index.reserve_date;
    person_sel.value=PageSession.index.person;
    
    var restaurants=db.repository.restaurant.filter("restaurant_id!=''");
    var records=restaurants;
    for(var i=0;i<records.length;i++){
        records[i].image="images/restaurants/"+restaurants[i].image;
        //MapObj.CreateInfoWindow(parseFloat(records[i].longitude,10), parseFloat(records[i].latitude,10), records[i].name);
        var times=[];
        var tabless=db.repository.tables.filter("restaurant_id='"+records[i].restaurant_id+"' AND number_of_sits="+person_sel.value+"");
        records[i].tabless=tabless;
        for(var j=0;j<records[i].tabless.length;j++){
            records[i].tabless[j].available_time=records[i].tabless[j].available_time+":00";
        }
    }

    

    var list_results=new Vue({
      el: '#app',
      data: {
        tables: records.length,
        lists: records
      },
      methods: {
        clickCallback: function(page) {
          console.log(page)
        }
      }
    });


    map_canvas = document.createElement("div");   // Create a <button> element
    map_canvas.id="map-canvas";
    map_canvas.className="mapcav";
    moveMap(map_canvas);

    var MapObj=new MapControl("map-canvas", 16);
    MapObj.initialize();
    for(var i=0;i<records.length;i++){
        //if(i<=3)
        {
        MapObj.CreateInfoWindow(parseFloat(records[i].longitude), parseFloat(records[i].latitude), records[i].name);
        }
    }



    document.getElementById("banner").className="banner banner_small";
    document.getElementById("search-title").style.display="none";
    document.getElementById("home_li").className="active";

});
