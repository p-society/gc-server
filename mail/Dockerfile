FROM golang:latest
RUN mkdir /app
COPY . /app
WORKDIR /app/auth/cmd/main
RUN go build -o main
CMD [ "/app/cmd/main/main" ]