const Note = require("./../model/model");

// Create and Save a new Note
exports.create = (req, res) => {
  let note = new Note({
    username: req.body.username || "Untitled Note",
    age: req.body.age,
    deleted: req.body.deleted
  });

  // Validate bad request
  if (!req.body.age) {
    return res.status(400).json({
      message: "Age can not be empty"
    });
  }

  // Save Note in the database
  note
    .save()
    .then(data => {
      res.json({ message: "successfully posted" });
    })
    .catch(err => {
      res.status(500).json({
        message: "Some error occurred while creating the Note.",
        errMsg : err.toString()
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  //pagination ?pageNo=2&size=4
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);

  var query = {}; //empty query

  //validate pageNo
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1"
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  const user = Note.find({}, {}, query);

  //sort response of findAll in descending order according to date and "deleted:false"
  user.find({ deleted: { $ne: true } }).sort({ date: "desc" })
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res.status(500).json({
        message: "Some error occurred while retrieving notes.",
        errMsg : err.toString()
      });
    });
};

// Find a single note with a id
exports.findOne = (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      if (!note) {
        return res.status(404).json({
          message: "data not found with id " + req.params.id
        });
      }
      res.json(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "data not found with id " + req.params.id,
          errMsg : err.toString()
        });
      }
      return res.status(500).json({
        message: "Error retrieving data with id " + req.params.id,
        errMsg : err.toString()
      });
    });
};

// Update a note identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.age) {
    return res.status(400).json({
      message: "age can not be empty"
    });
  }

  // Find note and update it with the request body
  Note.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      age: req.body.age,
      deleted: req.body.deleted
    },
    { new: true }
  )
    .then(note => {
      if (!note) {
        return res.status(404).json({
          message: "data not found with id " + req.params.id
        });
      }
      res.json({ message: "successfully updated" });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "data not found with id " + req.params.id,
          errMsg : err.toString()
        });
      }
      return res.status(500).json({
        message: "Error updating note with id " + req.params.id,
        errMsg : err.toString()
      });
    });
};

// Delete a note with the specified id in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(note => {
      if (!note) {
        return res.status(404).json({
          message: "data not found with id " + req.params.id
        });
      }
      res.json({ message: "data deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).json({
          message: "data not found with id " + req.params.id,
          errMsg : err.toString()
        });
      }
      return res.status(500).json({
        message: "Could not delete note with id " + req.params.id,
        errMsg : err.toString()
      });
    });
};

//patch to update the specific value of an object
exports.patch = (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      if (req.params.id) {
        delete req.params.id;
      }

      //Patch request for making the deleted boolean -> true
      if (note.deleted == false) {
        note.deleted = true;
      } else {
        note.deleted = false;
      }

      //save
      note.save();
      res.json({ message: "Updated succesfully" });
    })
    .catch(err => {
      return res.status(500).json({
        message: "Some error occurred while editing  the data.",
        errMsg : err.toString()
      });
    });
};
