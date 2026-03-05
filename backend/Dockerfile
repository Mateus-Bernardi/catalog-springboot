# Estágio 1: Build da aplicação com Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copia o pom.xml e faz download das dependências (aproveita o cache do Docker)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o código fonte e faz o build (pulando os testes para acelerar o deploy)
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: Imagem final apenas com o JRE para rodar o app (imagem menor e mais segura)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copia o JAR do estágio de build
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta que o Spring Boot vai rodar (Render aloca a porta dinamicamente na env PORT, mas 8080 é o padrão)
EXPOSE 8080

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
