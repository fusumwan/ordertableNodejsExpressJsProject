var express = require('express');
var router = express.Router();
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/restaurants/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage }) 
var uploaded_images = [];


var last_page_date="";
var count=0;
var log_visit_times="";
var first_page_visited=false;
var colour_count=0;
var accept_visited=false;
/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/index.html');
});

router.post('/upload', upload.array('file', 12));
router.post('/upload2', upload.single('file'));


router.post('/upload', function (req, res, next) {
    // req.files is array of `image` files
    // req.body will contain the text fields, if there were any
    
    console.log(req.files);
    req.files.forEach(function(file2) {
        // Store names of uploaded files
        uploaded_images.push(file2.filename);
    });

    res.redirect('/restaurantManage.html');
});

router.post('/upload2', function (req, res, next) {
    // req.files is array of `image` files
    // req.body will contain the text fields, if there were any
    
    uploaded_images.push(req.file.originalname);
    
    var text=req.body.addText;
    res.send(req.file.originalname);
    
});

router.get('/imagelist', function(req, res, next) {
    // Send list of uplaoded file names
    res.json(uploaded_images);
});

module.exports = router;