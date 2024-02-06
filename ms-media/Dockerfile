FROM node:14.15.0-alpine3.12

ENV TIME_ZONE=Europe/Paris

RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Europe/Paris /etc/localtime \
    && echo "Europe/Paris" > /etc/timezone \
    && apk del tzdata

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm run build


EXPOSE 3003

CMD ["npm", "run", "start:prod"]