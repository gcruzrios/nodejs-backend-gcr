const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const schemaPais = new schema({
  nombre: String,
  continente: String
});

const ModeloPais = mongoose.model("pais", schemaPais);
module.exports = router;

router.get("/ejemplo", (req, res) => {
  res.send("Saludo carga desde ruta ejemplo");
});

router.post("/agregarpais", async (req, res) => {
  const nuevaregistro = new ModeloPais({
    nombre: req.body.nombre,
    continente: req.body.continente
  });

   //console.log(nuevousuario);
  nuevaregistro
    .save()
    .then(function () {
      res.send("Registro agregado correctamente");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Get sectores

router.get("/obtenerpaises", (req, res) => {
  ModeloPais.find()
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      res.send(err);
    });
});

//Obtener data de usuario
router.get("/obtenerpais/:id", (req, res) => {
    
//console.log(req.params.id);

  ModeloPais.find({ _id: req.params.id })
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      res.send(err);
    });
});

//actualizar empresa
router.put("/actualizarpais/:id", (req, res) => {
  ModeloPais.findOneAndUpdate(
    { _id: req.params.id },
    {
      nombre: req.body.nombre,
      continente: req.body.continente
    }
  )
    .then(function (models) {
      res.send("Registro actualizado correctamente");
    })
    .catch(function (err) {
      res.send(err);
    });
});

//Borrar empresa
router.delete("/borrarpais/:id", (req, res) => {
  ModeloPais.findOneAndDelete({ _id: req.params.id })
    .then(function (models) {
      res.send("Registro eliminado correctamente");
    })
    .catch(function (err) {
      res.send(err);
    });
});
