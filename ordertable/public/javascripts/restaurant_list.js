/**************************************************
 // Author: Sum Wan,FU
 // Date: 7-6-2019
 // Description:  Restaurant List javascript
 **************************************************/


var list_results="";
function LoadList(){
    var records=[];
    var table_count=0;
    var PageSession=App.BusinessIntelligence.PageSession();
    var person_sel=document.getElementById("person_sel");
    if(PageSession.restaurant_manage!=""){
        if(PageSession.restaurant_manage.person!=undefined){
            person_sel.value=PageSession.restaurant_manage.person;
        }
    }
    var UserSession=App.BusinessIntelligence.UserSession();
    if(UserSession!=undefined && UserSession.account_id!=""){
        var timeperiods=db.repository.timeperiod.filter("timeperiod_id!='' AND account_id='"+UserSession.account_id+"'");
        for(var t=0;t<timeperiods.length;t++){
            //alert(timeperiods[t].restaurant_id);
            var restaurants=db.entity.restaurant.retrieve(timeperiods[t].restaurant_id);
            var restaurant=restaurants[0];
            restaurant.image="images/restaurants/"+restaurant.image;
            var times=[];
            var tabless=db.repository.tables.filter("restaurant_id='"+restaurant.restaurant_id+"' AND number_of_sits=2");
            restaurant.tabless=tabless;
            table_count+=restaurant.tabless.length;
            for(var j=0;j<restaurant.tabless.length;j++){
                restaurant.tabless[j].available_time=restaurant.tabless[j].available_time+":00";
            }
            records.push(restaurant);
        }
    }
    if(list_results==""){
        list_results=new Vue({
          el: '#list_res',
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
    }
}

function EditClick(thisObj){
    error.protection.preventDefault(event);
    //alert(thisObj.attributes.alt.value);
    var restaurant=db.entity.restaurant.retrieve(thisObj.attributes.alt.value)[0];
    document.getElementById("resturant_id_txt").value=restaurant.restaurant_id;
    document.getElementById("name_txt").value=restaurant.name;
    document.getElementById("location_txt").value=restaurant.location;
    document.getElementById("longitude_txt").value=restaurant.longitude;
    document.getElementById("latitude_txt").value=restaurant.latitude;
    document.getElementById("contact_number_txt").value=restaurant.contact_number;
    document.getElementById("description_txt").value=restaurant.description;
    var timeperiods=db.repository.timeperiod.filter("restaurant_id='"+restaurant.restaurant_id+"'");
    if(timeperiods.length>0){

        document.getElementById("start_period_txt").value=App.BusinessIntelligence.DBDateFormatToCalendar(timeperiods[0].start_period);
        document.getElementById("end_period_txt").value=App.BusinessIntelligence.DBDateFormatToCalendar(timeperiods[0].end_period);
    }
    document.getElementById("add_update_resturant").style.display="block";
    document.getElementById("list_res").style.display="none";

    
}
function DeleteClick(thisObj){
    error.protection.preventDefault(event);
    //alert(thisObj.attributes.alt.value);
    var records=[];
    var table_count=0;
    var UserSession=App.BusinessIntelligence.UserSession();
    if(UserSession!=undefined && UserSession.account_id!=""){
        var restaurant=db.entity.restaurant.retrieve(thisObj.attributes.alt.value)[0];
        var timeperiods=db.repository.timeperiod.filter("restaurant_id='"+restaurant.restaurant_id+"' AND account_id='"+UserSession.account_id+"'");
        var tabless=db.repository.tables.filter("restaurant_id='"+restaurant.restaurant_id+"'");
        for(var j=0;j<tabless.length;j++){
            db.entity.tables.delete(tabless[j].tables_id);
        }
        for(var i=0;i<timeperiods.length;i++){
            db.entity.timeperiod.delete(timeperiods[i].timeperiod_id);
        }
        db.entity.restaurant.delete(restaurant.restaurant_id);
    }
    window.location="restaurantManage.html";
}

function PersonOnChange(e){
    var PageSession=App.BusinessIntelligence.PageSession();
    PageSession.restaurant_manage.person=e.value;
    App.BusinessIntelligence.SetPageSession(PageSession);
    //window.location="restaurantManage.html";
}

window.addEventListener("load", function(){

    document.getElementById("show_all_res_btn").addEventListener("click", function(){
        document.getElementById("add_update_resturant").style.display="none";
        document.getElementById("list_res").style.display="block";

        
    });
    var PageSession=App.BusinessIntelligence.PageSession();
    var person_sel=document.getElementById("person_sel");
    person_sel.value=PageSession.restaurant_manage.person;

    LoadList();
});

