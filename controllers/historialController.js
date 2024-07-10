/****************************************************************
 * Este proyecto se basa en la situación comercial de relacionar
 * a un Cliente con el historiar de compras   
 ****************************************************************/

/*************************************************
 * Controladores para Historial
 * ********************************************** */

//1- Importamos el módulo propio db

const db = require('../db/db');

//2- Método para obtener toda la info de los historial

const getAllHisto = (req, res) => {
    // Creamos una consulta
    const sql = 'SELECT * FROM historial'; 

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

//3- Método para obtener la relación de cliente-historial
const getHistoById = (req, res) => {
     // Tomamos la solicitud y extraemos su id
     const { id } = req.params;

    // Creamos la consulta que va a estar relacionando las dos tablas mediante fk-historial y el id del cliente
    const sql = `select cliente.nombre, cliente.apellido, historial.detalle
     from cliente join historial 
     on historial.fkCliente = cliente.id WHERE cliente.id = ?`;

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

//4- Método para cargar nueva info de historial
const createHisto = (req, res) => {
    // Desestructuramos la request
   
    const { detalle, fecha, fkCliente } = req.body;
    // Creamos la consulta con marcadores de posición
    const sql = 'INSERT INTO historial (detalle, fecha, fkCliente) VALUES (?, ?, ?)';
    // Pasamos la consulta
   
    db.query(sql, [detalle, fecha, fkCliente], (err, results) => {
        //en caso de error
        if (err)  {console.log(err);
            return;
        } 
        //enviamos mensaje de exito con info del historial
        res.json({ message: 'Historial creado con éxito', historialId: results.insertId });
    });
};

//5- Método para modificar un Historial
const updateHisto = (req, res)=>{
    //desestructuramos la petición
    const { id } = req.params;
    const { detalle, fecha, fkCliente } = req.body;
    
    const sql = 'UPDATE historial SET detalle = ?, fecha = ?, fkCliente = ? WHERE id = ?';

    //pasamos consulta a base de datos
    db.query(sql,[detalle, fecha, fkCliente, id],(err,results)=>{
        //si hay error
        if(err){
            console.log(err);
            return;
        }
        //Si todo sale bien
        res.json({mensaje:"Historial actualizado"});
    });
};

//6- Método para borrar un historial
const deleteHisto =(req, res)=>{
    //desestructuramos la consulta 
    const {id}=req.params;

    //consulta sql para borrar historial 
    const sql = 'DELETE FROM historial WHERE id = ?';

    //Enviar la consulta a la base de datos
    
    db.query(sql, [id],(err, results)=>{
        //si hay error
        if(err){
            console.log(err);
            return;
        }
        //Si todo sale bien
        res.json({mensaje:"Historial borrado con éxito"});
    });
};

module.exports = {
    getAllHisto,
    getHistoById,
    createHisto,
    updateHisto,
    deleteHisto
};