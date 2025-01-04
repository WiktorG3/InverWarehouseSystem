FROM maven:3.9.8-eclipse-temurin AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
FROM eclipse-temurin:23-jdk
WORKDIR /app
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]