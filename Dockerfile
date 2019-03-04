FROM node:10.8.0
RUN mkdir -p /usr/src/node
WORKDIR /usr/src/node
COPY . /usr/src/node
RUN npm install --registry=https://registry.npm.taobao.org
CMD ["yarn", "dev"]