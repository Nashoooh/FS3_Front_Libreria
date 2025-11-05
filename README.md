# 📚 Librería FS3 - Frontend Angular

Sistema de gestión de biblioteca desarrollado en Angular 18 con arquitectura MVVM, diseñado para trabajar con una API REST de Spring Boot. Incluye modal de confirmación personalizado y diseño responsive moderno.

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
│   └── libro.ts                     # Interfaz del modelo Libro
├── services/
│   ├── libro.service.ts             # Servicio para API calls
│   └── modal.service.ts             # Servicio para modal de confirmación
├── components/
│   ├── libro-list/                  # Lista de libros
│   ├── libro-form/                  # Formulario crear/editar
│   ├── libro-detail/                # Detalles del libro
│   └── confirmation-modal/          # Modal de confirmación personalizado
└── app.routes.ts                    # Configuración de rutas
```

## 🔧 Características

### **CRUD Completo de Libros**
- ✅ **Create**: Agregar nuevos libros
- ✅ **Read**: Listar y ver detalles de libros
- ✅ **Update**: Editar libros existentes
- ✅ **Delete**: Eliminar libros con confirmación

### **Funcionalidades UI/UX**
- 📱 Diseño responsive full-width
- 🔄 Estados de carga y error
- 🎨 UI moderna y limpia con gradientes
- 🛣️ Navegación por rutas
- 📝 Formularios reactivos
- 🔍 Validación de campos
- 🎯 **Modal de confirmación personalizado** para eliminaciones
- 💫 Animaciones suaves y transiciones
- 🌐 Layout sin márgenes blancos (full viewport)

### **Modal de Confirmación**
- ⚠️ Confirmación elegante antes de eliminar libros
- 🎨 Diseño personalizado con diferentes tipos (danger, warning, info)
- 🔧 Reutilizable para otras confirmaciones
- 📱 Responsive con backdrop blur
- ⌨️ Cierre por ESC y click fuera del modal

## 🚀 Instalación y Uso

### **1. Prerrequisitos**
```bash
Node.js >= 18
Angular CLI >= 18
```

### **2. Clonar e instalar**
```bash
git clone <tu-repositorio>
cd fs3-libreria
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

### **5. Build para producción**
```bash
ng build --prod
```

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
| `/libros` | LibroListComponent | Lista de libros con grid responsive |
| `/libro-form` | LibroFormComponent | Crear nuevo libro |
| `/libro-form/:id` | LibroFormComponent | Editar libro existente |
| `/libro-detail/:id` | LibroDetailComponent | Ver detalles del libro |

## 🎯 Componentes Especiales

### **Modal de Confirmación**
```typescript
// Uso del ModalService
this.modalService.openConfirmModal({
  title: 'Confirmar eliminación',
  message: '¿Estás seguro de que quieres eliminar este libro?',
  confirmText: 'Eliminar',
  cancelText: 'Cancelar',
  type: 'danger'
}).then((confirmed) => {
  if (confirmed) {
    // Proceder con la eliminación
  }
});
```

### **Tipos de Modal**
- `danger` 🔴 Para eliminaciones
- `warning` 🟡 Para advertencias  
- `info` 🔵 Para información

## 🎨 Características de Diseño

- **Full-width layout**: Sin márgenes blancos en los extremos
- **Navbar sticky**: Header fijo con gradiente
- **Grid responsive**: Se adapta automáticamente al tamaño de pantalla
- **Hover effects**: Animaciones en cards y botones
- **Color scheme**: Paleta moderna con azules y grises
- **Typography**: Sistema de fuentes nativo del sistema

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

## 🐛 Solución de Problemas Comunes

### **Error CORS**
Si ves errores de CORS, configura tu backend Spring Boot como se muestra arriba.

### **Puerto ocupado**
Si el puerto 4200 está ocupado:
```bash
ng serve --port 4201
```

### **Problemas de conexión**
Verifica que tu backend esté corriendo y que la URL sea correcta en `libro.service.ts`.

## 🚀 Despliegue

### **Docker**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/fs3-libreria /usr/share/nginx/html
EXPOSE 80
```

### **GitHub Pages / Netlify**
```bash
ng build --prod --base-href="/tu-repo/"
```

**Desarrollado con ❤️ usando Angular 18, TypeScript y mucho café ☕**
