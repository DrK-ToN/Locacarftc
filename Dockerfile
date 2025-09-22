# Estágio 1: Build da aplicação
FROM node:20-alpine AS build
WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Se você tiver um passo de build (ex: para TypeScript, React, etc.)
# RUN npm run build

# Estágio 2: Produção - Imagem final e leve
FROM node:20-alpine
WORKDIR /app

# Copia apenas as dependências de produção do estágio de build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Copia o código da aplicação (ou a pasta de build, se houver)
COPY --from=build /app/src ./src

# Expõe a porta que sua aplicação usa
EXPOSE 3000

# Comando para iniciar a aplicação
# Lembre-se que seu `index.js` está dentro da pasta `src`
CMD ["nodemon", "src/index.js"]