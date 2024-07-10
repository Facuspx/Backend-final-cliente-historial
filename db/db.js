/****************************************************************
 * Este proyecto se basa en la situación comercial de relacionar
 * a un Cliente con el historiar de compras   
 ****************************************************************/

/*************************
 * Crear conexión y tablas
 *************************/

// 1- IMPORTAMOS EL MODULO Mysql2
const { log, error } = require("console");
const mysql = require("mysql2");

// 2- configuración de conexión 

const connection = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"41152130",
    port: 3306
});

//3- Conectamos 
connection.connect((err)=>{
    // corroboramos si todo esta bien 
    if(err){
        console.error("Error de conexión "+err);
        return;
    }
    //si todo sale bien
    console.log("Estado de la colección: Conectada");

    //crear consulta verificando la base de datos y si no existe se la crea

    const sqlCreatedb = 'CREATE DATABASE IF NOT EXISTS cliente_historial';
    //pasamos la consulta a la db

    connection.query(sqlCreatedb, (err,results)=>{
        //Manejo de error
        if(err){
            console.error("Error de conexión "+err);
            return;
        }
        //Caso de éxito se crea la db

        console.log("Base de datos: CREADA/EXISTENTE/GARANTIZADA");
//Creamos la tabla si no existe

        connection.changeUser({database:"cliente_historial"},(err)=>{
        //Manejo de error
        if(err){
            console.error("Error de conexión "+err);
            return;
        }
//Éxito crea la consulta que crea la tabla 

        const createTableQuery = ` 
        CREATE TABLE IF NOT EXISTS cliente 
        (id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        telefono VARCHAR(255) NOT NULL
        );`;

        //Pasamos la consulta a la bd
        connection.query(createTableQuery, (err, results)=>{
            //Tratamiento del error 
            if(err){
                console.error('Error al crear la tabla:'+err);
                return;
            }
            //Éxito
            console.log("Tabla:Creada/Existente/Garantizada");

        });
/************************************************************** */
        const create2TableQuery = ` 
        CREATE TABLE IF NOT EXISTS historial 
        (id INT AUTO_INCREMENT PRIMARY KEY,
        detalle VARCHAR(255) NOT NULL,
        fecha DATE NOT NULL,

        fkCliente INT,
        foreign key(fkCliente) references cliente(id)
        
        );`;

        //Pasamos la consulta a la bd
        connection.query(create2TableQuery, (err, results)=>{
            //Tratamiento del error 
            if(err){
                console.error('Error al crear la tabla:'+err);
                return;
            }
            //Éxito
            console.log("Tabla:Creada/Existente/Garantizada");
        });

       });
     });
    });

//Exportación del modulo 

module.exports = connection;
