var express = require('express');
var router = express.Router();
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./store'); 
var uniqid = require('uniqid');
/* GET item listing. */
router.get('/', function(req, res, next) {
  res.json({data:JSON.parse(localStorage.getItem('formData')).reverse()});
});

router.post('/save', function(req, res, next) { 
  let reqest = req.body
  reqest.uid = uniqid()
  SaveDataToLocalStorage(reqest)
  res.json({status:"success"});
  next();
});

function SaveDataToLocalStorage(data)
{
    var allData = [];
    if(localStorage.getItem('formData')){
      allData = JSON.parse(localStorage.getItem('formData')) || [];
    }
    allData.push(data);    
    localStorage.setItem('formData', JSON.stringify(allData));
}
module.exports = router;
