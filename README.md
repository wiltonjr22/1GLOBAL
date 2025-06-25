# 1GLOBAL API

A robust device management API built with NestJS, Prisma, and PostgreSQL, following Clean Code and SOLID principles.

---

## 🛠️ Technologies

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/) (testing)
- [Swagger](https://swagger.io/) (API documentation)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-user/1GLOBAL.git
cd 1GLOBAL
```

### 2. Configure environment variables

Copy the example file and adjust as needed:

```bash
cp .env.example .env
```

Example `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/device
PORT=3000
```

> **Tip:**  
> If running locally (without Docker), use `localhost` instead of `db` in `DATABASE_URL`.

---

### 3. Run with Docker

```bash
docker-compose up --build
```

- This will start the database, run migrations, and launch the API.
- To run migrations manually:
  ```bash
  docker-compose run --rm migrate
  ```

---

### 4. Access Swagger Documentation

After starting the app, visit:

```
http://localhost:3000/swagger
```

You can interact with all API endpoints here.

---

## 🧑‍💻 Project Patterns

### Clean Code

- Small, clear, and well-named methods.
- Clear separation of concerns: Controller, Service, Repository, DTOs, and Entities.
- Comments only where necessary.

### SOLID Principles

- **S**ingle Responsibility: Each class has one responsibility.
- **O**pen/Closed: Classes are open for extension, closed for modification.
- **L**iskov Substitution: Use of abstractions for repositories and services.
- **I**nterface Segregation: Small, specific interfaces.
- **D**ependency Inversion: Depend on abstractions, not concrete implementations.

---

## 🧪 Running Tests

Run unit tests with:

```bash
npm run test
```

- Tests cover controllers and services, using mocks for external dependencies.

---

## 📂 Project Structure

```
src/
  contexts/
    device/
      application/
      commom/
      infra/
      presentation/
  resources/
    database/
    swagger/
prisma/
```

---

## 📋 Notes

- Follow the `.env.example` pattern for environment configuration.
- The project is ready for both production and development; just adjust `DATABASE_URL` as needed.
- For Clean Code and SOLID examples, check the service, repository, and controller files.

---
