# Agenda Final

Esta práctica responde a la creación de un proyecto de una Agenda de Contactos, relacionando entre si dos de las prácticas anteriores.
Se utiliza un formulario creado con Angular, para la entrada de datos, que realiza las peticiones al API hecho con Express. 
La información queda almacenada en una Base de datos MongoDB, utilizando el ORM Mongoose. 

Siguiendo las indicaciones de dicha práctica, se han realizado las validaciones pertinentes, usando "express-validator" en la API Rest, y las validacions que nos proporcionan los formularios Reactivos en Angular. Por tanto, se realizan validaciones, tanto del lado del cliente, como del servidor.
Se utiliza Angular Material, como librería de estilos.

Tenemos dos carpetas: la del cliente (Angular) y la del servidor (ApiRest)
Para hacer funcionar la aplicación, lo primero que hay que hacer es ejecutar "npm install" (en ambas carpetas), desde el Terminal, para instalar todas las dependencias. Después, ejecutaremos las aplicacines por separado en cada carpeta:
ApiRest, escribiendo en el Terminal "node app". Donde la base de datos Mongo, tiene que estar en ejecución, y
Angular, escribiendo en el Terminal "ng serve -o", dentro de la carpeta /app
De esta forma, tendremos corriendo simultáneamente la aplicación servidor en el puerto localhost:3000, y la aplicación cliente en el puerto localhost:4200.
Los 2 puertos quedarán relacionados mediante el middleware CORS, que les permitirá intercambiar recursos.

Se han probado todos los endpoints del CRUD con Postman y la aplicación Angular. Además, se han visualizado todos los cambios, mediante la aplicación "MongoDB Compass".

Los archivos utilizados se encuentran en el repositorio: https://github.com/AnaAlvarezA/PracticaFinal
