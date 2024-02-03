const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const schemaEmpresa = new schema({
  nombre: String,
  email: String,
  telefono: String,
  pais: String,
  sector: String
});

const ModeloEmpresa = mongoose.model("empresa", schemaEmpresa);
module.exports = router;

router.get("/ejemplo", (req, res) => {
  res.send("Saludo carga desde ruta ejemplo");
});

router.post("/agregarempresa", async (req, res) => {
  const nuevaempresa = new ModeloEmpresa({
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    pais:req.body.pais,
    sector: req.body.sector
  });

   //console.log(nuevousuario);
  nuevaempresa
    .save()
    .then(function () {
      res.send("Empresa agregada correctamente");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Get usuarios

router.get("/obtenerempresas", (req, res) => {
  ModeloEmpresa.find()
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      res.send(err);
    });
});

//Obtener data de usuario
router.get("/obtenerempresa/:id", (req, res) => {
    
//console.log(req.params.id);

  ModeloEmpresa.find({ id: req.params.id })
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      res.send(err);
    });
});

//actualizar empresa
router.put("/actualizarempresa/:id", (req, res) => {
  ModeloEmpresa.findOneAndUpdate(
    { id: req.params.id },
    {
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
      pais:req.body.pais,
      sector: req.body.sector
    }
  )
    .then(function (models) {
      res.send("Empresa actualizada correctamente");
    })
    .catch(function (err) {
      res.send(err);
    });
});

//Borrar empresa
router.delete("/borrarempresa/:id", (req, res) => {
  ModeloEmpresa.findOneAndDelete({ id: req.params.id })
    .then(function (models) {
      res.send("Empresa eliminada correctamente");
    })
    .catch(function (err) {
      res.send(err);
    });
});
