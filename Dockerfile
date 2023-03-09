FROM node:14-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build
ENV PORT_FRONTEND=3000
ENV PORT_BACKEND=3001
EXPOSE ${PORT_FRONTEND}
EXPOSE ${PORT_BACKEND}
CMD sh -c "npm run start & npm run server"
#docker run -p 3000:3000 -p 3001:3001 aurovd
