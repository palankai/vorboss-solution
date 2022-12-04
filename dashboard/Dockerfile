FROM node:18
EXPOSE 3000

COPY package.json /opt
COPY yarn.lock /opt
WORKDIR /opt
RUN yarn install

RUN yarn audit

COPY . /opt
RUN yarn build

CMD yarn start
