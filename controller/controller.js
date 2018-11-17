const Response = require('./../model/model');

//create data controller
exports.create_data = function (req, res) {

   let response = new Response(
        {
            username: req.body.username,
            age: req.body.age
        }
    );

    response.save(function (err) {
        if (err) {
            return console.err(err);
        }
        res.json({"message":"Product Created successfully"});
    })
}; 


//get all the database stored values
exports.retrieve_all = function (req, res) {

    Response.find(function (err, response) {
        if (err) {
            return console.error(err);
        }
        res.json(response);         
    })
};


//get one stored value by ID
exports.retrieve_one = function (req, res) {

    Response.findById(req.params.id, function (err, response) {
        if (err) {
            return console.error(err);
        }
        res.json(response);         
    })
};


//update the database stored value by ID
exports.update_data = function (req, res) {
    Response.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        if (err) {
            return console.error(err);
        }
        res.json({"message":"Product udpated."});
    
    });
};


//delete database stored values by ID
exports.delete_data = function (req, res) {
    Response.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return console.error(err);
        }
        res.json({"message":"Deleted successfully!"});
    })
};
