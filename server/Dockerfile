# Use a imagem oficial do Node.js como base
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia todos os arquivos da aplicação para o diretório de trabalho
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Expõe a porta que a aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
