const express = require('express');
const router = express.Router();
const Request = require('../models/request');


router.get('/', (req, res) => {   
    Request.find({}, (err, data) => {
        if (err) res.json({message: err});
        res.json(data);
    });
        
    
});

router.post('/', (req, res) => {

    const request = new Request({
        name: req.body.name,
        birthNumber: req.body.birthNumber,
        medication: req.body.medication
    });

    request.save()
    .then(_ => res.redirect('/request-sent'))
    .catch(err => res.json({message: err}));

});

router.delete('/', (req, res) => {
    console.log("delete request" + req.body.reqid);
    
    Request.deleteOne({_id: req.body.reqid}, (err) => {
        if (err) {
            es.json({message: err});
        }
        else {
            Request.find({}, (err, data) => {
                if (err) res.json({message: err});
                res.json(data);
            });
        }
    })
});


module.exports = router;