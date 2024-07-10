/****************************************************************
 * Este proyecto se basa en la situación comercial de relacionar
 * a un Cliente con el historiar de compras   
 ****************************************************************/

/*******************************
** Acceso Principal al servidor
********************************/

//Importamos express 

const express = require('express');

//Inicializamos express

const app = express();

//Importamos modulo projectRouter

const projectRoutes = require('../routes/projectRouter');

//Declaramos el puerto
const PORT = 3000; 

// Uso del middleware .json que convierte el cuerpo de solicitud
// en algo accesible por js

app.use(express.json());

// Prefijo principal de las rutas y delegación de las sub-rutas
app.use('/project', projectRoutes);

//7- Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

