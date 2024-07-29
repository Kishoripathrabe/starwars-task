
# Alpha

## Introduction

Alpha is an Angular application designed to provide an engaging user experience. This project includes the use of Angular Material for UI components and follows best practices for modern web development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Visual Studio Code (VSCode)**
- **Angular CLI 15.2.11**
- **Node.js 14.21.3**
- **npm 6.14.18**

## Installation Guide

### Step 0: Install Required Software

Ensure the following software is installed on your machine:

- **Visual Studio Code**: Download and install from [VSCode Official Website](https://code.visualstudio.com/).
- **Node.js**: Download and install from [Node.js Official Website](https://nodejs.org/). Node.js installation will include npm.
- **Angular CLI**: Install Angular CLI globally using npm.
  ```bash
  npm install -g @angular/cli@15.2.11
  ```

### Step 1: Clone the Repository

Open Visual Studio Code and clone the repository using the integrated terminal or command prompt.

```bash
git clone https://github.com/Kishoripathrabe/starwars-task.git
```

### Step 2: Change Directory to Project

Navigate to the project directory.

```bash
cd starwars-task
```

### Step 3: Install Dependencies

Install the required npm packages.

```bash
npm install
```

> **Note**: If Angular Material is not installed, you can add it manually.
```bash
ng add @angular/material@15.2.9
```

### Step 4: Serve the Application

Run the Angular application locally.

```bash
ng serve
```

By default, the application will be accessible at `http://localhost:4200/`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
