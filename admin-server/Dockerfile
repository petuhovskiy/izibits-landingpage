FROM golang:alpine AS builder

RUN apk add bash ca-certificates git gcc g++ libc-dev
WORKDIR /go/src/bitbucket.org/petuhovskiy/izibits-landingpage/admin-server

ENV GO111MODULE=on

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o /app .

FROM alpine:latest

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

COPY --from=builder /app ./

ENTRYPOINT ["./app"]