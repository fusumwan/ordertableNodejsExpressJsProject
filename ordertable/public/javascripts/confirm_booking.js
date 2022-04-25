




window.addEventListener("load", function(){
    document.getElementById("banner").className="banner banner_small"
    document.getElementById("search-container").style.display="none";
    document.getElementById("login_li").className="active";



    
    var redirect=false;
    var user=App.BusinessIntelligence.UserSession();
    var PageSession=App.BusinessIntelligence.PageSession();
    var table_id=PageSession.result.tables.tables_id;
    var restaurant_id=PageSession.result.tables.restaurant_id;
    var number_guest=PageSession.result.tables.number_of_sits;
    var time=PageSession.result.tables.available_time;
    var date=PageSession.result.reserve_date;
    var reserved_date=date.substr(6,4)+"-"+date.substr(3,2)+"-"+date.substr(0,2);
    var reserved_time=time+":00:00";

    if (PageSession.result.tables.tables_id == undefined || PageSession.result.tables.tables_id == "")
    {
        redirect=true;

    }
    if((PageSession.confirm_booking=="" || PageSession.confirm_booking==undefined) && !redirect){
        var booking=db.entity.booking.new();
        PageSession.confirm_booking={"booking":""};
        PageSession.confirm_booking.booking=booking;
        var valid=App.BusinessIntelligence.SetPageSession(PageSession);
        
        reserveTable();
    }else{
        location.replace("index.html");
    } 
    
    


    var booking_id=PageSession.confirm_booking.booking.booking_id;
    if (user.account_id != "")
    {
    	document.getElementById("Name").value=user.first_name;
    //	alert(user.first_name);
    	document.getElementById("Email").value=user.email;
    	document.getElementById("Phone").value=user.contact_number;
        document.getElementById("Password").value=user.password;
    }else 
    {
    	document.getElementById("Name").value="";
    //	alert("NO log in");
    	document.getElementById("Email").value="";
    	document.getElementById("Phone").value="";
        document.getElementById("Password").value="";
    }
    
    
    
    var reserved=db.entity.booking.retrieve(booking_id);
    
 

    var restaurant=db.entity.restaurant.retrieve(restaurant_id);
//    alert(restaurant[0].restaurant_id);
    var choice={
        "restaurant":restaurant[0].name,
        "guest":number_guest,
        "date":reserved_date,
        "time":reserved_time
    };
    showChoice(choice);


    document.getElementById("BookButton").addEventListener("click", function(){
        var _valid=true;

        var _email=document.getElementById("Email").value;
        var _password=document.getElementById("Password").value;
        var _name=document.getElementById("Name").value;
        var _phone=document.getElementById("Phone").value;
        if (_email == "" || _phone == "" || _name == "" || _password == "")
        {
            alert("Empty Information");
            _valid=false;
        }
        
        if(!error.protection.ValidEmail(_email)){
            alert("Invalid email address!");
            _valid=false;
        }
        
        else if(_password=="" || _password==null){
            alert("Invalid password!");
            _valid=false;
        }
       
        if (_valid)
        {
            App.BusinessIntelligence.Login(_email,_password);
            if (App.BusinessIntelligence.UserSession().account_id)
            {
             //   alert("already log in");
                reserved[0].account_id=App.BusinessIntelligence.UserSession().account_id;
                if (checkAvailable(reserved))
                {
                    db.entity.booking.update(reserved[0]);
                //    alert("SUccess");
                    App.BusinessIntelligence.DelPageSession().confirm_booking();
                    App.BusinessIntelligence.DelPageSession().result(); 
                }else
                {
                    alert("Your booking has been booked by another person");
                } 
                location.replace("manageBooking.html");
            }
            
            
        }
                
    });
 //   var bookInfo={"restaurant":"King","guest":12,"date":"12-12-1998","time":16};
 //   showChoice(bookInfo);
 //   document.getElementById("submit Date").addEventListener("click", function(){
    
});
function removeSession()
{
     App.BusinessIntelligence.DelPageSession().confirm_booking();
    App.BusinessIntelligence.DelPageSession().result(); 
}


function checkAvailable(bookInfor)
{
    var available=true;
    var tables_id=bookInfor.tables_id;
    var books=db.repository.booking.filter("tables_id='"+tables_id+"' and enable=1");
    var countdown=document.getElementById('countdown');
    if (countdown.innerHTML != "You can still try to complete your reservation, but this table may no longer be available.")
    {
        return true;
    }
    if (books.length > 0)
    {
       
        for (var i=0;i<books.length;++i)
        {
            
            var time=new Date(books[i].reserved_time);
            var date=time.getDate();
            var month=time.getMonth();
            var year=time.getFullYear();
            var info=new Date(bookInfor.reserved_time);
            if (info.getDate() == date && info.getMonth() == month && info.getFullYear() == year)
            {
                available=false;
            }

        }
        
    }
    
    return available;
}

function reserveTable()
{
    
    var curr=new Date();
    var PageSession=App.BusinessIntelligence.PageSession();
    var table_id=PageSession.result.tables.tables_id;
    var time=PageSession.result.tables.available_time;
    var date=PageSession.result.reserve_date;

    var reserved_date=date.substr(6,4)+"-"+date.substr(3,2)+"-"+date.substr(0,2);
    var reserved_time=time+":00:00";

    var reserved={
        "booking_id":PageSession.confirm_booking.booking.booking_id,
        "account_id":"FAKE",
        "tables_id":table_id,
        "enable":1,
        "booking_time":curr.getFullYear()+"-"+(curr.getMonth()+1)+"-"+curr.getDate()+" "+curr.getHours()+":"+curr.getMinutes()+":"+curr.getSeconds(),
        "reserved_time":reserved_date+" "+reserved_time

    };
    

    db.entity.booking.create(reserved);
    
}

function showChoice(bookInfo)
{
	var book=document.getElementById("showBookingChoice");
	book.innerHTML="";
    var image=document.createElement("DIV");
    image.className="image";


    var imageInside=document.createElement("IMG");
    imageInside.style.width="100%";
    imageInside.style.height="100%";
    imageInside.src="images/Food.jpg";
    imageInside.style.borderRadius="5px";
    imageInside.alt="Food";
    image.appendChild(imageInside);

    book.appendChild(image);
    	
    	
    var InfoButton=document.createElement("DIV");
    InfoButton.className="InfoButton";



    var Infor=document.createElement("DIV");

    Infor.className="Infor";

    //	var AllLabel[4]={"Restaurant","Guest","Date","Time"};



    	



    	
    var inforBlock=document.createElement("DIV");
  	inforBlock.className="InforBlock";
    var label=document.createElement("H3");
    label.innerHTML="Restaurant";
    label.style.margin=0;
    label.style.color="black";
    var infor=document.createElement("DIV");
    infor.innerHTML=bookInfo.restaurant;
    inforBlock.appendChild(label);
    inforBlock.appendChild(infor);
    Infor.appendChild(inforBlock);


    var inforBlock=document.createElement("DIV");
  	 inforBlock.className="InforBlock";
    var label=document.createElement("H3");
    label.innerHTML="Guest";
    label.style.margin=0;
    label.style.color="black";
    var infor=document.createElement("DIV");
    infor.innerHTML=bookInfo.guest;
    inforBlock.appendChild(label);
    inforBlock.appendChild(infor);
    Infor.appendChild(inforBlock);


    var inforBlock=document.createElement("DIV");
  	inforBlock.className="InforBlock";
    var label=document.createElement("H3");
    label.innerHTML="Date";
    label.style.margin=0;
    label.style.color="black";
    var infor=document.createElement("DIV");
    infor.innerHTML=bookInfo.date;
    inforBlock.appendChild(label);
    inforBlock.appendChild(infor);
    Infor.appendChild(inforBlock);

    var inforBlock=document.createElement("DIV");
  	inforBlock.className="InforBlock";
    var label=document.createElement("H3");
    label.innerHTML="Time";
    label.style.margin=0;
    label.style.color="black";
    var infor=document.createElement("DIV");
    infor.innerHTML=bookInfo.time;
    inforBlock.appendChild(label);
    inforBlock.appendChild(infor);
    Infor.appendChild(inforBlock);
    book.appendChild(Infor);
}
function showRate1()
{
    
    var rating={
        "account_id":"newId",
        "rating_date":"2019-05-16 12:00:00",
        "rating_value":1
    };
    if (db.repository.rating.filter("account_id='newId'").length == 0)
    {
        db.entity.rating.create(rating);
        
        
    }
    var review=document.getElementById("review");
    var rate=document.getElementsByClassName("rating");
    var bar=document.getElementsByClassName("scorecard");
    review.style.display="none";
    rate[0].style.display="none";
    bar[0].style.display="inline";
    var rate1=db.repository.rating.filter("rating_value=1");
    var rate2=db.repository.rating.filter("rating_value=2");
    var rate3=db.repository.rating.filter("rating_value=3");
    var rate4=db.repository.rating.filter("rating_value=4");
    var rate5=db.repository.rating.filter("rating_value=5");
    
    var sum=rate1.length+rate2.length+rate3.length+rate4.length+rate5.length;
   
    var per1=rate1.length/sum*100;
    var per2=rate2.length/sum*100;
    var per3=rate3.length/sum*100;
    var per4=rate4.length/sum*100;
    var per5=rate5.length/sum*100;
    var average=(rate1.length+rate2.length*2+rate3.length*3+rate4.length*4+rate5.length*5)/sum;
    average=average.toFixed(2);

    
    document.getElementsByClassName("bar-1")[0].style.width=per1+"%";
    document.getElementsByClassName("bar-2")[0].style.width=per2+"%";
    document.getElementsByClassName("bar-3")[0].style.width=per3+"%";
    document.getElementsByClassName("bar-4")[0].style.width=per4+"%";
    document.getElementsByClassName("bar-5")[0].style.width=per5+"%";

    var numberRate= document.getElementsByClassName("numberRate");
    numberRate[4].innerHTML=rate1.length;
    numberRate[3].innerHTML=rate2.length;
    numberRate[2].innerHTML=rate3.length;
    numberRate[1].innerHTML=rate4.length;
    numberRate[0].innerHTML=rate5.length;

    document.getElementById("reviewDescription").style.display="inline";
    document.getElementById("reviewAverage").innerHTML=average+" average based on "+sum+" reviews";
}
function showRate2()
{
   
    var rating={
        "account_id":"naruto",
        "rating_date":"2019-05-16 12:00:00",
        "rating_value":2
    };
    if (db.repository.rating.filter("account_id='newId'").length == 0)
    {
        db.entity.rating.create(rating);
        
        
    }
    var review=document.getElementById("review");
    var rate=document.getElementsByClassName("rating");
    var bar=document.getElementsByClassName("scorecard");
    review.style.display="none";
    rate[0].style.display="none";
    bar[0].style.display="inline";
    var rate1=db.repository.rating.filter("rating_value=1");
    var rate2=db.repository.rating.filter("rating_value=2");
    var rate3=db.repository.rating.filter("rating_value=3");
    var rate4=db.repository.rating.filter("rating_value=4");
    var rate5=db.repository.rating.filter("rating_value=5");
    
    var sum=rate1.length+rate2.length+rate3.length+rate4.length+rate5.length;
   
    var per1=rate1.length/sum*100;
    var per2=rate2.length/sum*100;
    var per3=rate3.length/sum*100;
    var per4=rate4.length/sum*100;
    var per5=rate5.length/sum*100;
    var average=(rate1.length+rate2.length*2+rate3.length*3+rate4.length*4+rate5.length*5)/sum;
    average=average.toFixed(2);

    
    document.getElementsByClassName("bar-1")[0].style.width=per1+"%";
    document.getElementsByClassName("bar-2")[0].style.width=per2+"%";
    document.getElementsByClassName("bar-3")[0].style.width=per3+"%";
    document.getElementsByClassName("bar-4")[0].style.width=per4+"%";
    document.getElementsByClassName("bar-5")[0].style.width=per5+"%";

    var numberRate= document.getElementsByClassName("numberRate");
    numberRate[4].innerHTML=rate1.length;
    numberRate[3].innerHTML=rate2.length;
    numberRate[2].innerHTML=rate3.length;
    numberRate[1].innerHTML=rate4.length;
    numberRate[0].innerHTML=rate5.length;

    document.getElementById("reviewDescription").style.display="inline";
    document.getElementById("reviewAverage").innerHTML=average+" average based on "+sum+" reviews";
}
function showRate3()
{
 
    var rating={
        "account_id":"naruto",
        "rating_date":"2019-05-16 12:00:00",
        "rating_value":3
    };
    if (db.repository.rating.filter("account_id='newId'").length == 0)
    {
        db.entity.rating.create(rating);
        
        
    }
    var review=document.getElementById("review");
    var rate=document.getElementsByClassName("rating");
    var bar=document.getElementsByClassName("scorecard");
    review.style.display="none";
    rate[0].style.display="none";
    bar[0].style.display="inline";
    var rate1=db.repository.rating.filter("rating_value=1");
    var rate2=db.repository.rating.filter("rating_value=2");
    var rate3=db.repository.rating.filter("rating_value=3");
    var rate4=db.repository.rating.filter("rating_value=4");
    var rate5=db.repository.rating.filter("rating_value=5");
    
    var sum=rate1.length+rate2.length+rate3.length+rate4.length+rate5.length;
   
    var per1=rate1.length/sum*100;
    var per2=rate2.length/sum*100;
    var per3=rate3.length/sum*100;
    var per4=rate4.length/sum*100;
    var per5=rate5.length/sum*100;
    var average=(rate1.length+rate2.length*2+rate3.length*3+rate4.length*4+rate5.length*5)/sum;
    average=average.toFixed(2);

    
    document.getElementsByClassName("bar-1")[0].style.width=per1+"%";
    document.getElementsByClassName("bar-2")[0].style.width=per2+"%";
    document.getElementsByClassName("bar-3")[0].style.width=per3+"%";
    document.getElementsByClassName("bar-4")[0].style.width=per4+"%";
    document.getElementsByClassName("bar-5")[0].style.width=per5+"%";

    var numberRate= document.getElementsByClassName("numberRate");
    numberRate[4].innerHTML=rate1.length;
    numberRate[3].innerHTML=rate2.length;
    numberRate[2].innerHTML=rate3.length;
    numberRate[1].innerHTML=rate4.length;
    numberRate[0].innerHTML=rate5.length;

    document.getElementById("reviewDescription").style.display="inline";
    document.getElementById("reviewAverage").innerHTML=average+" average based on "+sum+" reviews";
}
function showRate4()
{
    var rating={
        "account_id":"naruto",
        "rating_date":"2019-05-16 12:00:00",
        "rating_value":4
    };
    
    if (db.repository.rating.filter("account_id='newId'").length == 0)
    {
        db.entity.rating.create(rating);
       
        
    }
    var review=document.getElementById("review");
    var rate=document.getElementsByClassName("rating");
    var bar=document.getElementsByClassName("scorecard");
    review.style.display="none";
    rate[0].style.display="none";
    bar[0].style.display="inline";
    var rate1=db.repository.rating.filter("rating_value=1");
    var rate2=db.repository.rating.filter("rating_value=2");
    var rate3=db.repository.rating.filter("rating_value=3");
    var rate4=db.repository.rating.filter("rating_value=4");
    var rate5=db.repository.rating.filter("rating_value=5");
    
    var sum=rate1.length+rate2.length+rate3.length+rate4.length+rate5.length;
   
    var per1=rate1.length/sum*100;
    var per2=rate2.length/sum*100;
    var per3=rate3.length/sum*100;
    var per4=rate4.length/sum*100;
    var per5=rate5.length/sum*100;
    var average=(rate1.length+rate2.length*2+rate3.length*3+rate4.length*4+rate5.length*5)/sum;
    average=average.toFixed(2);

    
    document.getElementsByClassName("bar-1")[0].style.width=per1+"%";
    document.getElementsByClassName("bar-2")[0].style.width=per2+"%";
    document.getElementsByClassName("bar-3")[0].style.width=per3+"%";
    document.getElementsByClassName("bar-4")[0].style.width=per4+"%";
    document.getElementsByClassName("bar-5")[0].style.width=per5+"%";

    var numberRate= document.getElementsByClassName("numberRate");
    numberRate[4].innerHTML=rate1.length;
    numberRate[3].innerHTML=rate2.length;
    numberRate[2].innerHTML=rate3.length;
    numberRate[1].innerHTML=rate4.length;
    numberRate[0].innerHTML=rate5.length;

    document.getElementById("reviewDescription").style.display="inline";
    document.getElementById("reviewAverage").innerHTML=average+" average based on "+sum+" reviews";
}
function showRate5()
{
    
    var rating={
        "account_id":"naruto",
        "rating_date":"2019-05-16 12:00:00",
        "rating_value":5
    };
    if (db.repository.rating.filter("account_id='newId'").length == 0)
    {
        db.entity.rating.create(rating);
        
        
    }
    var review=document.getElementById("review");
    var rate=document.getElementsByClassName("rating");
    var bar=document.getElementsByClassName("scorecard");
    review.style.display="none";
    rate[0].style.display="none";
    bar[0].style.display="inline";
    var rate1=db.repository.rating.filter("rating_value=1");
    var rate2=db.repository.rating.filter("rating_value=2");
    var rate3=db.repository.rating.filter("rating_value=3");
    var rate4=db.repository.rating.filter("rating_value=4");
    var rate5=db.repository.rating.filter("rating_value=5");
    
    var sum=rate1.length+rate2.length+rate3.length+rate4.length+rate5.length;
   
    var per1=rate1.length/sum*100;
    var per2=rate2.length/sum*100;
    var per3=rate3.length/sum*100;
    var per4=rate4.length/sum*100;
    var per5=rate5.length/sum*100;
    var average=(rate1.length+rate2.length*2+rate3.length*3+rate4.length*4+rate5.length*5)/sum;
    average=average.toFixed(2);

    
    document.getElementsByClassName("bar-1")[0].style.width=per1+"%";
    document.getElementsByClassName("bar-2")[0].style.width=per2+"%";
    document.getElementsByClassName("bar-3")[0].style.width=per3+"%";
    document.getElementsByClassName("bar-4")[0].style.width=per4+"%";
    document.getElementsByClassName("bar-5")[0].style.width=per5+"%";

    var numberRate= document.getElementsByClassName("numberRate");
    numberRate[4].innerHTML=rate1.length;
    numberRate[3].innerHTML=rate2.length;
    numberRate[2].innerHTML=rate3.length;
    numberRate[1].innerHTML=rate4.length;
    numberRate[0].innerHTML=rate5.length;

    document.getElementById("reviewDescription").style.display="inline";
    document.getElementById("reviewAverage").innerHTML=average+" average based on "+sum+" reviews";
}