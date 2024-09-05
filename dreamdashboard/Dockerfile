FROM node:20.3.1
# Set to a non-root built-in user `node`
USER node
# Create app directory (with user `node`)
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
RUN  export NEXT_PUBLIC_API_DEV_BASE_URL=https://dd-dev-api.azurephygital.com
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./
RUN npm install --legacy-peer-deps
# Bundle app source code
COPY --chown=node . .
RUN npm run build
# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}
CMD [ "npm", "start" ]