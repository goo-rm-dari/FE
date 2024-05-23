# Build stage
FROM krmp-d2hub-idock.9rum.cc/goorm/node:16
WORKDIR /usr/src/app
COPY ./ ./
RUN npm ci
RUN npm run build
RUN npm install -g serve
EXPOSE 5173
CMD ["serve","-s", "build"]
