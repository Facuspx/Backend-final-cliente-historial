/****************************************************************
 * Este proyecto se basa en la situación comercial de relacionar
 * a un Cliente con el historiar de compras   
 ****************************************************************/

/*****************************************
 * Controlador para clientes
 *****************************************/

//1- Importamos el módulo propio db

const db = require('../db/db');

//2- Método para obtener toda la info de los clientes

const getAllCliente = (req, res) => {
    // Creamos una consulta
    const sql = 'SELECT * FROM cliente'; 

   //Primer parámetro la consulta, segundo una función callback
    db.query(sql, (err, results) => {
        //si sucede algun error
        
        if (err) {console.log(err);
            return;
        } 
        //enviamos el resultado en formato json
        res.json(results);
    });
};

//3- Método para obtener la info con consultas parametrizadas sobre los clientes
const getClienteById = (req, res) => {
     // Tomamos la solicitud y extraemos su id
     const { id } = req.params;

    // Creamos la consulta con marcador de posición
    const sql = 'SELECT * FROM cliente WHERE id = ?';

    // Pasamos la consulta anterior a la db
    db.query(sql, [id], (err, results) => {
        //en caso de error
        if (err) {console.log(err);
            return;
        } 
        //enviamos en formato json
        res.json(results);
    });
};

//4- Método para cargar nueva info de clientes
const createCliente = (req, res) => {
    // Desestructuramos la request
   
    const { nombre, apellido, telefono } = req.body;
    // Creamos la consulta con marcadores de posición
    const sql = 'INSERT INTO cliente (nombre, apellido, telefono) VALUES (?, ?, ?)';
    // Pasamos la consulta
   
    db.query(sql, [nombre, apellido, telefono], (err, results) => {
        //en caso de error
        if (err)  {console.log(err);
            return;
        } 
        //enviamos mensaje de exito con info del cliente
        res.json({ message: 'Cliente creado con éxito', clienteId: results.insertId });
    });
};

//5- Método para modificar un cliente
const updateCliente = (req, res)=>{
    //desestructuramos la petición
    const { id } = req.params;
    const { nombre, apellido, telefono } = req.body;
    
    const sql = 'UPDATE cliente SET nombre = ?, apellido = ?, telefono = ? WHERE id = ?';

    //pasamos consulta a base de datos
    db.query(sql,[nombre, apellido, telefono, id],(err,results)=>{
        //si hay error
        if(err){
            console.log(err);
            return;
        }
        //Si todo sale bien
        res.json({mensaje:"Cliente actualizado"});
    });
};

//6- Método para borrar un cliente
const deleteCliente =(req, res)=>{
    //desestructuramos la consulta 
    const {id}=req.params;

    //consulta sql para borrar cliente 
    const sql = 'DELETE FROM cliente WHERE id = ?';

    //Enviar la consulta a la base de datos
    
    db.query(sql, [id],(err, results)=>{
        //si hay error
        if(err){
            console.log(err);
            return;
        }
        //Si todo sale bien
        res.json({mensaje:"Cliente borrado con éxito"});
    });

};

//7- Exportamos los módulos que serán utilizados en projectRouter.js
module.exports = {
    getAllCliente,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};


