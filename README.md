# Next.js Teslo Shop

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

* MongoDB URL Local:

```
mogodb://localhost:27017/teslodb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

## Llenar la base de datos con información de pruebas

LLamar a:

```
  http://localhos:3000/api/seed
```
