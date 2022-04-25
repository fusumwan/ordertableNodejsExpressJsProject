/**************************************************
 // Author: Sum Wan,FU
 // Date: 7-5-2019
 // Description: Login javascript
 **************************************************/


window.addEventListener("load", function(){
    document.getElementById("banner").className="banner banner_small"
    document.getElementById("search-container").style.display="none";
    document.getElementById("login_li").className="active";
    
    var UserCookie=App.BusinessIntelligence.GetCookie("user_name");
    if(UserCookie!="" && UserCookie!=undefined){
        var UserCookie=JSON.parse(UserCookie);
        document.getElementById("email_txt").value=UserCookie.email;
        document.getElementById("password_txt").value=App.BusinessIntelligence.Decode(UserCookie.password);
        document.getElementById("rememberme").checked=true;
        if(UserCookie.user_type=="restaurant manager"){
            document.getElementById("user_type_chk").checked=true;
        }else{
            document.getElementById("user_type_chk").checked=false;
        }
    }
    

    document.getElementById("login_btn").addEventListener("click", function(){
        var _valid=true;
        var _email_txt=document.getElementById("email_txt").value;
        var _password_txt=document.getElementById("password_txt").value;
        var _rememberme_txt=document.getElementById("rememberme").checked;
        error.protection.preventDefault(event);
        if(!error.protection.ValidEmail(_email_txt)){
            alert("Invalid email address!");
            _valid=false;
        }
        else if(_password_txt=="" || _password_txt==null){
            alert("Invalid password!");
            _valid=false;
        }
        var user_type="";
        if(document.getElementById("user_type_chk").checked){
            user_type="restaurant manager";
        }else{
            user_type="customer";
        }
        var accounts=db.repository.account.filter("email='"+_email_txt+"' AND user_type='"+user_type+"'");
        if(accounts.length==0){
            alert("Please login in as an administrative professional!");
            return false;
        }
        
        if(_valid){
            if(App.BusinessIntelligence.Login(_email_txt,_password_txt)){
                alert("Login success!");
                var UserSession=App.BusinessIntelligence.UserSessionNoDecode();
                if(UserSession.account_id!="" && UserSession.account_id!=undefined){
                    if(document.getElementById("rememberme").checked){
                        App.BusinessIntelligence.DelCookie("user_name");
                        App.BusinessIntelligence.SessionToCookie(UserSession);
                    }else{
                        App.BusinessIntelligence.DelCookie("user_name");
                    }
                }
                window.location="accountInfo.html";
            }else{
                alert("Login fail!");
            }
        }
    });
});


