# STAGE 1: Build
# Esta etapa compila la aplicación Angular SSR
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Instala todas las dependencias (incluidas las de desarrollo) para la compilación
RUN npm ci
COPY . .
# Ejecuta el script de build de tu package.json
RUN npm run build

# STAGE 2: Runtime
# Esta etapa prepara la imagen final para producción
FROM node:20-alpine AS runtime
WORKDIR /app
# Copia solo los archivos necesarios para ejecutar la app
COPY package*.json ./
# Instala únicamente las dependencias de producción
RUN npm ci --omit=dev

# Copia los artefactos de la compilación desde la etapa 'build'
# El nombre del proyecto es 'mi-proyecto-ssr' según tu package.json
COPY --from=build /app/dist/mi-proyecto-ssr/ ./dist/mi-proyecto-ssr

# El servidor Express en server.ts usa la variable de entorno PORT o 4000 por defecto.
# Exponemos el puerto 4000. Puedes cambiarlo en tu VPS con -p 80:4000
EXPOSE 4000

# El comando para iniciar el servidor SSR (ver script en package.json)
CMD [ "node", "dist/mi-proyecto-ssr/server/server.mjs" ]