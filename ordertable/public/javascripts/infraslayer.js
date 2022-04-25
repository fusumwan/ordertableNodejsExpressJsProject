/**************************************************
 // Author: Sum Wan,FU
 // Date: 21-5-2019
 // Description: Infrastructure Layer
 **************************************************/


var infras = {
	ajax: {
		init: function () {
			if ('undefined' !== typeof XMLHttpRequest) { return new XMLHttpRequest();}
			var __xml_http_vers = ["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"];
			var __active_object;
			for (var i = 0; i < __xml_http_vers.length; i++) {
				try {
					__active_object = new ActiveXObject(__xml_http_vers[i]);
					break;
				} catch (e) {
					//console.error(e);
					alert(e.messsage);
				}
			}
			return __active_object;
		},
		send: function (url, callback, method, type, data, async) {
			var __ajaxobject = this.init();
			__ajaxobject.open(method, url, async);
			__ajaxobject.onreadystatechange = function () {
				callback(__ajaxobject);
			};
			if (method == 'POST') {
				if(type=="JSON"){
					__ajaxobject.setRequestHeader("Content-Type", "application/json");
				}else{
					__ajaxobject.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				}
			}
			else{
				__ajaxobject.setRequestHeader("Content-Type", "application/json");
			}
			__ajaxobject.send(data)
		},
		get: function (url, data, callback, async) {
			var query = [];
			for (var key in data) {
				query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
			}
			this.send(url + (query.length ? '?' + query.join('&') : ''), callback,'GET',"", null, async)
		},
		post: function (url, data, callback, async) {
			var query = [];
			for (var key in data) {
				query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
			}
			this.send(url, callback, 'POST',"", query.join('&'), async)

		},
		html:function(container_id,templateUrl,callback,async){
			var xmlhttp = this.init();
			xmlhttp.open("GET", templateUrl, async);
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
				   if (xmlhttp.status == 200) {
						var container=document.getElementById(container_id);
						if(container!=undefined){
							document.getElementById(container_id).innerHTML = xmlhttp.responseText;
						}
						callback();
					}
					else if (xmlhttp.status == 400) {
						alert('There was an error 400');
					}
					else {
						alert('Page other error was returned');
					}
				}
			};
			xmlhttp.send();
		}
	},
	directive: function(container_id,templateUrl,callback,async){
		this.ajax.init();
		this.ajax.html(container_id,templateUrl,callback,async);
		return this;
	},
	module: function(module_name){
		switch(module_name){
			case "docsTemplateUrlDirective":
			return this;
			break;
		}
	}
};


