FROM maven:3.9.5-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM maven:3.9.5-eclipse-temurin-21
WORKDIR /app
COPY --from=build /app/target/*.jar ./app.jar
EXPOSE 3000
CMD ["java", "-jar", "app.jar"]
