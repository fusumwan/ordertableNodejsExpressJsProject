/**************************************************
 // Author: Sum Wan,FU
 // Date: 7-5-2019
 // Description: Account Info javascript
 **************************************************/
var UserSession=App.BusinessIntelligence.UserSession();
if(UserSession==undefined || UserSession.account_id==""){
    alert("Please kindly login our OrderTable account system!");
    window.location="login.html";
}

window.addEventListener("load", function(){
    var UserCookie=App.BusinessIntelligence.GetCookie("user_name");
    if(UserCookie!="" && UserCookie!=undefined){
        var UserCookie=JSON.parse(UserCookie);
        
        document.getElementById("rememberme").checked=true;
        if(UserCookie.user_type=="restaurant manager"){
            document.getElementById("user_type_chk").checked=true;
        }else{
            document.getElementById("user_type_chk").checked=false;
        }
    }

    document.getElementById("rememberme").addEventListener("click", function(){
        var UserSession=App.BusinessIntelligence.UserSessionNoDecode();
        if(UserSession.account_id!="" && UserSession.account_id!=undefined){
            if(this.checked){
                App.BusinessIntelligence.DelCookie("user_name");
                App.BusinessIntelligence.SessionToCookie(UserSession);
            }else{
                App.BusinessIntelligence.DelCookie("user_name");
            }
        }
    });


    var _account_id_txt=document.getElementById("account_id_txt");
    var _first_name_txt=document.getElementById("first_name_txt");
    var _last_name_txt=document.getElementById("last_name_txt");
    var _email_txt=document.getElementById("email_txt");
    var _contact_number_txt=document.getElementById("contact_number_txt");
    var _password_txt=document.getElementById("password_txt");
    var _confirm_password_txt=document.getElementById("confirm_password_txt");
    _account_id_txt.value=UserSession.account_id;
    _first_name_txt.value=UserSession.first_name;
    _last_name_txt.value=UserSession.last_name;
    _email_txt.value=UserSession.email;
    _contact_number_txt.value=UserSession.contact_number;
    _password_txt.value=UserSession.password;
    if(UserSession.user_type=="restaurant manager"){
        document.getElementById("user_type_chk").checked=true;

    }else{
        document.getElementById("user_type_chk").checked=false;
        document.getElementById("res_link").style.display="none";
    }


    document.getElementById("banner").className="banner banner_small"
    document.getElementById("search-container").style.display="none";
    document.getElementById("account_info_li").className="active";
    
    document.getElementById("update_btn").addEventListener("click", function(){
        var _valid=true;
        /*
        var _account_id_txt=document.getElementById("account_id_txt").value;
        var _first_name_txt=document.getElementById("first_name_txt").value;
        var _last_name_txt=document.getElementById("last_name_txt").value;
        var _email_txt=document.getElementById("email_txt").value;
        var _contact_number_txt=document.getElementById("contact_number_txt").value;
        var _password_txt=document.getElementById("password_txt").value;
        var _confirm_password_txt=document.getElementById("confirm_password_txt").value;
        */
        
        if(_first_name_txt.value=="" || _first_name_txt.value==null){
            alert("Invalid first name!");
            _valid=false;
        }
        else if(_last_name_txt.value=="" || _last_name_txt.value==null){
            alert("Invalid last name!");
            _valid=false;
        }
        else if(!error.protection.ValidEmail(_email_txt.value)){
            alert("Invalid email address!");
            _valid=false;
        }
        else if(_contact_number_txt.value=="" || _contact_number_txt.value==null){
            alert("Invalid contact number!");
            _valid=false;
        }
        else if(_password_txt.value=="" || _password_txt.value==null){
            alert("Invalid password!");
            _valid=false;
        }
        else if(_confirm_password_txt.value=="" || _confirm_password_txt.value==null){
            alert("Invalid confirm password!");
            _valid=false;
        }
        else if(_password_txt.value!=_confirm_password_txt.value){
            alert("Confirm password not match to password!");
            _valid=false;
        }

        error.protection.preventDefault(event);
        if(_valid){
            var account=db.entity.account.new();
            account.account_id=_account_id_txt.value;
            account.first_name=_first_name_txt.value;
            account.last_name=_last_name_txt.value;
            account.email=_email_txt.value;
            account.contact_number=_contact_number_txt.value;
            account.password=_password_txt.value;
            if(document.getElementById("user_type_chk").checked){
                account.user_type="restaurant manager";
            }else{
                account.user_type="customer";
            }
            if(App.BusinessIntelligence.UpdateAccount(account)){
                App.BusinessIntelligence.Logout();
                if(App.BusinessIntelligence.Login(_email_txt.value,_password_txt.value)){

                    var UserSession=App.BusinessIntelligence.UserSessionNoDecode();
                    if(UserSession.account_id!="" && UserSession.account_id!=undefined){
                        if(document.getElementById("rememberme").checked){
                            App.BusinessIntelligence.DelCookie("user_name");
                            App.BusinessIntelligence.SessionToCookie(UserSession);
                        }else{
                            App.BusinessIntelligence.DelCookie("user_name");
                        }
                    }
                }
            }
        }
    });
});

