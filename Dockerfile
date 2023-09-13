FROM node:lts

WORKDIR /app

COPY /app .
RUN npm install
COPY app .

EXPOSE 80

