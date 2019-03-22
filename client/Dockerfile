FROM node:latest AS react-build

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY *.json /usr/src/app/
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /usr/src/app/public /usr/share/nginx/html
COPY --from=react-build /usr/src/app/dist/bundle.js /usr/share/nginx/html/dist/bundle.js
COPY --from=react-build /usr/src/app/dist/index.css /usr/share/nginx/html/public/css/index.css
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]