FROM node:lts

COPY    nextjs  /develop-story/nextjs/
WORKDIR /develop-story/nextjs/
RUN     yarn install && yarn build

COPY    strapi  /develop-story/strapi/
WORKDIR /develop-story/strapi/
RUN     yarn install && yarn build

WORKDIR /develop-story/

RUN apt-get update && apt-get install -y supervisor && apt-get install -y nginx

COPY    ./deployment/etc/ /etc/
COPY    ./deployment/*.sh /develop-story/
RUN     chmod +x /develop-story/*.sh

CMD     ./setup_config.sh && ./run.sh