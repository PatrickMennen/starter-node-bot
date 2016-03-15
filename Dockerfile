FROM node:4.2-onbuild
ADD package.json package.json
RUN npm install
ADD . . 
