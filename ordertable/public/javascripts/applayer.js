/**************************************************
 // Author: Sum Wan,FU
 // Date: 27-5-2019
 // Description: Application Layer
 **************************************************/

var App = {
	// Application Constructor
	Initialize: function() {
		this.PreLoad();
		this.BindEvents();
	},
	PreLoad:function(){
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load'
	BindEvents: function() {
		window.addEventListener('load',this.OnDeviceReady);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'App.ReceivedEvent(...);'
	OnDeviceReady: function() {
		App.ReceivedEvent('deviceready');
	},
	
	OnLoad:function(){
	},
	// Update DOM on a Received Event
	ReceivedEvent: function(e) {
		if(e=="deviceready"){
			this.OnLoad();
		}
	},
	BusinessIntelligence:{
		CalendarToDBDateFormat:function(value){
			values=value.split('/');
			var _value="";
			if(values.length==0)
			{
				return value;
			}
			for(var i=values.length-1;i>=0;i--){
				if(_value!=""){
					_value+="-";
				}
				_value+=values[i];
			}
			return _value;
		},
		DBDateFormatToCalendar:function(value){
			values=value.split('-');
			var _value="";
			if(values.length==0)
			{
				return value;
			}
			for(var i=values.length-1;i>=0;i--){
				if(_value!=""){
					_value+="/";
				}
				_value+=values[i];
			}
			return _value;
		},
		SetCookie:function(user_name,value,expiry_date){
			var _GMT = new Date();
			_GMT.setTime(_GMT.getTime() + (expiry_date*24*60*60*1000));
			var _expires = "expires=" + _GMT.toGMTString();
			document.cookie = user_name + "=" + value + ";" + _expires + ";path=/";
		},
		DelCookie:function(user_name) {
			document.cookie = user_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		},
		GetCookie:function(user_name){
			var _user_name = user_name + "=";
			var _decoded_cookie = decodeURIComponent(document.cookie);
			var ca = _decoded_cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(_user_name) == 0) {
					return c.substring(_user_name.length, c.length);
				}
			}
			return "";
		},
		SessionToCookie:function(user_session){
			if(user_session!=undefined){
				if(user_session.account_id!="" && user_session.account_id!=undefined){
					var user=JSON.stringify(user_session);
					this.SetCookie("user_name", JSON.stringify(user_session), 30);
					return user;
				}
				else{
					return "";
				}
			}
		},
		UserSession:function(){
			var _result=[];
			var This=this;
			infras.ajax.get("/users/user_session",null,function(res){
				if (res.readyState == 4 && res.status == 200) {
					if(res.responseText!=undefined && res.responseText!=""){
						_result=JSON.parse(res.responseText);
						if(_result.password!=undefined && _result.password!=""){
							_result.password=This.Decode(_result.password);
						}
						return _result;
					}
				}
			},false);
			return _result;
		},
		UserSessionNoDecode:function(){
			var _result=[];
			infras.ajax.get("/users/user_session",null,function(res){
				if (res.readyState == 4 && res.status == 200) {
					if(res.responseText!=undefined && res.responseText!=""){
						_result=JSON.parse(res.responseText);
						return _result;
					}
				}
			},false);
			return _result;
		},
		EmptyPageSession:function(){
			var page_session={
				"index": {
				"reserve_date": "",
				"person": ""
				},
				"login": "",
				"signup": "",
				"restaurant_manage": "",
				"manage_booking": "",
				"confirm_booking": "",
				"accountInfo": "",
				"map": { 
					"tables":"",
					"reserve_date":""
				},
				"result": { 
					"tables":"",
					"reserve_date":""
				}
			};
			return page_session;
		},
		PageSession:function(){
			var _result=[];
			infras.ajax.get("/users/page_session",null,function(res){
				if (res.readyState == 4 && res.status == 200) {
					if(res.responseText!=undefined && res.responseText!=""){
						_result=JSON.parse(res.responseText);
						return _result;
					}
				}
			},false);
			return _result;
		},
		SetPageSession:function(page_session){
			var _result=true;
			infras.ajax.send("/users/page_session",function(res){
				if (res.readyState == 4 && res.status == 200) {
					if(res.responseText!=undefined && res.responseText!=""){
						_result=true;
					}
					else{
						_result=false;
					}
				}
			},"POST","JSON",JSON.stringify(page_session),false);
			return _result;
		},
		DelPageSession:function(){
			var page_session=this.PageSession();
			var empty_session=this.EmptyPageSession();
			var This=this;
			var _session={
				index:function(){
					page_session.index={"reserve_date": "","person": ""};
					return This.SetPageSession(page_session);
				},
				login: function(){
					page_session.login="";
					return This.SetPageSession(page_session);
				},
				signup: function(){
					page_session.signup="";
					return This.SetPageSession(page_session);
				},
				restaurant_manage: function(){
					page_session.restaurant_manage="";
					return This.SetPageSession(page_session);
				},
				manage_booking: function(){
					page_session.manage_booking="";
					return This.SetPageSession(page_session);
				},
				confirm_booking: function(){
					page_session.confirm_booking="";
					return This.SetPageSession(page_session);
				},
				accountInfo: function(){
					page_session.accountInfo="";
					return This.SetPageSession(page_session);
				},
				map:function(){
					page_session.map= { "tables":"","reserve_date":""};
					return This.SetPageSession(page_session);
				},
				result:function(){
					page_session.result= { "tables":"","reserve_date":""};
					return This.SetPageSession(page_session);
				},
				all:function(){
					return This.SetPageSession(empty_session);
				}
			};
			return _session; 
		},
		UTFEncode : function (value) {
			value = value.replace(/\r\n/g,"\n");
			var str = "";
			for (var n = 0; n < value.length; n++) {
				var c = value.charCodeAt(n);
				if (c < 128) {
					str += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					str += String.fromCharCode((c >> 6) | 192);
					str += String.fromCharCode((c & 63) | 128);
				}
				else {
					str += String.fromCharCode((c >> 12) | 224);
					str += String.fromCharCode(((c >> 6) & 63) | 128);
					str += String.fromCharCode((c & 63) | 128);
				}
			}
			return str;
		},
		UTFDecode : function (value) {
			var str = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while ( i < value.length ) {
				c = value.charCodeAt(i);
				if (c < 128) {
					str += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = value.charCodeAt(i+1);
					str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = value.charCodeAt(i+1);
					c3 = value.charCodeAt(i+2);
					str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return str;
		},
		EncodeOrDecodeKey : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		Encode:function(value){
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			value = this.UTFEncode(value);
			while (i < value.length) {
				chr1 = value.charCodeAt(i++);
				chr2 = value.charCodeAt(i++);
				chr3 = value.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output +
				this.EncodeOrDecodeKey.charAt(enc1) + this.EncodeOrDecodeKey.charAt(enc2) +
				this.EncodeOrDecodeKey.charAt(enc3) + this.EncodeOrDecodeKey.charAt(enc4);
			}
			return output;
		},
		Decode : function (value) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			value = value.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < value.length) {
				enc1 = this.EncodeOrDecodeKey.indexOf(value.charAt(i++));
				enc2 = this.EncodeOrDecodeKey.indexOf(value.charAt(i++));
				enc3 = this.EncodeOrDecodeKey.indexOf(value.charAt(i++));
				enc4 = this.EncodeOrDecodeKey.indexOf(value.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = this.UTFDecode(output);
			return output;
		},
		UpdateAccount:function(account){
			var valid=false;
			var accounts=db.repository.account.filter("email='"+account.email+"' and account_id!='"+account.account_id+"'");
			if(accounts.length==0){
				account.password=this.Encode(account.password);
				valid=db.entity.account.update(account);

			}
			else{
				alert('This email is used!');
			}

			if(valid){
				alert('Update Success!');
			}else{
				alert('Update Fail!');
			}
			
			return true;
		},
		SignIn:function(account){
			var valid=false;
			account.password=this.Encode(account.password);
			var accounts=db.repository.account.filter("email='"+account.email+"'");
			
			if(accounts.length==0){
				valid=db.entity.account.create(account);
			}
			else{
				alert('This email is used!');
			}
			
			if(valid){
				alert('Sign In Success!');
			}else{
				alert('Sign In Fail!');
			}
			
			
			return true;
		},
		Login:function(email,password){
			var _result=true;
			password=this.Encode(password);
			var accounts=db.repository.account.filter("email='"+email+"' and password='"+password+"'");
			if(accounts.length>0){
				infras.ajax.post("/users/user_session",accounts[0],function(res){
					if (res.readyState == 4 && res.status == 200) {
						
						_result=true;
					}else{
						_result=false;
					}
				},false);
			}else{
				
				_result=false;
			}
			return _result;
		},
		Logout:function(){
			var _result=true;
			var account=db.entity.account.new();
			account.account_id="";
			infras.ajax.post("/users/user_session",account,function(res){
				if (res.readyState == 4 && res.status == 200) {
					_result=true;
				}else{
					_result=false;
				}
			},false);
			return _result;
		}
	}
};