/**************************************************
 // Author: Sum Wan,FU
 // Date: 27-5-2019
 // Description: Data Layer
 **************************************************/

var entity={
	uuidv4:function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	create:function(table,data){
		var _result=true;
		infras.ajax.post("/database/"+table+"/create",data,function(res){
			if (res.readyState == 4 && res.status == 200) {
				_result=true;
			}else{
				_result=false;
			}
		},false);
		return _result;
	},
	retrieve:function(table,id){
		var _result={};
		var data={
			"id":id
		};
		infras.ajax.get("/database/"+table+"/retrieve",data,function(res){
			if (res.readyState == 4 && res.status == 200) {
				_result=JSON.parse(res.responseText);
			}
		},false);
		return _result;
	},
	update:function(table,data){
		var _result=true;
		infras.ajax.post("/database/"+table+"/update",data,function(res){
			if (res.readyState == 4 && res.status == 200) {
				_result=true;
			}else{
				_result=false;
			}
		},false);
		return _result;
	},
	delete:function(table,id){
		var _result=true;
		var data={
			"id":id
		};
		infras.ajax.get("/database/"+table+"/delete",data,function(res){
			if (res.readyState == 4 && res.status == 200) {
				_result=true;
			}else{
				_result=false;
			}

		},false);
		return _result;
	},
	account:{
		entity:this,
		new:function(){
			var obj={
				"account_id":entity.uuidv4(),
				"first_name":"",
				"last_name":"",
				"email":"",
				"contact_number":"",
				"password":"",
				"user_type":""
			};
			return obj;
		},
		create:function(data){
			return entity.create("account",data);
		},
		retrieve:function(id){
			return entity.retrieve("account",id);
		},
		update:function(data){
			return entity.update("account",data);
		},
		delete:function(id){
			return entity.delete("account",id);
		}
	},
	booking:{
		entity:this,
		new:function(){
			var obj={
				"booking_id":entity.uuidv4(),
				"account_id":"",
				"tables_id":"",
				"enable":1,
				"booking_time":"",
				"reserved_time":""
			};
			return obj;
		},
		create:function(data){
			return entity.create("booking",data);
		},
		retrieve:function(id){
			return entity.retrieve("booking",id);
		},
		update:function(data){
			return entity.update("booking",data);
		},
		delete:function(id){
			return entity.delete("booking",id);
		}
	},
	tables:{
		entity:this,
		new:function(){
			var obj={
				"tables_id":entity.uuidv4(),
				"number_of_sits":0,
				"restaurant_id":"",
				"available_time":0
			};
			return obj;
		},
		create:function(data){
			return entity.create("tables",data);
		},
		retrieve:function(id){
			return entity.retrieve("tables",id);
		},
		update:function(data){
			return entity.update("tables",data);
		},
		delete:function(id){
			return entity.delete("tables",id);
		}
	},
	timeperiod:{
		entity:this,
		new:function(){
			var obj={
				"timeperiod_id":entity.uuidv4(),
				"restaurant_id":"",
				"account_id":"",
				"start_period":"",
				"end_period":""
			};
			return obj;
		},
		create:function(data){
			return entity.create("timeperiod",data);
		},
		retrieve:function(id){
			return entity.retrieve("timeperiod",id);
		},
		update:function(data){
			return entity.update("timeperiod",data);
		},
		delete:function(id){
			return entity.delete("timeperiod",id);
		}
	},
	restaurant:{
		entity:this,
		new:function(){
			var obj={
				"restaurant_id":entity.uuidv4(),
				"name":"",
				"image":"",
				"location":"",
				"contact_number":0,
				"longitude":"",
				"latitude":"",
				"description":""
			};
			return obj;
		},
		create:function(data){
			return entity.create("restaurant",data);
		},
		retrieve:function(id){
			return entity.retrieve("restaurant",id);
		},
		update:function(data){
			return entity.update("restaurant",data);
		},
		delete:function(id){
			return entity.delete("restaurant",id);
		}
	},
	rating:{
		create:function(data){
			return entity.create("rating",data);
		},
		retrieve:function(id){
			return entity.retrieve("rating",id);
		},
		update:function(data){
			return entity.update("rating",data);
		},
		delete:function(id){
			return entity.delete("rating",id);
		}
	}
};

var repository={
	sql_analyst:function(sql){
		var op=["!=","<>","<=",">=",">","<","="];
		var filters = sql.split(' ');
		var values=[];
		var k=0;
		var valid_sql=true;
		for(var i=0;i<filters.length;i++){
			filters[i]=filters[i].trim();
			if(filters[k].substr(0,1)==';' || filters[k].substr(filters[k].length-1,1)==';'){
				valid_sql=false;
				//alert("invalid sql ;");
				break;
			}
			for(var j=0;j<op.length;j++){
				var n = filters[i].indexOf(op[j]);
				if(n>=0){
					values[k]=filters[i].substr(n+op[j].length,filters[i].length-n-op[j].length);
					if(values[k].substr(0,1)=='\'' && 
						values[k].substr(values[k].length-1,1)=='\''){
						values[k]=values[k].substr(1,values[k].length);
						values[k]=values[k].substr(0,values[k].length-1);
					}
					filters[i]=filters[i].substr(0,n+op[j].length)+"?";
					k+=1;
					break;
				}
			}
			
			if(filters[i]=='1' || filters[i].toLowerCase()=="drop"){
				valid_sql=false;
				//alert("invalid sql 1/drop");
				break;
			}
			
		}
		if(!valid_sql){
			filters=[];
			values=[];
		}

		var filter={
			"filters":filters,
			"values":values
		};
		return filter;
	},
	filter:function(table,data_filter){
		var _result={};
		infras.ajax.send("/database/"+table+"/filter",function(res){
			if (res.readyState == 4 && res.status == 200) {
				if(res.responseText!=undefined && res.responseText!=""){
					_result=JSON.parse(res.responseText);
				}
			}
		},"POST","JSON",JSON.stringify(data_filter),false);
		return _result;
	},
	account:{
		repository:this,
		filter:function(sql){
			return repository.filter("account",repository.sql_analyst(sql));
		}
	},
	booking:{
		repository:this,
		filter:function(sql){
			return repository.filter("booking",repository.sql_analyst(sql));
		}
	},
	tables:{
		repository:this,
		filter:function(sql){
			return repository.filter("tables",repository.sql_analyst(sql));
		}
	},
	timeperiod:{
		repository:this,
		filter:function(sql){
			return repository.filter("timeperiod",repository.sql_analyst(sql));
		}
	},
	restaurant:{
		repository:this,
		filter:function(sql){
			return repository.filter("restaurant",repository.sql_analyst(sql));
		}
	},
	rating:{
		repository:this,
		filter:function(sql){
			return repository.filter("rating",repository.sql_analyst(sql));
		}
	}
};

var db={
	repository:repository,
	entity:entity
}