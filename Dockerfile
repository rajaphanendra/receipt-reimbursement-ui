# Build Angular app
FROM node:20 AS build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build --prod

# Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/dist/receipt-reimbursement-ui /usr/share/nginx/html

# Optional: custom nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]