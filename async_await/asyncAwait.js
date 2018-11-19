const Note = require('./../model/model');

// Create and Save a new Note
exports.create = async (req, res) => {
    // Validate bad request
    if(!req.body.age) {
        return res.status(400).json({
            message: "Age can not be empty"
        });
    }

    let note = new Note({
        username: req.body.username || "Untitled Note", 
        age: req.body.age,
        deleted: req.body.deleted
    });

    
    // Save Note in the database
    try {
        const data = await note.save();
        const product = await res.json({message: "successfully posted"});
    }
    catch(err) {
        res.status(500).json({
            message: "Some error occurred while creating the Note." 
        });
    }
};

// Retrieve and return all notes from the database.
exports.findAll = async(req, res) => {

    try{

         //sort response of findAll in descending order according to date and returns only data with "deleted:false"
        const note = await Note.find({deleted: {$ne: true}}).sort({date: 'desc'});
        const product = await res.json(note);
        return product;
    }
    catch(err) {
        res.status(500).json({
            message: "Some error occurred while retrieving notes."
        });
    }
};

// Find a single note with a id
exports.findOne = async (req, res) => {

    if(!req.params.id) {
        return res.status(404).json({
            message: "data not found with id " + req.params.id
        });            
    }

    try {
        const note = await Note.findById(req.params.id);
        const product = await res.json(note);
        return product;
    }

    catch(err) {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "data not found with id "  + req.params.id
            });                
        }
        return res.status(500).json({
            message: "Error retrieving data with id "  + req.params.id
        });
    }
};


// Update a note identified by the id in the request
exports.update = async (req, res) => {

    // Validate Request
    if(!req.body.age) {
        return res.status(400).json({
            message: "age can not be empty"
        });
    }

    // Find note and update it with the request body
    try {
        const note = await Note.findById(req.params.id);
        note.username = await req.body.username;
        note.age = await req.body.age;

        if(!note) {
            return res.status(404).json({
                message: "data not found with id "  + req.params.id
            });
        }

        const data = await note.save();
        const message = await res.json({message: "successfully updated"});
    }

    catch(err) {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "data not found with id "  + req.params.id
            });                
        }
        return res.status(500).json({
            message: "Error updating note with id " +req.params.id
        });
    }
};

// Delete a note with the specified id in the request
exports.delete = async (req, res) => {

    if(!req.params.id) {
        return res.status(404).json({
            message: "data not found with id " + req.params.id
        });
    }

    try {
        const note = await Note.findByIdAndRemove(req.params.id);
        const message = await res.json({message: "data deleted successfully!"});
    }

    catch(err)  {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "data not found with id " + req.params.id
            });                
        }
        return res.status(500).json({
            message: "Could not delete note with id " + req.params.id
        });
    }
};

//update the specific value of an object
exports.patch = async (req, res) => {

    try {

        const note = await Note.findById(req.params.id);

        if (req.params.id) {
            delete req.params.id;
        }
        

        //Patch request for making the deleted boolean -> true
        if (note.deleted == false) {
            note.deleted = true;
        } 
        else {
            note.deleted = false;
        }


        //save it
        const save = await note.save();
        const respnose = await res.json({ message: "Updated succesfully" });
    }
    
    catch (err) {
        res.status(500).json({
            message: "Some error occurred while editing  the data."
        });
    }
};