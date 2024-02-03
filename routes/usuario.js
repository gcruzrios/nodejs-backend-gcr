const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')

const schema = mongoose.Schema;

const schemaUsuario = new schema({
  nombre: String,
  email: String,
  telefono: String,
  password: String,
  role: String

});

const ModeloUsuario = mongoose.model("usuarios", schemaUsuario);
module.exports = router;

router.get("/ejemplo", (req, res) => {
  res.send("Saludo carga desde ruta ejemplo");
});

router.post("/agregarusuario", async (req, res) => {
  const nuevousuario = new ModeloUsuario({
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    role:req.body.role
  });

  nuevousuario.password = await bcrypt.hash(req.body.password,10);
  const token = jwt.sign({_id:nuevousuario._id},'secreto');

  //console.log(nuevousuario);
  nuevousuario
    .save()
    .then(function () {
      res.send("Usuario agregado correctamente");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Get usuarios

router.get("/obtenerusuarios", (req, res) => {
  ModeloUsuario.find()
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      res.send(err);
    });
});

//Obtener data de usuario
router.get("/obtenerusuario/:id", (req, res) => {
    
//console.log(req.params.id);

  ModeloUsuario.find({ idusuario: req.params.id })
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      res.send(err);
    });
});

//actualizar usuario
router.put("/actualizarusuario/:id", (req, res) => {
  ModeloUsuario.findOneAndUpdate(
    { idusuario: req.params.id },
    {
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
      role: req.body.role
    }
  )
    .then(function (models) {
      res.send("Usuario actualizado correctamente");
    })
    .catch(function (err) {
      res.send(err);
    });
});

//Borrar usuario
router.delete("/borrarusuario/:id", (req, res) => {
  ModeloUsuario.findOneAndDelete({ idusuario: req.params.id })
    .then(function (models) {
      res.send("Usuario eliminado correctamente");
    })
    .catch(function (err) {
      res.send(err);
    });
});
