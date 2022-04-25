var express = require('express');
var router = express.Router();
var page_session={
  "index": {
    "reserve_date": "",
    "person": ""
  },
  "login": "",
  "signup": "",
  "restaurant_manage": {
    "person": ""
  },
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
var account={
	"account_id":"",
	"first_name":"",
	"last_name":"",
	"email":"",
	"contact_number":"",
	"password":"",
	"user_type":""
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* User Session*/
router.post('/user_session', function(req, res, next) {
	req.session.user_session=req.body;
	console.log(req.session.user_session);
	res.sendStatus(200);
});

router.get('/user_session', function(req, res, next) {
	if(!req.session.user_session){
		req.session.user_session=account;
	}
	console.log(req.session.user_session);
	res.json(req.session.user_session);
});

/* User Page Session*/
router.post('/page_session', function(req, res, next) {
	req.session.page_session=req.body;
	console.log(req.session.page_session);
	res.sendStatus(200);
});

router.get('/page_session', function(req, res, next) {
	if(!req.session.page_session){
		req.session.page_session=page_session;
	}
	console.log(req.session.page_session);
	res.json(req.session.page_session);
});


module.exports = router;
