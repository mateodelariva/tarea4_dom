# tarea4_dom
ejercicios básicos sobre manejo del DOM con js

# 📚 Proyectos de Clase 8 – JavaScript & DOM Colaborativo

Este repositorio centraliza las páginas individuales de cada alumno y muestra dinámicamente su trabajo usando JavaScript y la API Fetch. Cada estudiante creará su propia página, la registrará en un fichero JSON y abrirá un Pull Request para que su ejercicio aparezca en la galería.

---

## 🚀 ¿Qué aprenderás aquí?

- **DOM & Fetch API**: cargar datos desde un JSON y crear elementos en el DOM.  
- **Manipulación de estilos dinámicos**: cambiar clases, estilos inline y reaccionar a eventos.  
- **Trabajo colaborativo con GitHub**: ramas, commits frecuentes, Pull Requests y resolución de conflictos.  
- **Estructura de un proyecto real**: HTML, CSS, JS, JSON, y GitHub Pages.

---

## 📁 Estructura del proyecto


/
├── index.html          ← Página principal (galería de alumnos)
├── students.json       ← Lista de alumnos con nombre, URL y descripción
├── styles.css          ← Estilos globales y de la galería
├── script.js           ← Lógica para cargar y renderizar students.json
└── /alumnos/           ← Carpeta donde cada alumno crea su página
    └── tu-nombre.html  ← Tu ejercicio individual


## 🔧 Configuración y vista previa local

1. **Clona el repositorio**  
   ```bash
   git clone https://github.com/TU-USUARIO/css-moderno-colaborativo.git
   cd css-moderno-colaborativo
   ```
2. **Instala un servidor local** (opcional, pero recomendado para Fetch)  
   - Con Node.js:  
     ```bash
     npm install --global serve
     serve .
     ```
   - O cualquier extensión “Live Server” en VS Code.
3. **Abre** `http://localhost:5000` (u otra URL que tu servidor indique) para ver la galería.

---

## 🤝 Cómo contribuir

1. **Crea tu rama** de trabajo  
   ```bash
   git fetch
   git checkout -b clase-08-tu-nombre
   ```
2. **Añade tu página** en `/alumnos/tu-nombre.html`. Puedes copiar `alumnos/template.html` si existe.  
3. **Edita `students.json`** añadiendo al final:
   ```json
   {
     "name": "Tu Nombre",
     "url": "alumnos/tu-nombre.html",
     "avatar": "URL_DE_TU_AVATAR.jpg",   // opcional
     "description": "Breve descripción de tu ejercicio"
   }
   ```
4. **Prueba localmente**: abre `index.html` y verifica que tu tarjeta aparece correctamente.  
5. **Haz commit** con mensaje descriptivo:  
   ```bash
   git add alumnos/tu-nombre.html students.json
   git commit -m "Clase 8: agregar ejercicio de Tu Nombre"
   ```
6. **Push & Pull Request**  
   ```bash
   git push origin clase-08-tu-nombre
   ```  
   Luego en GitHub abre un **PR** contra `main`, describe brevemente tu aporte y pide revisión.

---

## 🎯 Ejercicios obligatorios

1. **Mostrar/ocultar** el título de tu página con un botón (`style.display` o `classList.toggle`).  
2. **Input color** que cambie el fondo de tu página en tiempo real.  
3. **Campo de texto** que actualice otro elemento al escribir.  

### 🔥 Desafío extra
- Añade un filtro de búsqueda en `index.html` (por nombre) usando un `<input>` y escuchadores de evento `input`.  
- Implementa una sección “Destacado” que muestre al primer alumno con un estilo distinto (usa CSS Grid y JS para moverlo).

---

## 🌐 GitHub Pages

La galería está publicada en:  
https://TU-USUARIO.github.io/css-moderno-colaborativo/

Cada vez que un PR se mergea en `main`, tu tarjeta y página individual aparecerán en la galería.

---

### 📚 Recursos de consulta

- [MDN DOM API](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model)  
- [Guía Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)  
- [JavaScript en 10 minutos (MDN)](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Introduction)  
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

¡A codificar y a disfrutar del poder del DOM y Git colaborativo! 🚀  
```