FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} ws.jar
ENTRYPOINT ["java","-jar","ws.jar"]
