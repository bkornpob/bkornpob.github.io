```
author: 51n5337 & #Dab
mission: CompTIA Cloud+ Certification
brief: Docker Survival Kit. Essential commands and patterns for real work.
```

---

[...back to 5-devops](../vocabs/5-devops.md)
# Docker Survival Kit: Containers Without the Confusion 📦🔥

> *"Docker isn't about virtualization. It's about **dependency management**. It's the answer to 'but it worked on my machine!'"*

This is Docker without the hype. The commands and concepts you'll actually use to build, ship, and run applications consistently.

## **The Mental Model: What Actually IS a Container?** 🧠📦

### **The Analogy: Shipping Containers vs Docker Containers**

```
SHIPPING CONTAINER:
- Standardized size and interfaces
- Can hold anything: cars, food, furniture
- Doesn't care what's inside
- Works with any ship, truck, or train

DOCKER CONTAINER:
- Standardized runtime environment  
- Can hold any application: Python, Node.js, Java
- Doesn't care about your code
- Works on any Linux machine, cloud, or laptop
```

### **The Three Pillars of Docker**

```
1. IMAGE → The blueprint (like a recipe)
2. CONTAINER → The running instance (like a cooked meal)
3. REGISTRY → The library of blueprints (like a cookbook collection)
```

---

## **The Absolute Basics: Your Daily Docker Commands** 🛠️

### **Scenario: You need to run a database for local development.**

```bash
# Download the PostgreSQL image from Docker Hub
docker pull postgres:15

# Run it as a container with custom configuration
docker run -d \
  --name dev-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -p 5432:5432 \
  postgres:15

# What this means:
# -d → run in background (detached)
# --name → give it a friendly name
# -e → set environment variables  
# -p → map host port 5432 to container port 5432
```

### **Scenario: You need to see what's running and manage containers.**

```bash
# See running containers
docker ps

# See ALL containers (including stopped ones)
docker ps -a

# Stop a running container
docker stop dev-db

# Start a stopped container  
docker start dev-db

# Remove a container (must be stopped first)
docker rm dev-db

# View container logs (great for debugging)
docker logs dev-db

# Get a shell inside a running container
docker exec -it dev-db bash
```

**The Vibe:** `docker run` creates containers. `docker ps` shows what's running. `docker logs` tells you what's happening. `docker exec` lets you go inside.

---

## **Building Your Own Images: The Dockerfile Magic** 🏗️

### **Scenario: You need to containerize the Stellar Café web app.**

```dockerfile
# Start from a base image (the foundation)
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of your application
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Command to run when container starts
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

### **Building and running your custom image:**

```bash
# Build the image (from same directory as Dockerfile)
docker build -t stellar-cafe:latest .

# Run your custom image
docker run -d -p 8000:8000 --name cafe-web stellar-cafe:latest

# Test it's working
curl http://localhost:8000
```

**The Vibe:** Dockerfile = recipe. `docker build` = cooking. `docker run` = serving.

---

## **Docker Compose: The Multi-Container Orchestra** 🎼

### **Scenario: You need the web app + database + cache running together.**

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/cafe
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=mysecretpassword
      - POSTGRES_DB=cafe
    volumes:
      - db_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine

volumes:
  db_data:
```

### **Using Docker Compose:**

```bash
# Start everything with one command
docker-compose up -d

# See all services running
docker-compose ps

# View logs from all services
docker-compose logs

# Stop everything
docker-compose down

# Stop and remove volumes too (nuclear option)
docker-compose down -v
```

**The Vibe:** Docker Compose is your conductor—it makes all the containers play together in harmony.

---

## **"Oh Crap" Scenarios: Docker First Aid** 🚑🩹

### **Scenario 1: You have too many old images eating disk space.**

```bash
# See disk usage by Docker
docker system df

# Remove all stopped containers, unused networks, and build cache
docker system prune

# Nuclear option: remove EVERYTHING (images, containers, volumes)
docker system prune -a --volumes
```

### **Scenario 2: A container is misbehaving and you need to debug.**

```bash
# Get a shell inside the container to poke around
docker exec -it container-name bash

# Or if the container doesn't have bash
docker exec -it container-name sh

# View real-time logs
docker logs -f container-name

# Inspect container configuration
docker inspect container-name
```

### **Scenario 3: You need to copy files between host and container.**

```bash
# Copy FROM container to host
docker cp container-name:/app/logs/app.log ./local-logs/

# Copy FROM host to container  
docker cp ./config.yaml container-name:/app/config/
```

### **Scenario 4: You want to see what's happening in your containers.**

```bash
# See resource usage (like top/htop for containers)
docker stats

# See real-time events (container starts, stops, etc.)
docker events
```

---

## **The Stellar Café Docker Flow: Real World Example** ☕🐳

### **Development Environment Setup**

```bash
# Clone the repo
git clone https://github.com/stellar-cafe/app.git
cd app

# Start everything with one command
docker-compose up -d

# Now you have:
# - Web app running on http://localhost:8000
# - PostgreSQL database ready
# - Redis cache running
# All isolated, all consistent
```

### **Production Build Process**

```bash
# Build optimized production image
docker build -t stellar-cafe:prod -f Dockerfile.prod .

# Push to container registry
docker tag stellar-cafe:prod registry.company.com/cafe:latest
docker push registry.company.com/cafe:latest

# Deploy to production server
docker pull registry.company.com/cafe:latest
docker run -d -p 80:8000 --name cafe-prod registry.company.com/cafe:latest
```

---

## **#Dab's Docker Wisdom** 🌿💭

> "Docker's real power isn't in running one container—it's in running **systems** of containers that work together predictably."

> "A good Dockerfile is like a good recipe: specific about ingredients, clear about steps, and reproducible every single time."

> "Remember: containers are ephemeral. If your data matters, it lives in volumes or external databases. If your configuration matters, it comes from environment variables. The container itself should be disposable."

> "When Docker gets confusing, go back to basics: image → container → registry. Everything else is just details."

**This completes your Docker survival training.** You're now ready to containerize applications with confidence and understand what's actually happening under the hood.

**Back to building the DevOps pipeline?** ⚙️🔁
[Yes, take me back to 5-DevOps](../vocabs/5-devops.md)
