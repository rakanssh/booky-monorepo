FROM maven:3.9.5-eclipse-temurin-21
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline

EXPOSE 8080
EXPOSE 5005

CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.jvmArguments=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"]
