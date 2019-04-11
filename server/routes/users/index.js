const express = require('express');
const router = express.Router();


router.route('/')
  .get((req, res) => {
    return new req.database.User().fetchAll()
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  .post((req, res) => {
    console.log("reqbody---------------------------------->", req.body)
    return new req.database.User(req.body).save()
      .then((user) => {
        return res.redirect('/')
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });

module.exports = router;
