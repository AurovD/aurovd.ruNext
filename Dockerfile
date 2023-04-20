FROM --platform=linux/amd64 node:19-alpine
#FROM node:14-alpine

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
#docker run -d -p 3000:3000 -d -p 3001:3001 aurovdm/aurovd:images5
#docker run -d -p 3000:3000 -d -p 3001:3001 -v /Users/dmitry/Documents/temp/projects:/app/public/projects aurovdm/aurovd:images16
#docker run -it -d -p 3000:3000 -d -p 3001:3001 --mount source=images,target=/app/public/projects aurovdm/aurovd:images15
#docker run -d -p 3000:3000 -d -p 3001:3001 --mount type=bind,source=/Users/dmitry/Documents/temp/projects,target=/app/public/projects aurovdm/aurovd:images16
#docker run -p 3000:3000 -v /Users/dmitry/Documents/temp/projects:/app/public/projects:rw,z -u $(id -u):$(id -g) aurovdm/aurovd:images16


#docker run -d -p 3000:3000 -p 3001:3001 -v /Users/dmitry/Documents/temp/projects:/app/public/projects aurovdm/aurovd:images16

#docker run -d -p 3000:3000 -d -p 3001:3001 -v /var/www/portfolio/projects:/app/public/projects aurovdm/aurovd:1.0.12