# Prometheus Universal

## Coming Soon (eventually)

1. code comments
2. documentation
3. unit tests
4. test coverage reports

## About

Angular 2 Universal with Distributed Spring backend

## Requirements

1. [Java 1.8](https://www.java.com/en/)
2. [Java SE Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
3. [Maven](https://maven.apache.org/)
4. [Node.js](https://nodejs.org/en/)
5. [Prometheus Framework](https://github.com/wellingWilliam/prometheus)
6. [Prometheus Auth Server](https://github.com/wellingWilliam/prometheus-auth)
7. [Prometheus Digital Asset Management Server](https://github.com/wellingWilliam/prometheus-dam)

## Setup

1. Clone and install Prometheus Framework
  1. ```git clone git@github.com:wellingWilliam/prometheus.git```
  2. ```cd prometheus```
  3. ```mvn clean install```
2. Clone and start Prometheus Eureka Server
  1. ```git clone git@github.com:wellingWilliam/prometheus-eureka.git```
  2. ```cd prometheus-eureka```
  3. ```mvn clean spring-boot:run```
3. Clone, configure, and start Prometheus Auth Server
  1. ```git clone git@github.com:wellingWilliam/prometheus-auth.git```
  2. ```cd prometheus-auth```
  3. configure email settings - src/main/resource/application-default.properties
    ```
    prometheus.email.from: exampleFrom@gmail.com
    prometheus.email.replyTo: exampleReplyTo@gmail.com

    prometheus.email.host: smtp.gmail.com
    prometheus.email.port: 587
    prometheus.email.protocol: smtp
    prometheus.email.username: example@gmail.com
    prometheus.email.password: example
    prometheus.email.channel: starttls
    ```
  4. ```mvn clean spring-boot:run```
4. Clone and start Prometheus DAM Server
  1. ```git clone git@github.com:wellingWilliam/prometheus-dam.git```
  2. ```cd prometheus-dam```
  3. ```mvn clean spring-boot:run```
5. Clone, install, and start Prometheus Universal
  1. ```git clone git@github.com:wellingWilliam/prometheus-universal.git```
  2. ```cd prometheus-universal```
  3. ```npm run global```
  4. ```npm install```
  5. ```npm start```

## Style Guides

[Angular 2 Style Guide](https://angular.io/styleguide)
