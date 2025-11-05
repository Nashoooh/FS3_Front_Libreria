# 📚 Librería FS3 - Frontend Angular

Sistema de gestión de biblioteca desarrollado en Angular 18 con arquitectura MVVM, diseñado para trabajar con una API REST de Spring Boot.

## 🏗️ Arquitectura

### **Patrón MVVM (Model-View-ViewModel)**

- **Model** (`models/libro.ts`): Interfaces que definen la estructura de datos
- **View** (Templates HTML): Interfaz de usuario
- **ViewModel** (Componentes): Lógica de presentación y manejo del estado
- **Services** (`services/libro.service.ts`): Comunicación con la API y lógica de negocio

### **Estructura de Componentes**

```
src/app/
├── models/
│   └── libro.ts                 # Interfaz del modelo Libro
├── services/
│   └── libro.service.ts         # Servicio para API calls
├── components/
│   ├── libro-list/             # Lista de libros
│   ├── libro-form/             # Formulario crear/editar
│   └── libro-detail/           # Detalles del libro
└── app.routes.ts               # Configuración de rutas
```

## 🔧 Características

### **CRUD Completo de Libros**
- ✅ **Create**: Agregar nuevos libros
- ✅ **Read**: Listar y ver detalles de libros
- ✅ **Update**: Editar libros existentes
- ✅ **Delete**: Eliminar libros

### **Funcionalidades**
- 📱 Diseño responsive
- 🔄 Estados de carga y error
- 🎨 UI moderna y limpia
- 🛣️ Navegación por rutas
- 📝 Formularios reactivos
- 🔍 Validación de campos

## 🚀 Instalación y Uso

### **1. Prerrequisitos**
```bash
Node.js >= 18
Angular CLI >= 18
```

### **2. Instalar dependencias**
```bash
npm install
```

### **3. Configurar Backend**
Asegúrate de que tu API de Spring Boot esté ejecutándose en:
```
http://localhost:8080/api/libros
```

Si tu backend está en otra URL, modifica `src/app/services/libro.service.ts`:
```typescript
private apiUrl = 'TU_URL_AQUI/api/libros';
```

### **4. Ejecutar la aplicación**
```bash
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

## 🌐 API Endpoints Esperados

La aplicación espera que tu backend de Spring Boot exponga estos endpoints:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/libros` | Obtener todos los libros |
| GET | `/api/libros/{id}` | Obtener libro por ID |
| POST | `/api/libros` | Crear nuevo libro |
| PUT | `/api/libros/{id}` | Actualizar libro |
| DELETE | `/api/libros/{id}` | Eliminar libro |

### **Modelo de Datos**
```typescript
interface Libro {
  id?: number;
  titulo: string;
  autor: string;
  anioPublicacion: number;
  genero: string;
}
```

## 📱 Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/libros` | LibroListComponent | Lista de libros |
| `/libro-form` | LibroFormComponent | Crear nuevo libro |
| `/libro-form/:id` | LibroFormComponent | Editar libro existente |
| `/libro-detail/:id` | LibroDetailComponent | Ver detalles del libro |

## 🔧 Configuración CORS

Para que funcione correctamente con tu backend de Spring Boot, asegúrate de tener configurado CORS:

```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

---

**Desarrollado con ❤️ usando Angular 18 y TypeScript**
