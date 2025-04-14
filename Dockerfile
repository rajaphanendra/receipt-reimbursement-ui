# Stage 1: Build Angular App
FROM node:20 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve with http-server
FROM node:20
WORKDIR /app
RUN npm install -g http-server
COPY --from=builder /app/dist/receipt-reimbursement-ui/browser/ ./
EXPOSE 4200
CMD ["http-server", "/app", "-p", "4200", "--fallback", "index.html"]