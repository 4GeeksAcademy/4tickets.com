markdown
<h1 align="center">🎫 4Tickets.com</h1>

<p align="center">
  <strong>Plataforma de venta de entradas para eventos</strong><br>
  Las empresas publican sus eventos y venden entradas; los usuarios las compran y reciben su ticket con código QR directamente en la plataforma.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
</p>

---

## 📖 Descripción

**4Tickets.com** es una aplicación web full stack que conecta a **empresas organizadoras de eventos** con **usuarios** que quieren comprar entradas.

- Las **empresas** se registran, acceden a un panel de control y publican sus eventos con sus entradas disponibles.
- Los **usuarios** exploran los eventos, guardan sus favoritos y **compran las entradas con pago real mediante Stripe**.
- Tras el pago, el sistema genera automáticamente un **código QR alfanumérico** que sirve como entrada, disponible en la propia plataforma.

Proyecto final desarrollado en equipo (4 personas) durante el Bootcamp Full Stack de 4Geeks Academy.

---

## ✨ Funcionalidades

### 👤 Usuarios
- Registro e inicio de sesión con autenticación **JWT**
- Exploración de eventos y vista de detalle
- Sistema de **favoritos / seguir eventos**
- **Compra de entradas con Stripe** (pago real en modo test)
- **Ticket con código QR** generado automáticamente tras la compra
- Cuenta personal con sus entradas y datos

### 🏢 Empresas
- Registro de empresa e inicio de sesión
- **Dashboard** de gestión
- Creación y administración de sus **eventos y entradas**
- Control de **stock** de entradas disponibles

### 🌐 General
- Página de contacto
- Notificaciones en tiempo real con **React-Toastify**
- Interfaz responsive con **Bootstrap**

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React, JavaScript, React Router, Bootstrap, React-Toastify, Vite |
| **Backend** | Python, Flask, SQLAlchemy, Flask-JWT-Extended |
| **Base de datos** | PostgreSQL |
| **Pagos** | Stripe |
| **Autenticación** | JWT (JSON Web Tokens) |
| **Control de versiones** | Git & GitHub (trabajo en equipo con ramas y Pull Requests) |

---

## 👨‍💻 Mi aportación al proyecto

Como parte del equipo de 4 desarrolladores, yo (**Alberto Oliveira**) me encargué de:

- 🏢 **Registro de empresas**: formulario y lógica de alta de empresas.
- 💳 **Sistema de pagos con Stripe**: integración completa del checkout y confirmación de pago.
- 👤 **Cuenta de usuario y Dashboard**: vistas y gestión del perfil.
- 🎟️ **Generación del código QR alfanumérico**: al completarse el pago, se genera el ticket con su QR único.

---

## 🚀 Instalación y ejecución local

> Requisitos: Python 3.10, Node 20 y PostgreSQL.

### Backend
bash
pipenv install

cp .env.example .env # configura DATABASE_URL, JWT_SECRET_KEY y las claves de Stripe

pipenv run migrate

pipenv run upgrade

pipenv run start


### Frontend
bash
npm install

npm run start


La app quedará disponible en `http://localhost:3000` (frontend) y `http://localhost:3001` (API).

---

## 👥 Equipo

Proyecto desarrollado en equipo durante el Bootcamp Full Stack de **4Geeks Academy**.

- Alberto Oliveira — [GitHub](https://github.com/albertooliveira-ia)
- Jose - [GitHub](https://github.com/kwonsl)
- Alejandro García López - [GitHub](https://github.com/vlx1844)
- David - [GitHub](https://github.com/DaviidCT)

---

<p align="center">Hecho con ❤️ y mucho ☕ durante el Bootcamp de 4Geeks Academy</p>
