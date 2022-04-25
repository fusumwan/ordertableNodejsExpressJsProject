

window.addEventListener("load", function(){
    document.getElementById("banner").className="banner banner_small"
    document.getElementById("search-container").style.display="none";
    document.getElementById("manage_booking_li").className="active";
    var valid=true;
    if (App.BusinessIntelligence.UserSession().account_id == undefined || App.BusinessIntelligence.UserSession().account_id == "")
    {
        valid=false;
        location.replace("login.html");
    }
    if (valid)
    {
        showName();
        showBooking();
    }
    
    
    

    
});
function LogOut()
{
    App.BusinessIntelligence.Logout();
    location.replace("index.html");
}


function showName()
{
    var user_session=App.BusinessIntelligence.UserSession();
    var first_name=user_session.first_name;
    var last_name=user_session.last_name;
    var name=document.getElementById("name");
    name.innerHTML="Hi "+last_name+" "+first_name+"!";
}
function showBooking()
{
    var right=document.getElementsByClassName("right");
    right[0].innerHTML="";

    var user_session=App.BusinessIntelligence.UserSession();
    var user_id=user_session.account_id;
    

    var bookings=db.repository.booking.filter("account_id='"+user_id+"' and enable=1");

    var allBooking=bookings.length;
    if (allBooking == 0)
    {
        right[0].innerHTML="There is no upcomming booking";
    }
    for (var i=0;i<allBooking;++i)
    {
        
        var table_id=bookings[i].tables_id;
        var tables=db.repository.tables.filter("tables_id='"+table_id+"'");
        var restaurantId=tables[0].restaurant_id;
    //  alert(restaurantId);
        
        var restaurant=db.repository.restaurant.filter("restaurant_id='"+restaurantId+"'");

        var book=document.createElement("DIV");
        book.className="booking";

        var image=document.createElement("DIV");
        image.className="image";


        var imageInside=document.createElement("IMG");
        imageInside.style.width="95%";
        imageInside.style.height="100%";
        imageInside.src="images/Food.jpg";
        imageInside.alt="Food";
        image.appendChild(imageInside);

        book.appendChild(image);
        
        
        var InfoButton=document.createElement("DIV");
        InfoButton.className="InfoButton";



        var Infor=document.createElement("DIV");

        Infor.className="Infor";

    //  var AllLabel[4]={"Restaurant","Guest","Date","Time"};



        



        
        var inforBlock=document.createElement("DIV");
        inforBlock.className="InforBlock";
        var label=document.createElement("H3");
        label.innerHTML="Restaurant";
        label.style.margin=0;
        label.style.color="black";
        var infor=document.createElement("DIV");
        infor.innerHTML=restaurant[0].name;
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
        infor.innerHTML=tables[0].number_of_sits;
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
        var time=new Date(bookings[i].reserved_time);
        var date=time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear();
        infor.innerHTML=date;
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
        infor.innerHTML=time.getHours()+':00';
        inforBlock.appendChild(label);
        inforBlock.appendChild(infor);
        Infor.appendChild(inforBlock);
        

        InfoButton.appendChild(Infor);

        var Button=document.createElement("DIV");
        Button.className="Button";

        var modify=document.createElement("BUTTON");
        modify.className="modify";
        modify.innerHTML="modify";
        var cancel=document.createElement("BUTTON");
        cancel.className="cancel";
        cancel.innerHTML="cancel";

        cancel.addEventListener("click", cancelBooking.bind(this,i,bookings[i]));


        Button.appendChild(modify);
        Button.appendChild(cancel);

        InfoButton.appendChild(Button);

        book.appendChild(InfoButton);
        right[0].appendChild(book);




        



        

        



    } 
}
function cancelBooking(index,bookingObject)
{
    bookingObject.enable=0;
    db.entity.booking.update(bookingObject);
    showBooking();
}

