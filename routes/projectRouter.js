/****************************************************************
 * Este proyecto se basa en la situación comercial de relacionar
 * a un Cliente con el historiar de compras   
 ****************************************************************/


/************
 * Enrutador
 ************/

// Importamos el módulo

const express = require("express");

// Instanciamos Router de express

const router = express.Router();

// 3- Importamos el módulo propio projectController controlador para la tabla cliente
const projectController = require('../controllers/projectController');

// programaremos el módulo junto a métodos GET, POST, PUT, DELETE

// Rutas
//Ruta para ver el listado completo de clientes
router.get('/cliente/list', projectController.getAllCliente);

//Ruta para la consulta de datos por id
router.get('/cliente/:id', projectController.getClienteById);

//Ruta para crear un cliente
router.post('/cliente/create', projectController.createCliente);

//Ruta para actualizar un cliente
router.put('/cliente/:id', projectController.updateCliente);

//Ruta para borrar un cliente
router.delete('/cliente/:id', projectController.deleteCliente);


/**********************************************************************
 * Rutas para tabla historial
 ********************************************************************/

// Controlador para la tabla historial
const projecthController = require('../controllers/historialController');

//Ruta para ver el listado completo de historiales
router.get('/historial/list', projecthController.getAllHisto);

//Ruta para obtener la relación cliente-historial el id es del cliente en este caso
router.get('/historial/:id', projecthController.getHistoById);

//Ruta para cargar un nuevo historial
router.post('/historial/create', projecthController.createHisto);

//Ruta para actualizar un historial
router.put('/historial/:id', projecthController.updateHisto);

//Ruta para borrar un historial
router.delete('/historial/:id', projecthController.deleteHisto);


//5- Exportamos el módulo
module.exports = router;

