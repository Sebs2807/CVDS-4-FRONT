# CVDS LAB 4

## CRUD DE TAREAS FRONTEND

### Integrantes

- Santiago Díaz Rojas
- David Felipe Velásquez
- Sebastián Velásquez
- Santiago Naranjo

## 1. Creacion scaffolding.

Vamos a iniciar creando los archivos html, css y javascript que vamos a utilizar para el front del proyecto:

![alt text](images/image.png)

Ahora vamos a hacer una entry page para nuestro proyecto, con tal que luego se añada la seccion del CRUD

## 2. Creacion de pagina inicial

En primer lugar vamos a realizar un mockup de como necesitamos que luzca nuestra aplicacion:

He aqui el mockup

https://app.moqups.com/4S0JsPhCbW21CO9aDELel8PrS9E8MyfH/view/page/ad64222d5

![alt text](images/image-2.png)

Luego de hacer la estructura inicial y aplicar algunos estilos, se ve de esta forma:

![alt text](images/image-1.png)

## 3. Creacion de la logica de conexion con el server

Ya que la url es const apiUrl = 'http://localhost:8080/tasks';

Por lo que debe estar en este puerto y se utiliza en las funciones como parametro, por ejemplo para hacer el fetch:

![alt text](images/image-3.png)

## 4. Creacion de logica de CRUD

![CRUDTASKS](image-4.png)

Con estos 3 metodos mas el que creamos deberiamos tener toda la informacion necesaria del back
