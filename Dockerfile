# Utilisez une image Node.js officielle pour l'étape de construction
FROM node:19 AS build

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm ci

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application React
RUN npm run build

# Utilisez une image officielle de nginx pour l'étape de production
FROM nginx:stable-alpine

# Copiez les fichiers de construction de l'étape précédente
COPY --from=build /app/build /usr/share/nginx/html

# Copiez le fichier de configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposez le port 80 pour le serveur nginx
EXPOSE 80

# Lancez le serveur nginx
CMD ["nginx", "-g", "daemon off;"]
