var express = require('express');
var router = express.Router();

function validsqlfilter(filter){
	var valid_sql=true;
	if(filter!=undefined){
		for(var i=0;i<filter.length;i++){
			if(filters[i].substr(0,1)==';' || filters[i].substr(filters[i].length-1,1)==';'){
				valid_sql=false;
				break;
			}
			else if(filters[i]=='1' || filters[i].toLowerCase()=="drop"){
				valid_sql=false;
				break;
			}
		}
	}
	return valid_sql;
}



/* account */
router.post('/account/create', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var account_id=req.body.account_id;
		var first_name=req.body.first_name;
		var last_name=req.body.last_name;
		var email=req.body.email;
		var contact_number=req.body.contact_number;
		var password=req.body.password;
		var user_type=req.body.user_type;
		var query="INSERT INTO account (account_id,first_name,last_name,email,contact_number,password,user_type) VALUES (?,?,?,?,?,?,?)";
		connection.query(query,[account_id,first_name,last_name,email,contact_number,password,user_type],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/account/retrieve', function(req, res, next) {
	req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="SELECT account_id, first_name,last_name,email,contact_number,password,user_type FROM account WHERE account_id=?";
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.json(rows);
		});
	})
});

router.post('/account/filter', function(req, res, next) {
	req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var values=[];
		var wheresql="";
		var filter=req.body;
		if(validsqlfilter(filter)){
			console.log(req.body);
			if(filter.filters.length>0){
				wheresql=" WHERE ";
				for(var i=0;i<filter.filters.length;i++){
					wheresql+=filter.filters[i]+" ";
				}
				values=filter.values;
			}
			var query="SELECT account_id, first_name,last_name,email,contact_number,password,user_type FROM account "+wheresql;
			console.log(query);
			connection.query(query,values,function(err,rows,fields){
				connection.release();
				res.json(rows);
			});
		}
		else{
			res.json({});
		}
	})
});

router.post('/account/update', function(req, res, next) {
	req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var account_id=req.body.account_id;
		var first_name=req.body.first_name;
		var last_name=req.body.last_name;
		var email=req.body.email;
		var contact_number=req.body.contact_number;
		var password=req.body.password;
		var user_type=req.body.user_type;
		var query="UPDATE account SET first_name=?, last_name=?,email=?, contact_number=?,password=?,user_type=? WHERE account_id=?";
		
		connection.query(query,[first_name,last_name,email,contact_number,password,user_type,account_id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/account/delete', function(req, res, next) {
	req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="DELETE FROM account WHERE account_id=?";
		
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});



/* booking  */
router.post('/booking/create', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var booking_id=req.body.booking_id;
		var account_id=req.body.account_id;
		var tables_id=req.body.tables_id;
		var enable=req.body.enable;
		var booking_time=req.body.booking_time;
		var reserved_time=req.body.reserved_time;
		var query="INSERT INTO booking (booking_id,account_id,tables_id,enable,booking_time,reserved_time) VALUES (?,?,?,?,?,?)";
		connection.query(query,[booking_id,account_id,tables_id,enable,booking_time,reserved_time],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/booking/retrieve', function(req, res, next) {
	req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		
		var query="SELECT booking_id,account_id,tables_id,enable,DATE_FORMAT(booking_time, \"%Y-%m-%d %H:%i:%s\") booking_time,DATE_FORMAT(reserved_time, \"%Y-%m-%d %H:%i:%s\") reserved_time FROM booking WHERE booking_id=?";
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.json(rows);
		});
	})
});

router.post('/booking/filter', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var values=[];
		var wheresql="";
		var filter=req.body;
		if(validsqlfilter(filter)){
			console.log(req.body);
			if(filter.filters.length>0){
				wheresql=" WHERE ";
				for(var i=0;i<filter.filters.length;i++){
					wheresql+=filter.filters[i]+" ";
				}
				values=filter.values;
			}
			
			var query="SELECT booking_id,account_id,tables_id,enable,DATE_FORMAT(booking_time, \"%Y-%m-%d %H:%i:%s\") booking_time,DATE_FORMAT(reserved_time, \"%Y-%m-%d %H:%i:%s\") reserved_time FROM booking "+wheresql;
			console.log(query);
			connection.query(query,values,function(err,rows,fields){
				connection.release();
				res.json(rows);
			});
		}
		else{
			res.json({});
		}
	})
});

router.post('/booking/update', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		console.log(req.body);
		var booking_id=req.body.booking_id;
		var account_id=req.body.account_id;
		var tables_id=req.body.tables_id;
		var enable=req.body.enable;
		var booking_time=req.body.booking_time;
		var reserved_time=req.body.reserved_time
		var query="UPDATE booking SET account_id=?, tables_id=?,enable=?,booking_time=?,reserved_time=? WHERE booking_id=?";
		console.log(query);
		connection.query(query,[account_id,tables_id,enable,booking_time,reserved_time,booking_id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/booking/delete', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="DELETE FROM booking WHERE booking_id=?";
		
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});


/* tables */
router.post('/tables/create', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var tables_id=req.body.tables_id;
		var number_of_sits=req.body.number_of_sits;
		var restaurant_id=req.body.restaurant_id;
		var available_time=req.body.available_time;
		
		var query="INSERT INTO tables (tables_id,number_of_sits,restaurant_id,available_time) VALUES (?,?,?,?)";
		connection.query(query,[tables_id,number_of_sits,restaurant_id,available_time],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/tables/retrieve', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="SELECT tables_id,number_of_sits,restaurant_id,available_time FROM tables WHERE tables_id=?";
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.json(rows);
		});
	})
});


router.post('/tables/filter', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var values=[];
		var wheresql="";
		var filter=req.body;
		if(validsqlfilter(filter)){
			console.log(req.body);
			if(filter.filters.length>0){
				wheresql=" WHERE ";
				for(var i=0;i<filter.filters.length;i++){
					wheresql+=filter.filters[i]+" ";
				}
				values=filter.values;
			}
			
			var query="SELECT tables_id,number_of_sits,restaurant_id,available_time FROM tables "+wheresql;
			console.log(query);
			connection.query(query,values,function(err,rows,fields){
				connection.release();
				res.json(rows);
			});
		}
		else{
			res.json({});
		}
	})
});

router.post('/tables/update', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var tables_id=req.body.tables_id;
		var number_of_sits=req.body.number_of_sits;
		var restaurant_id=req.body.restaurant_id;
		var available_time=req.body.available_time;
		var query="UPDATE tables SET number_of_sits=?, restaurant_id=?,available_time=? WHERE tables_id=?";
		
		connection.query(query,[number_of_sits,restaurant_id,available_time,tables_id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/tables/delete', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="DELETE FROM tables WHERE tables_id=?";
		
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});


/* timeperiod */
router.post('/timeperiod/create', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		console.log(req.body);
		var timeperiod_id=req.body.timeperiod_id;
		var restaurant_id=req.body.restaurant_id;
		var account_id=req.body.account_id;
		var start_period=req.body.start_period;
		var end_period=req.body.end_period;
		var query="INSERT INTO timeperiod (timeperiod_id,restaurant_id,account_id,start_period,end_period) VALUES (?,?,?,?,?)";
		console.log(query);
		connection.query(query,[timeperiod_id,restaurant_id,account_id,start_period,end_period],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/timeperiod/retrieve', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="SELECT timeperiod_id,restaurant_id,account_id,DATE_FORMAT(start_period, \"%Y-%m-%d\") start_period,DATE_FORMAT(end_period, \"%Y-%m-%d\") end_period FROM timeperiod WHERE timeperiod_id=?";
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.json(rows);
		});
	})
});


router.post('/timeperiod/filter', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var values=[];
		var wheresql="";
		var filter=req.body;
		if(validsqlfilter(filter)){
			console.log(req.body);
			if(filter.filters.length>0){
				wheresql=" WHERE ";
				for(var i=0;i<filter.filters.length;i++){
					wheresql+=filter.filters[i]+" ";
				}
				values=filter.values;
			}
			
			var query="SELECT timeperiod_id,restaurant_id,account_id,DATE_FORMAT(start_period, \"%Y-%m-%d\") start_period,DATE_FORMAT(end_period, \"%Y-%m-%d\") end_period FROM timeperiod "+wheresql;
			console.log(query);
			connection.query(query,values,function(err,rows,fields){
				connection.release();
				res.json(rows);
			});
		}else{
			res.json({});
		}
	})
});

router.post('/timeperiod/update', function(req, res, next) {                            ////////////////////////////////////////////////////
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		console.log(req.body);
		var timeperiod_id=req.body.timeperiod_id;
		var restaurant_id=req.body.restaurant_id;
		var account_id=req.body.account_id;
		var start_period=req.body.start_period;
		var end_period=req.body.end_period;
		var query="UPDATE timeperiod SET restaurant_id=?,account_id=?, start_period=?, end_period=? WHERE timeperiod_id=?";
		console.log(query);
		connection.query(query,[restaurant_id,account_id,start_period,end_period,timeperiod_id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/timeperiod/delete', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="DELETE FROM timeperiod WHERE timeperiod_id=?";
		
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

/* restaurant */
router.post('/restaurant/create', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var restaurant_id=req.body.restaurant_id;
		var name=req.body.name;
		var image=req.body.image;
		var location=req.body.location;
		var contact_number=req.body.contact_number;
		var longitude=req.body.longitude;
		var latitude=req.body.latitude;
		var description=req.body.description;
		var query="INSERT INTO restaurant (restaurant_id,name,image,location,contact_number,longitude,latitude,description) VALUES (?,?,?,?,?,?,?,?)";
		connection.query(query,[restaurant_id,name,image,location,contact_number,longitude,latitude,description],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/restaurant/retrieve', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="SELECT restaurant_id,name,image,location,contact_number,longitude,latitude,description FROM restaurant WHERE restaurant_id=?";
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.json(rows);
		});
	})
});

router.post('/restaurant/filter', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var values=[];
		var wheresql="";
		var filter=req.body;
		if(validsqlfilter(filter)){
			console.log(req.body);
			if(filter.filters.length>0){
				wheresql=" WHERE ";
				for(var i=0;i<filter.filters.length;i++){
					wheresql+=filter.filters[i]+" ";
				}
				values=filter.values;
			}
			
			var query="SELECT restaurant_id,name,image,location,contact_number,longitude,latitude,description FROM restaurant "+wheresql;
			console.log(query);
			connection.query(query,values,function(err,rows,fields){
				connection.release();
				res.json(rows);
			});
		}else{
			res.json({});
		}
	})
});


router.post('/restaurant/update', function(req, res, next) {           
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		console.log(req.body);
		var restaurant_id=req.body.restaurant_id;
		var name=req.body.name;
		var image=req.body.image;
		var location=req.body.location;
		var contact_number=req.body.contact_number;
		var longitude=req.body.longitude;
		var latitude=req.body.latitude;
		var description=req.body.description;
		var query="UPDATE restaurant SET  name=?, image=?,location=?,contact_number=?,longitude=?,latitude=?,description=? WHERE restaurant_id=?";
		console.log(query);
		connection.query(query,[name,image,location,contact_number,longitude,latitude,description,restaurant_id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/restaurant/delete', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="DELETE FROM restaurant WHERE restaurant_id=?";
		
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});


//rating
router.post('/rating/create', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		//alert("ok");
		var account_id=req.body.account_id;
		var rating_date=req.body.rating_date;
		var rating_value=req.body.rating_value;
		var query="INSERT INTO rating (account_id,rating_date,rating_value) VALUES (?,?,?)";
		connection.query(query,[account_id,rating_date,rating_value],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/rating/retrieve', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="SELECT account_id,DATE_FORMAT(rating_date, \"%Y-%m-%d %H:%i:%s\") rating_date,rating_value FROM rating WHERE account_id=?";
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.json(rows);
		});
	})
});

router.post('/rating/filter', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var values=[];
		var wheresql="";
		var filter=req.body;
		if(validsqlfilter(filter)){
			console.log(req.body);
			if(filter.filters.length>0){
				wheresql=" WHERE ";
				for(var i=0;i<filter.filters.length;i++){
					wheresql+=filter.filters[i]+" ";
				}
				values=filter.values;
			}
			
			var query="SELECT account_id,DATE_FORMAT(rating_date, \"%Y-%m-%d %H:%i:%s\") rating_date,rating_value FROM rating "+wheresql;
			console.log(query);
			connection.query(query,values,function(err,rows,fields){
				connection.release();
				res.json(rows);
			});
		}
		else{
			res.json({});
		}
	})
});


router.post('/rating/update', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var account_id=req.body.account_id;
		var rating_date=req.body.rating_date;
		var rating_value=req.body.rating_value;
		var query="UPDATE rating SET  rating_date=?, rating_value=? WHERE account_id=?";
		
		connection.query(query,[rating_date,rating_value,account_id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});

router.get('/rating/delete', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
		if (err){
			throw err;
			res.json({});
		}
		var id=req.query.id;
		var query="DELETE FROM rating WHERE account_id=?";
		
		connection.query(query,[id],function(err,rows,fields){
			connection.release();
			res.sendStatus(200);
		});
	})
});


module.exports = router;