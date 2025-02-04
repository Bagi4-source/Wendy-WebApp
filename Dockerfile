FROM node:lts-slim
COPY ./package.json ./package.json

RUN npm i

COPY . .
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "preview"]