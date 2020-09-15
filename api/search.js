const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//const lieky = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'assets', 'data', 'lieky.json'), 'utf16le'));
var lieky = [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ];

router.get('/', (req, res) => {

    var filtered = lieky.filter(word => word.includes(req.query.term));
    res.json(filtered);
});



module.exports = router;

