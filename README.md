# 📰 Blog API con Rust (Axum) + Frontend en React

Este proyecto es una aplicación de blog construida con un **backend en Rust usando Axum y Diesel**, y un **frontend en React con TypeScript y React Bootstrap**. La API permite gestionar artículos y comentarios, y está preparada para producción, autenticación con JWT, pruebas de carga y buenas prácticas de estructura.

---


---

## 🔧 Tecnologías Usadas

### Backend
- **Rust** (Axum, Tokio, Diesel)
- **PostgreSQL** (vía Diesel ORM)
- **JWT & Bcrypt** para autenticación
- **dotenv**, **serde**, **anyhow**, **thiserror**

### Frontend
- **React 18** + **TypeScript**
- **React Bootstrap** para UI
- **React Router DOM** para navegación
- **Fetch API** para consumir endpoints

---

## 🚀 Funcionalidades

### 🖋️ Artículos
- Crear, editar, eliminar artículos
- Filtrar por estado (`public`, `private`, `archived`)

### 💬 Comentarios
- Crear y eliminar comentarios en un artículo
- Se actualiza en el frontend sin recargar página

### 👤 Autenticación
- Registro, login
- Protección de rutas con JWT

### 📈 Pruebas de rendimiento
Usamos [`wrk`](https://github.com/wg/wrk) para medir throughput y latencia:

```bash
wrk -t12 -c400 -d30s http://localhost:3000/api/articles
```

## 🛠️ Instalación

### Requisitos

- Rust (`>=1.75`)
- Node.js (`>=18`)
- PostgreSQL
- Diesel CLI:  
  ```bash
  cargo install diesel_cli --no-default-features --features postgres
  ```
  ```bash
  git clone https://github.com/ViCode321/API-REST-en-Axum-Rust.git
  cd blog
  ```    
  