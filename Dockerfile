# ============================
# STAGE 1: Build
# ============================
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos todas las dependencias (incluidas dev)
RUN npm ci

# Copiamos todo el código fuente
COPY . .

# Limpiamos builds previos por si acaso
RUN rm -rf dist .angular

# Ejecutamos build SSR (cliente + server)
RUN npm run build:ssr

# ============================
# STAGE 2: Runtime
# ============================
FROM node:20-alpine AS runtime
WORKDIR /app

# Copiamos solo las dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Copiamos los artefactos de la compilación
COPY --from=build /app/dist/mi-proyecto-ssr ./dist/mi-proyecto-ssr

# Exponemos el puerto (ajústalo si tu VPS usa otro)
EXPOSE 4000

# Comando para iniciar el servidor SSR
CMD ["node", "dist/mi-proyecto-ssr/server/server.mjs"]