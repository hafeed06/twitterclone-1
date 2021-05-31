FROM node:16-alpine3.11

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install && npm install -g truffle@5.1.59
RUN npm install -g ganache-cli

COPY . .

RUN truffle compile

CMD ["truffle", "migrate", "--network", "ropsten"]



WORKDIR /usr/src/app/src