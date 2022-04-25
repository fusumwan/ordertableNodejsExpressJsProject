/**************************************************
 // Author: Sum Wan,FU
 // Date: 7-6-2019
 // Description:  Restaurant Modify javascript
 **************************************************/



window.addEventListener("load", function(){
    document.getElementById("banner").className="banner banner_small"
    document.getElementById("search-container").style.display="none";
    document.getElementById("manage_booking_li").className="active";

    document.getElementById("show_add_update_res_btn").addEventListener("click", function(){
        document.getElementById("add_update_resturant").style.display="block";
        document.getElementById("list_res").style.display="none";


        document.getElementById("resturant_id_txt").value="";
        document.getElementById("name_txt").value="";
        document.getElementById("location_txt").value="";
        document.getElementById("longitude_txt").value="";
        document.getElementById("latitude_txt").value="";
        document.getElementById("contact_number_txt").value="";
        document.getElementById("start_period_txt").value="";
        document.getElementById("end_period_txt").value="";
        document.getElementById("description_txt").value="";

    });
    var filename="";
    document.getElementById("file").addEventListener("change", function(e){
        filename = e. target. files[0]. name;
        //alert('The file "' + filename + '" has been selected.' );
    });



    document.getElementById("update_restaurant_btn").addEventListener("click", function(){
        var _valid=true;
        var file=document.getElementById("file");
        var _restaurant_id=document.getElementById("resturant_id_txt").value;
        var restaurant="";
        var timeperiod="";
        if(_restaurant_id==""){
            restaurant=db.entity.restaurant.new();
            timeperiod=db.entity.timeperiod.new();
        }
        else{
            restaurant=db.entity.restaurant.retrieve(_restaurant_id)[0];
            timeperiod=db.repository.timeperiod.filter("restaurant_id='"+restaurant.restaurant_id+"'")[0];

        }

        var _image=filename;
        var _name=document.getElementById("name_txt").value.trim();
        var _location=document.getElementById("location_txt").value.trim();
        var _longitude=document.getElementById("longitude_txt").value.trim();
        var _latitude=document.getElementById("latitude_txt").value.trim();
        var _contact_number=document.getElementById("contact_number_txt").value.trim();
        var _start_period=document.getElementById("start_period_txt").value.trim();
        var _end_period=document.getElementById("end_period_txt").value.trim();
        var _description=document.getElementById("description_txt").value.trim();

        if(_restaurant_id==""){
            if(_image=="" ||_image==null){
                alert("Invalid image!");
                _valid=false;
            }
        }
        else if(_name=="" || _name==null){
            alert("Invalid resturant name!");
            _valid=false;
        }
        else if(_location=="" || _location==null){
            alert("Invalid location!");
            _valid=false;
        }
        else if(_longitude=="" || _longitude==null){
            alert("Invalid longitude!");
            _valid=false;
        }
        else if(_latitude=="" || _latitude==null){
            alert("Invalid latitude");
            _valid=false;
        }
        else if(_contact_number=="" || _contact_number==null){
            alert("Invalid phone number");
            _valid=false;
        }
        else if(_description=="" || _description==null){
            alert("Invalid Description");
            _valid=false;
        }
        else if(_start_period=="" || _start_period==null){
            alert("Invalid Start Date");
            _valid=false;
        }
        else if(_end_period=="" || _end_period==null){
            alert("Invalid End Date");
            _valid=false;
        }
        
        error.protection.preventDefault(event);
        if(_valid){
            var UserSession=App.BusinessIntelligence.UserSession();
            if(UserSession!=undefined && UserSession.account_id!=""){
                if(_restaurant_id!="" && _image==""){

                }else{
                    restaurant.image=_image;
                }
                restaurant.name=_name;
                restaurant.location=_location;
                restaurant.longitude=_longitude;
                restaurant.latitude=_latitude;
                restaurant.contact_number=_contact_number;
                restaurant.description=_description;
                timeperiod.start_period=App.BusinessIntelligence.CalendarToDBDateFormat(_start_period);;
                timeperiod.end_period=App.BusinessIntelligence.CalendarToDBDateFormat(_end_period);
                timeperiod.restaurant_id=restaurant.restaurant_id;
                timeperiod.account_id=UserSession.account_id;
                if(_restaurant_id==""){
                    db.entity.restaurant.create(restaurant);
                    db.entity.timeperiod.create(timeperiod);
                    var times=[2,4,6,8,10,12,14,16,18];
                    var sits=[1,2,3,4,5,6,7,8,9,10,11,12];
                    for(var i=0;i<times.length;i++){
                        for(var j=0;j<sits.length;j++){
                            tables=db.entity.tables.new();
                            tables.timeperiod_id=timeperiod.timeperiod_id;
                            tables.number_of_sits=sits[j];
                            tables.restaurant_id=restaurant.restaurant_id;
                            tables.available_time=times[i];
                            db.entity.tables.create(tables);
                        }
                    }
                }
                else{
                    db.entity.restaurant.update(restaurant);
                    db.entity.timeperiod.update(timeperiod);
                }
                document.getElementById("ResForm").submit();
            }
        }
    });
    
});

