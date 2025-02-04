FROM maven:3.9.9-eclipse-temurin-23 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:23-jdk
WORKDIR /app
COPY --from=build /app/target/inver-0.0.1-SNAPSHOT.jar inver-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","inver-0.0.1-SNAPSHOT.jar"]