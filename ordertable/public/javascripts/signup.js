/**************************************************
 // Author: Sum Wan,FU
 // Date: 7-5-2019
 // Description: Signup javascript
 **************************************************/


window.addEventListener("load", function(){
document.getElementById("banner").className="banner banner_small"
    document.getElementById("search-container").style.display="none";
    document.getElementById("sign_up_li").className="active";


    document.getElementById("signup_btn").addEventListener("click", function(){
        var _valid=true;
        var _first_name_txt=document.getElementById("first_name_txt").value;
        var _last_name_txt=document.getElementById("last_name_txt").value;
        var _email_txt=document.getElementById("email_txt").value;
        var _contact_number_txt=document.getElementById("contact_number_txt").value;
        var _password_txt=document.getElementById("password_txt").value;
        var _confirm_password_txt=document.getElementById("confirm_password_txt").value;
        
        
        if(_first_name_txt=="" || _first_name_txt==null){
            alert("Invalid firstname!");
            _valid=false;
        }
        else if(_last_name_txt=="" || _last_name_txt==null){
            alert("Invalid lastname!");
            _valid=false;
        }
        else if(!error.protection.ValidEmail(_email_txt)){
            alert("Invalid email address!");
            _valid=false;
        }
        else if(_contact_number_txt=="" || _contact_number_txt==null){
            alert("Invalid contact number!");
            _valid=false;
        }
        else if(_password_txt=="" || _password_txt==null){
            alert("Invalid password!");
            _valid=false;
        }
        else if(_confirm_password_txt=="" || _confirm_password_txt==null){
            alert("Invalid confirm password!");
            _valid=false;
        }else if(_password_txt!=_confirm_password_txt){
            alert("Confirm password not match to password!");
            _valid=false;
        }
        error.protection.preventDefault(event);
        if(_valid){
            var account=db.entity.account.new();
            account.first_name=_first_name_txt;
            account.last_name=_last_name_txt;
            account.email=_email_txt;
            account.contact_number=_contact_number_txt;
            account.password=_password_txt;
            if(document.getElementById("user_type_chk").checked){
                account.user_type="restaurant manager";
            }else{
                account.user_type="customer";
            }
            if(App.BusinessIntelligence.SignIn(account)){
                
                alert("Please use new account login!");
                if(App.BusinessIntelligence.Logout()){
                    window.location="index.html";
                }
            }
        }
    });
});

