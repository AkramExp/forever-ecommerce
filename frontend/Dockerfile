FROM node:18-alpine AS build

ENV  VITE_BACKEND_URL http://localhost:4000 VITE_RAZORPAY_KEY_ID "rzp_test_czxwtpu0ZlAD1I"

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]