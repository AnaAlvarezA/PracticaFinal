'use strict';

const express = require('express');
const app = express();
const contactRoute = express.Router();

const { check, validationResult } = require('express-validator');

//Reglas de validación
    
const validContact = [
  check('name', 'El nombre no puede incluir números y la longitude debes ser superior a 3')
  .isLength({ min: 3 })
  .isAlpha(),
check('surnames', 'Los apellidos no puede incluir números y la longitude debes ser superior a 3')
  .isLength({ min: 3 })
  .isAlpha(),
check('age', 'La edad debe ser un número comprendido entre 0 y 125')
  .isFloat({ min: 0, max: 125 }),
check('dni', 'El dni debe ser una cadena alfanumérica de 9 caracteres')
  .isLength({ min: 9, max: 9 })
  .isAlphanumeric(),
check('birthday', 'El cumpleaños debe escribirse en formato aaaa-mm-dd')
   .isISO8601(),
check('favouriteColour', 'El color favorito o puede incluir números y la longitude debes ser superior a 3')
  .isLength({ min: 3 })
  .isAlpha(),
check('sex', 'El sexo debe ser uno de los de esta lista: Hombre, Mujer, Otro, No especificado')
  .isIn(['Hombre', 'Mujer', 'Otro', 'No especificado']),
check('notes', 'Las notas deben tener más de 3 caracteres')
  .isLength({ min: 3 })
    ];


// Modelo
let Contact = require('../model/Contact');

// Ruta Añadir Contacto
contactRoute.route('/addContact').post((req, res, next) => {
  Contact.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Ruta Listar todos los contactos
contactRoute.route('/').get((req, res) => {
  Contact.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Ruta Listar un Contacto
contactRoute.route('/readContact/:id').get((req, res) => {
  Contact.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Ruta Modificar Contacto
contactRoute.route('/updateContact/:id').put((req, res, next) => {
  Contact.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('¡ Contacto modificado correctamente !')
    }
  })
})

// Ruta Borrar Contacto
contactRoute.route('/deleteContact/:id').delete((req, res, next) => {
  Contact.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = contactRoute;