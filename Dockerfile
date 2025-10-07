FROM node:18

# tạo app dir
WORKDIR /usr/src/app

# copy package.json trước để tận dụng cache
COPY package*.json ./

RUN npm install

# copy source
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
