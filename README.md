# Barta-News-App

Barta-News-App is a decoupled application developed using **React.js** for the frontend and **Laravel (PHP)** for the backend. This guide will walk you through the process of setting up and running the application locally.

## Requirements

Before you begin, ensure you have the following installed:

- **Docker Engine** (for containerization)
- **Port 8081** should be available for the Laravel backend.
- **Port 5173** should be available for the React frontend application.
- **Port 3306** should be available for the React frontend application.

## Installation Guide

### Step 1: Clone the Repository

Clone the project repository to your local machine by running the following command:

```bash
git clone https://github.com/BigDevTemy/barta-news-app.git
```
### Step 2: Navigate into the project directory

```bash
cd barta-news-app
```

### Step3 : Run the below command to deploy the apps on your docker container

```bash
docker-compose -d --build
```
if this is successfully executed, your docker engine/docker desktop should have a container running with three apps
- ** frontend
- ** backend
- ** db
to confirm this run the below command

```bash
docker ps
```

### Ste4 : Run migration
from your root/project directory run the below command:

```bash
  docker-compose exec backend bash
```

```bash
  php artisan migrate
```
### Ste4 : Populate the database with news article data

To achieve the above run the below command
```bash
  php artisan scrape:newsarticle
```

```bash
  php artisan scrape:topheadline
```
When all this has been achieved. you are good to test.

Thanks for the Oppourtunity.







