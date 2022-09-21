FROM gitpod/workspace-full-vnc:latest

RUN npm i
# for developing with ts-node
RUN npm i ts-node -g