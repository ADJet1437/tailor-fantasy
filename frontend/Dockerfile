# ---- shared dependency layer -------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- dev: Vite dev server with HMR ------------------------------------------
FROM deps AS dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ---- build: compile the static bundle ---------------------------------------
FROM deps AS build
# Vite inlines env vars at BUILD time, so the API URL must be a build arg.
ARG VITE_API_BASE_URL=http://localhost:8001
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
COPY . .
RUN npm run build

# ---- prod: nginx serving the bundle -----------------------------------------
FROM nginx:1.27-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
