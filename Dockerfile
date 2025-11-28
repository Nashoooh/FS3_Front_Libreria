# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Build de la aplicación Angular
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine

# Copiar archivos compilados
COPY --from=build /app/dist/fs3-libreria/browser /usr/share/nginx/html

# Copiar configuración personalizada de nginx (si tienes nginx.conf)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]