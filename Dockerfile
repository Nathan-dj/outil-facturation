FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate

# On ajoute cette ligne pour que Next.js puisse compiler sans râler
ENV DATABASE_URL="file:./dev.db"

COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]