const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

var meds = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'assets', 'data', 'meds.json')));
console.log(meds);

//var meds = [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ];

router.get('/', (req, res) => {

    var filtered = meds.filter(word => word.toLowerCase().includes(req.query.term.toLowerCase()));
    res.json(filtered);
});



module.exports = router;

