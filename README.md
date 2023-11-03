
# Nestjs-boilerplate

Manage your APIs. Write documents, and jump to different versions.

## Features

- Hot-reload
    - Experience convenient development. No need to wait for typescript to compile the entire project after each change. [more details](https://docs.nestjs.com/recipes/hot-reload)
- Yaml configuration
    - Keep your overall app settings organized. Write insensitive values ​​in config.yaml. [more details](https://docs.nestjs.com/techniques/configuration#custom-configuration-files)
- Fallback version
    - Easily versioning your APIs. Don't worry if the previous APIs are not in the new versions, you will be automatically referred to the closest previous version that supports the said API. 
- Swagger (Easy versioning)
    - Write documentation for your APIs and easily version the documentation
- Mongoose
- Helmet
- CSRF Protection
- CORS
- Compression
- Health checker
- Zod validator
- CodeQl


## Usage

Clone the project

```bash
  git clone https://github.com/mmdzov/Nestjs-boilerplate.git
```

Go to the project directory

```bash
  cd Nestjs-boilerplate
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

Start dev server

```bash
  npm run start:dev
```

The path `/health` checks the health of ping and the response of `GET /users`, which you can access through `http://localhost:3000/health`. You can also check the health of the mongoose database in the path `/health/mongoose`: `http://localhost:3000/health/mongoose`

You can see your api documentation at `http://localhost:3000/api` and version 2 at `http://localhost:3000/api/v2/docs`.
## Structure

    src 
    ├── app.module.ts   
    ├── app.controller.ts
    ├── app.service.ts
    ├── main.ts
    ├── config
    │   ├── config.module.ts
    │   ├── config.service.ts
    │   └── configuration.ts
    ├── database
    │   ├── database.module.ts
    │   ├── database.service.ts
    │   └── mongoose.config.ts
    ├── common
    │   ├── constants
    │   ├── decorators
    │   ├── dto
    │   ├── filters
    │   ├── guards
    │   ├── interceptors
    │   ├── middlewares
    │   └── pipes
    └── modules
        └── users
            ├── users.module.ts
            ├── users.controller.ts
            ├── users.service.ts
            ├── dto
            │   └── create-user.dto.ts
            ├── entities
            │   └── get-user.entity.ts
            ├── schemas
            │   └── create-user.schema.ts
            └── interfaces
                └── user.interface.ts
