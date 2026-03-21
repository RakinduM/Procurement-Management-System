# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

COPY pom.xml ./pom.xml
COPY common-library/pom.xml ./common-library/pom.xml
COPY common-library/src ./common-library/src
COPY approval-service/pom.xml ./approval-service/pom.xml
COPY approval-service/src ./approval-service/src

RUN mvn -pl common-library install -DskipTests --no-transfer-progress
RUN mvn -pl approval-service package -DskipTests --no-transfer-progress

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
COPY --from=builder /app/approval-service/target/*.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "app.jar"]
