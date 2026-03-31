# NexaShopping Project Services

A modern microservices-based e-commerce platform built with Spring Boot and Spring Cloud, designed for scalability and high availability. NexaShopping provides comprehensive services for managing users, inventory items, and orders in a distributed system architecture.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Services](#services)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Build & Run](#build--run)
- [Project Structure](#project-structure)
- [Database Configuration](#database-configuration)
- [Deployment](#deployment)
- [License](#license)

## 🎯 Project Overview

NexaShopping is an enterprise-grade microservices application that separates concerns into independent, scalable services. Each service manages its own data and communicates through REST APIs, following the microservices architecture pattern for maximum flexibility and fault isolation.

**Key Features:**
- Multi-tier microservices architecture
- Service-to-service communication via REST clients
- Centralized configuration management
- Service discovery with Eureka
- Comprehensive error handling
- Data validation and aspect-oriented programming
- Cloud deployment ready (GCP)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           API Gateway / Load Balancer           │
└────────────────┬────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│  User   │ │  Item   │ │ Order   │
│Service  │ │Service  │ │Service  │
└────┬────┘ └────┬────┘ └────┬────┘
     │           │           │
     ▼           ▼           ▼
 PostgreSQL  MongoDB     MySQL
```

### Service Communication Flow

- **Order Service** → calls User Service & Item Service via REST Client
- **User Service** → manages user authentication and profiles
- **Item Service** → manages product catalog
- **Eureka Server** → service discovery and registration
- **Config Server** → centralized configuration management

## 🔧 Services

### 1. User Service
**Port:** Configurable (default: 8080)  
**Database:** PostgreSQL  
**Key Responsibilities:**
- User registration and authentication
- User profile management
- NIC normalization and validation with AOP
- User data persistence

**Key Features:**
- Aspect-oriented NIC normalization
- Validation framework integration
- Spring Data JPA for database operations
- Eureka client registration

### 2. Item Service
**Port:** Configurable (dynamic)  
**Database:** MongoDB  
**Key Responsibilities:**
- Product/item catalog management
- Item creation and updates
- Item search and retrieval
- Inventory management

**Key Features:**
- NoSQL database integration
- MapStruct DTO mapping
- Spring Data MongoDB
- Automatic ID generation
- Exception handling for duplicates and not found scenarios

### 3. Order Service
**Port:** Configurable (dynamic)  
**Database:** MySQL  
**Key Responsibilities:**
- Order processing and management
- Order history tracking
- Inter-service communication with User and Item services
- Order fulfillment orchestration

**Key Features:**
- REST client integration for service calls
- Transaction management
- Schema fixing utilities
- MapStruct DTO mapping
- Comprehensive error handling for service failures

## 💻 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Java** | Java | **25** |
| **Framework** | Spring Boot | 4.0.3 |
| **Build Tool** | Maven | 3.8.x |
| **Cloud Services** | Spring Cloud | 2025.1.0 |
| **Service Discovery** | Eureka | Latest |
| **Config Management** | Spring Cloud Config | Latest |
| **Persistence** | Spring Data JPA, MongoDB, Spring Data MongoDB | Latest |
| **Mapping** | MapStruct | 1.6.3 |
| **Utility** | Project Lombok | Latest |
| **Validation** | Spring Validation, AspectJ | Latest |
| **Monitoring** | Spring Boot Actuator | Latest |
| **Process Manager** | PM2 | Latest |
| **Databases** | PostgreSQL, MongoDB, MySQL | Latest |
| **Cloud Platform** | Google Cloud Platform (GCP) | - |

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 25** (with JAVA_HOME environment variable set)
- **Maven 3.8.0** or higher
- **Git** for version control
- **Docker** (optional, for containerization)
- **PostgreSQL** (for User Service)
- **MongoDB** (for Item Service)
- **MySQL** (for Order Service)
- **Node.js & PM2** (for production deployment)

### Environment Setup

```bash
# Verify Java installation
java -version

# Verify Maven installation
mvn -version

# Set JAVA_HOME (Windows example)
setx JAVA_HOME "C:\Program Files\Java\jdk-25"
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/orion343dream/NexaShopping-Project-Services.git
cd NexaShopping-Project-Services
```

### 2. Update Git Submodules (if applicable)

```bash
git submodule update --init --recursive
```

### 3. Configure Databases

#### PostgreSQL (User Service)
```sql
CREATE DATABASE user_service;
-- Run migration scripts as needed
```

#### MongoDB (Item Service)
```bash
# MongoDB will auto-create databases on first write
# Ensure MongoDB is running on localhost:27017
```

#### MySQL (Order Service)
```sql
CREATE DATABASE order_service;
-- Run migration scripts as needed
```

### 4. Configure Application Properties

Update configuration files in each service:

**User Service:** `user-service/src/main/resources/application-dev.yaml`
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/user_service
    username: postgres
    password: your_password
  jpa:
    hibernate:
      ddl-auto: update
```

**Item Service:** `item-service/src/main/resources/application-dev.yaml`
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/item_service
```

**Order Service:** `order-service/src/main/resources/application-dev.yaml`
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/order_service
    username: root
    password: your_password
```

## 🛠️ Build & Run

### Build All Services

```bash
# From root directory
mvn clean install -DskipTests

# Or with tests
mvn clean install
```

### Run Individual Services

#### User Service
```bash
cd user-service
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

#### Item Service
```bash
cd item-service
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

#### Order Service
```bash
cd order-service
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

### Run All Services with PM2 (Production)

```bash
npm install -g pm2

# Start all services
pm2 start ecosystem.config.js

# View logs
pm2 logs

# Stop services
pm2 stop all

# Restart services
pm2 restart all
```

## 📁 Project Structure

```
NexaShopping-Project-Services/
├── user-service/                    # User management service
│   ├── src/main/java/lk/ijse/eca/userservice/
│   │   ├── aspect/                 # AOP aspects (NIC normalization)
│   │   ├── controller/             # REST endpoints
│   │   ├── dto/                    # Data transfer objects
│   │   ├── entity/                 # JPA entities
│   │   ├── exception/              # Custom exceptions
│   │   ├── handler/                # Global exception handler
│   │   ├── mapper/                 # MapStruct mappers
│   │   ├── repository/             # Spring Data repositories
│   │   ├── service/                # Business logic
│   │   └── validation/             # Custom validators
│   ├── src/main/resources/         # Configuration files
│   └── pom.xml
│
├── item-service/                    # Item/Product service
│   ├── src/main/java/lk/ijse/eca/itemservice/
│   │   ├── controller/             # REST endpoints
│   │   ├── dto/                    # Data transfer objects
│   │   ├── entity/                 # MongoDB documents
│   │   ├── exception/              # Custom exceptions
│   │   ├── handler/                # Global exception handler
│   │   ├── mapper/                 # MapStruct mappers
│   │   ├── repository/             # Spring Data repositories
│   │   └── service/                # Business logic
│   ├── src/main/resources/         # Configuration files
│   └── pom.xml
│
├── order-service/                   # Order management service
│   ├── src/main/java/lk/ijse/eca/orderservice/
│   │   ├── client/                 # REST clients (User, Item service)
│   │   ├── config/                 # Configuration classes
│   │   ├── controller/             # REST endpoints
│   │   ├── dto/                    # Data transfer objects
│   │   ├── entity/                 # JPA entities
│   │   ├── exception/              # Custom exceptions
│   │   ├── handler/                # Global exception handler
│   │   ├── mapper/                 # MapStruct mappers
│   │   ├── repository/             # Spring Data repositories
│   │   └── service/                # Business logic
│   ├── src/main/resources/         # Configuration files
│   └── pom.xml
│
├── .github/
│   └── workflows/
│       └── gcp-deployment.yml      # GCP CI/CD pipeline
│
├── ecosystem.config.js              # PM2 process configuration
├── pom.xml                          # Root POM (multi-module)
└── README.md                        # This file
```

## 🗄️ Database Configuration

### User Service (PostgreSQL)

| Property | Value |
|----------|-------|
| Database | PostgreSQL |
| Port | 5432 |
| Driver | org.postgresql.Driver |
| ORM | Spring Data JPA |

### Item Service (MongoDB)

| Property | Value |
|----------|-------|
| Database | MongoDB |
| Port | 27017 |
| Connection | Spring Data MongoDB |
| Document Type | JSON-like documents |

### Order Service (MySQL)

| Property | Value |
|----------|-------|
| Database | MySQL |
| Port | 3306 |
| Driver | com.mysql.cj.jdbc.Driver |
| ORM | Spring Data JPA |

## 🌐 Deployment

### Google Cloud Platform (GCP) Deployment

This project is configured for deployment on GCP with:

- **Cloud SQL** for managed database services
- **Cloud SQL Auth Proxy** for secure database connections
- **Compute Engine** or **App Engine** for service hosting
- **Cloud Load Balancing** for traffic distribution

#### Deployment Files

- `.github/workflows/gcp-deployment.yml` - CI/CD pipeline configuration
- `ecosystem.config.js` - PM2 process configuration for GCP VMs

#### Deployment Steps

1. Configure GCP credentials
2. Set up Cloud SQL instances (PostgreSQL, MongoDB, MySQL)
3. Update `ecosystem.config.js` with correct GCP project details
4. Push changes to `main` branch to trigger GitHub Actions workflow
5. Verify deployment status in GitHub Actions

#### Running Cloud SQL Auth Proxy

```bash
./cloud-sql-proxy --address 0.0.0.0 \
  nexashopping-enterprise:asia-southeast1:mysql-vm?port=3306 \
  nexashopping-enterprise:asia-southeast1:postgres-vm?port=5432
```

#### Service Configuration in PM2

```javascript
// ecosystem.config.js
apps: [
  {
    name: "user-service",
    script: "java",
    args: "-Xmx256m -jar ./user-service/target/User-Service-1.0.0.jar",
    instances: 2,
    log: "./logs/user-service.log"
  },
  // ... other services
]
```

## 🔐 Security Considerations

- Store sensitive credentials in environment variables
- Use Spring Cloud Config Server for centralized secret management
- Enable HTTPS for all inter-service communication
- Implement API rate limiting and throttling
- Use Spring Security for authentication/authorization
- Validate all input data with Spring Validation framework

## 📊 Monitoring & Logging

Each service includes Spring Boot Actuator for health checks:

```bash
# Health check endpoint
curl http://localhost:8080/actuator/health

# Metrics endpoint
curl http://localhost:8080/actuator/metrics
```

Monitor logs using PM2:

```bash
pm2 logs user-service
pm2 monit
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to the repository
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

For issues, questions, or suggestions, please create an issue in the GitHub repository.

---

**Last Updated:** March 31, 2026  
**Version:** 1.0.0  
**Java Version Required:** 25
