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

EXPOSE 8080

# Comando para iniciar a aplicação otimizado para os 512MB de RAM do plano gratuito do Render
ENTRYPOINT ["java", "-Xmx300m", "-Xss512k", "-XX:CICompilerCount=2", "-Dfile.encoding=UTF-8", "-XX:+UseContainerSupport", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
