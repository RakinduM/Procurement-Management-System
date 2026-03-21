# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

COPY pom.xml ./pom.xml
COPY common-library/pom.xml ./common-library/pom.xml
COPY common-library/src ./common-library/src
COPY po-service/pom.xml ./po-service/pom.xml
COPY po-service/src ./po-service/src

RUN mvn -pl common-library install -DskipTests --no-transfer-progress
RUN mvn -pl po-service package -DskipTests --no-transfer-progress

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
COPY --from=builder /app/po-service/target/*.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "app.jar"]
