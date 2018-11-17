var express = require("express");
var router = express.Router();
var responses= require("./../controller/file");

router.post('/create', responses.create_data);
router.get('/get', responses.retrieve_all);
router.get('/get/:id', responses.retrieve_one);
router.put('/:id/update', responses.update_data);
router.delete('/:id/delete', responses.delete_data);


module.exports = router;
