const express = require("express");
const Model = require("../Model/adModel");
const router = express.Router();
const cors = require('cors');


//Get all Method, with then()
router.get("/",cors(), (req, res) => {
  // //console.log(req.payload)
  try {
    Model.find().then((data) => res.json(data));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Post Method
router.post("/new",cors(), async(req, res) => {
  const data = new Model({
    user: req.body.user,
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    data.save().then((dataToSave) => res.status(200).json(dataToSave));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// //Get by ID Method
// router.get("/getOne/:id", (req, res) => {
//   try {
//     Model.findById(req.params.id)
//       .exec()
//       .then((data) => res.json(data));
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Update by ID Method
// router.patch("/update/:id", (req, res) => {
//   try {
//     // obtener el id del documento a actualizar
//     let id = req.params.id;
//     // obtener los datos a modificar
//     let data = req.body;
//     // recibir en respuesta el documento ya modificado
//     const options = { new: true };
//     Model.findByIdAndUpdate(id, data, options).then((result) =>
//       res.send(result)
//     );
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// //Delete by ID Method
// router.delete("/delete/:id", (req, res) => {
//   try {
//     let id = req.params.id;
//     Model.findByIdAndDelete(id).then((result) => {
//       let data = { ...result._doc };
//       data.deleted = true;
//       data.message = "successfully deleted!";
//       res.send(data);
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

module.exports = router;
