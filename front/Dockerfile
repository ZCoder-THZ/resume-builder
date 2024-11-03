FROM  node:23-alpine


RUN mkdir -p /home/app

COPY . /home/app

WORKDIR /home/app

RUN npm install

EXPOSE 8000

CMD [ "npm","run","dev" ]
