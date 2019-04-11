const express = require('express');
const router = express.Router();


router.route('/')
    .get((req, res) => {
        return new req.database.Card().fetchAll()
            .then((cards) => {
                return res.json(cards);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    })
    .post((req, res) => {
        console.log("reqbody---------------------------------->", req.body)
        return new req.database.Card(req.body).save()
            .then((card) => {
                return res.redirect('/')
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    });

module.exports = router;