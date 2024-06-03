# Imagen Base
FROM node:latest

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
# Primero, copia solo los archivos necesarios para la instalación de npm
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Ahora copia el resto de tu proyecto
COPY . .

# Copiar el archivo .env
COPY .env ./

# Genera el cliente de prisma
RUN npm run generate
RUN npm run migrate-fix



# Crear directorio de logs si es necesario
RUN mkdir -p /app/src/logs

# Ejecutar comando
CMD ["npm", "start"]
