var express = require("express");
var router = express.Router();
var responses= require("./../promises/promises");

router.post('/post', responses.create);
router.get('/get', responses.findAll);
router.get('/get/:id', responses.findOne);
router.put('/update/:id', responses.update);
router.delete('/delete/:id', responses.delete);

module.exports = router;
