FROM node:16.14.2-alpine3.14 as build-stage

LABEL maintainer="florian@alt.bzh"

RUN apk --update add tzdata \
  && cp /usr/share/zoneinfo/Europe/Paris /etc/localtime \
  && echo "Europe/Paris" > /etc/timezone \
  && apk del tzdata

COPY . ./app

WORKDIR /app

RUN npm install

FROM build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm","run","dev"]

FROM build-stage as production-build-stage


ENV NODE_ENV production

RUN npm run build

CMD ["npm", "run", "start"]