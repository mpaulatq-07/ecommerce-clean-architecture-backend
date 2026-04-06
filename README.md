# E-Commerce API - Clean Architecture & Multi-DB Support

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

Esta es una API RESTful de comercio electrónico robusta, desarrollada bajo los principios de **Arquitectura Limpia (Clean Architecture)** y **SOLID**. El sistema está diseñado para ser totalmente agnóstico a la persistencia, permitiendo el intercambio en caliente entre bases de datos relacionales y no relacionales.

---

## Arquitectura del Proyecto

El código está organizado en capas estrictamente desacopladas para garantizar la mantenibilidad:

* **Domain (Dominio):** Contiene las **Entidades** de negocio y las **Interfaces (Contratos)** de los DataSources y Repositorios. Es la capa más interna y no tiene dependencias de librerías externas.
* **Application (Casos de Uso):** Orquestador de la lógica de negocio, como la ejecución de compras (`ExecutePurchase`) con validación de inventario y la gestión de productos.
* **Infrastructure (Infraestructura):** Implementaciones concretas de acceso a datos. Aquí conviven los modelos de **Mongoose (MongoDB)** y **Sequelize (MySQL)**.
* **Presentation (Presentación):** Controladores de Express y definición de rutas que actúan como la interfaz de entrada a la API.

---

## Conmutación Dinámica de Base de Datos (SQL vs NoSQL)

La arquitectura permite cambiar el motor de base de datos sin alterar ni una sola línea de la lógica de negocio. Esto se logra mediante la **Inversión de Dependencias**.

### ¿Cómo realizar el cambio de persistencia?

Para alternar entre **MySQL** y **MongoDB**, solo es necesario modificar la instanciación del `DataSource` en los archivos de rutas dentro de `src/presentation/`:

#### 1. Configuración de Productos (`src/presentation/products/product.routes.ts`)
```typescript
// Opción para usar MySQL (Sequelize):
const datasource = new MysqlProductDatasourceImpl();

// Opción para usar MongoDB (Mongoose):
// const datasource = new MongoProductDatasourceImpl();

const repository = new ProductRepositoryImpl(datasource);
const controller = new ProductController(repository);

#### 2. Configuración de Compras e Inventario (`src/presentation/purchases/purchase.routes.ts`)
En esta sección se inyectan ambos datasources para asegurar que la transacción financiera y la actualización de stock ocurran en el mismo motor:

```typescript
// Configuración activa para MySQL:
const purchaseDatasource = new MysqlPurchaseDatasourceImpl();
const productDatasource = new MysqlProductDatasourceImpl();

// Configuración para conmutar a MongoDB:
// const purchaseDatasource = new MongoPurchaseDatasourceImpl();
// const productDatasource = new MongoProductDatasourceImpl();

const purchaseRepository = new PurchaseRepositoryImpl(purchaseDatasource);
const productRepository = new ProductRepositoryImpl(productDatasource);
