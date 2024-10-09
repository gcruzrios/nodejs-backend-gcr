const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const schemaEmpleado = new schema({
  nombre: String,
  email: String,
  telefono: String,
  empresa: String,
  id_empresa: String,
  salario: Number,
  puesto: String,
  tipo_contrato: String,
  estatus:Boolean
});

const ModeloEmpleado = mongoose.model("empleados", schemaEmpleado);
module.exports = router;

router.get("/ejemplo", (req, res) => {
  res.send("Saludo carga desde ruta ejemplo");
});

router.post("/agregarempleado", async (req, res) => {
  const nuevoempleado = new ModeloEmpleado({
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    empresa: req.body.empresa,
    id_empresa: req.body.id_empresa,
    salario: req.body.salario,
    puesto: req.body.puesto,
    tipo_contrato: req.body.tcontrato,
    estatus: true

  });


  //console.log(nuevousuario);
  nuevoempleado
    .save()
    .then(function () {
      res.send("Empleado agregado correctamente");
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Get usuarios

router.get("/obtenerempleados/:id_empresa", (req, res) => {
  const id_empresa= req.params.id_empresa;
  ModeloEmpleado.find(id_empresa)
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      res.send(err);
    });
});

//Obtener data de usuario
router.get("/obtenerempleado/:id", (req, res) => {
    
//console.log(req.params.id);

  ModeloEmpleado.find({ _id: req.params.id })
    .then(function (models) {
      res.send(models);
    })
    .catch(function (err) {
      res.send(err);
    });
});

//actualizar usuario
router.put("/actualizarempleado/:id", (req, res) => {
  ModeloEmpleado.findOneAndUpdate(
    { _id: req.params.id },
    {
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
      empresa: req.body.empresa,
      id_empresa: req.body.id_empresa,
      salario: req.body.salario,
      puesto: req.body.puesto,
      tipo_contrato: req.body.tcontrato,
      estatus: req.body.estatus,
    }
  )
    .then(function (models) {
      res.send("Empleado actualizado correctamente");
    })
    .catch(function (err) {
      res.send(err);
    });
});

//Borrar usuario
router.delete("/borrarempleado/:id", (req, res) => {
  ModeloEmpleado.findOneAndDelete({ _id: req.params.id })
    .then(function (models) {
      res.send("Empleado eliminado correctamente");
    })
    .catch(function (err) {
      res.send(err);
    });
});
