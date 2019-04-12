const express = require('express');
const router = express.Router();


router.route('/')
    //GET CURRENT DATABASE DATA//
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
    //CREATES A NEW CARD THROUGH API & POST METHOD TO DATABASE//
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
    })
    //DELETES A NEW CARD THROUGH API & DELETE METHOD TO DATABASE//
    .delete((req, res) => {
        let id = req.body.chosen
        console.log("reqbody CHOSENNNNNN ID---------------------------------->", id)
        return new req.database.Card({ id })
            .where({ id })
            .destroy()
            .then((chosen) => {
                return res.redirect('/')
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    })


module.exports = router;