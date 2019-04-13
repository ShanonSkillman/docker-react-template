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
    //DELETES A CARD THROUGH ID & DELETE METHOD TO DATABASE//
    .delete((req, res) => {
        let id = req.body.chosen
        // console.log("reqbody CHOSENNNNNN ID---------------------------------->", id)
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
    //EDITS A CARD THROUGH ID & POST METHOD TO DATABASE//
    .put((req, res) => {
        let id = parseInt(req.body.id);
        console.log('---------->id', id)
        const task = req.body.task;
        const status = req.body.status;

        return new req.database.Card({ id })
            .save({ task, status })
            .then(() => {
                return res.json({ success: true });
            })
    })
// .post((req, res) => {
//     let id = req.body.chosen
//     console.log("reqbody CHOSENNNNNN ID---------------------------------->", id)
//     return new req.database.cards({ id })
//         .where({ id })
//         .fetch()
//         .then(chosen => new req.database.cards({ id }))
//         .save({
//             task: req.body.task,
//             status: req.body.status
//         }, { patch: true })
//         .then(() => {
//             return res.redirect('/')
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
//     // json({ success: true }) })
// })

// router.route('/kanban/:id')
//     .post((req, res) => {
//         return new req.database.User().where("id", req.params.id).fetch().then(card => new req.database.User({ id: req.params.id }).save({
//             title: req.body.title,
//             author: req.body.author,
//             message: req.body.message,
//             status: req.body.status
//         }, { patch: true })
//             .then(() => { return res.json({ success: true }) }))
//     })
//EDITS A CARD/
// router.route("/:id").post((req, res) => {
//     console.log("------------------>THIS IS EDIT!!!!!");
//     console.log("----------------------->req.body", req.body);
//     return new req.database.cards({ id: req.params.id })
//         .save({ task: req.body.task, status: req.body.status }, { patch: true })
//         .then(card => {
//             console.log("this card has been EDITED!");
//             res.redirect("/");
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// })







module.exports = router;