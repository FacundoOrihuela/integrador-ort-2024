# Backend API

Este proyecto es una API backend construida con Node.js y Express. La API permite gestionar clientes, administradores y profesores.

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install
```

## Ejecución

Para iniciar la aplicación en modo desarrollo, ejecuta el siguiente comando:

```bash
npm run dev
```

La aplicación se ejecutará en el puerto definido en el archivo `.env` o en el puerto 5000 por defecto.

## Endpoints de la API

### Clientes

- **Obtener todos los clientes**
    ```http
    GET /api/clients
    ```

- **Crear un nuevo cliente**
    ```http
    POST /api/clients
    Content-Type: application/json

    {
            "name": "Nombre del Cliente",
            "email": "email@cliente.com",
            "password": "contraseña"
    }
    ```

- **Actualizar un cliente**
    ```http
    PUT /api/clients/:id
    Content-Type: application/json

    {
            "name": "Nombre Actualizado",
            "email": "email.actualizado@cliente.com",
            "password": "nueva_contraseña"
    }
    ```

- **Eliminar un cliente**
    ```http
    DELETE /api/clients/:id
    ```

### Administradores

- **Obtener todos los administradores**
    ```http
    GET /api/administrators
    ```

- **Crear un nuevo administrador**
    ```http
    POST /api/administrators
    Content-Type: application/json

    {
            "name": "Nombre del Administrador",
            "email": "email@administrador.com",
            "password": "contraseña"
    }
    ```

- **Actualizar un administrador**
    ```http
    PUT /api/administrators/:id
    Content-Type: application/json

    {
            "name": "Nombre Actualizado",
            "email": "email.actualizado@administrador.com",
            "password": "nueva_contraseña"
    }
    ```

- **Eliminar un administrador**
    ```http
    DELETE /api/administrators/:id
    ```

### Profesores

- **Obtener todos los profesores**
    ```http
    GET /api/teachers
    ```

- **Crear un nuevo profesor**
    ```http
    POST /api/teachers
    Content-Type: application/json

    {
            "name": "Nombre del Profesor",
            "email": "email@profesor.com",
            "password": "contraseña",
            "specialty": "Especialidad",
            "description": "Descripción"
    }
    ```

- **Actualizar un profesor**
    ```http
    PUT /api/teachers/:id
    Content-Type: application/json

    {
            "name": "Nombre Actualizado",
            "email": "email.actualizado@profesor.com",
            "password": "nueva_contraseña",
            "specialty": "Nueva Especialidad",
            "description": "Nueva Descripción"
    }
    ```

- **Eliminar un profesor**
    ```http
    DELETE /api/teachers/:id
    ```