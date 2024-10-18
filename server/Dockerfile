# Usando uma imagem base do Node.js
FROM node:18-alpine

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando todo o código da aplicação para o diretório de trabalho
COPY . .

# Expondo a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
