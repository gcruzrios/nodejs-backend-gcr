const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const schemaSector = new schema({
  nombre: String,
  descripcion: String
});

const ModeloSector = mongoose.model("sector", schemaSector);
module.exports = router;

router.get("/ejemplo", (req, res) => {
  res.send("Saludo carga desde ruta ejemplo");
});

router.post("/agregarsector", async (req, res) => {
  const nuevaempresa = new ModeloSector({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  });

   //console.log(nuevousuario);
  nuevaempresa
    .save()
    .then(function () {
      res.send("Sector agregado correctamente");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Get sectores

router.get("/obtenersectores", (req, res) => {
  ModeloSector.find()
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      res.send(err);
    });
});

//Obtener data de usuario
router.get("/obtenersector/:id", (req, res) => {
    
//console.log(req.params.id);

  ModeloSector.find({ _id: req.params.id })
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      res.send(err);
    });
});

//actualizar empresa
router.put("/actualizarsector/:id", (req, res) => {
  ModeloSector.findOneAndUpdate(
    { _id: req.params.id },
    {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion
    }
  )
    .then(function (models) {
      res.send("Sector actualizado correctamente");
    })
    .catch(function (err) {
      res.send(err);
    });
});

//Borrar empresa
router.delete("/borrarsector/:id", (req, res) => {
  ModeloSector.findOneAndDelete({ _id: req.params.id })
    .then(function (models) {
      res.send("Sector eliminado correctamente");
    })
    .catch(function (err) {
      res.send(err);
    });
});
