FROM maven:3.9.5-eclipse-temurin-21
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline

EXPOSE 8080
CMD ["mvn", "spring-boot:run"]
