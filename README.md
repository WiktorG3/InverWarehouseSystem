# **INVer - Warehouse System**
Spring Boot + React web application for warehouse management.

## **Overview**
This repository contains a warehouse management system, developed using a Java Spring Boot backend, a React frontend and a PostgreSQL database. 
The system is designed to manage warehouse operations, including tracking inventory, handling user authentication and generating reports. 
**IMPORTANT**: The system does not support adding new orders (Order and Order_items), these things should be handled by a connected online store. The warehouse system is responsible only for managing inventory and related operations. 
Also, in this project, I intentionally did not use external environment variables for configuration.

![image](https://github.com/user-attachments/assets/d6215c7f-3be5-45e8-b323-16eef87ffe41)

![image](https://github.com/user-attachments/assets/0711e742-a604-4374-9a74-51fdacb8e4d2)

## **Features**
* Users register with an username, email, first name, last name, password.
* Passwords are encrypted
* The user has a view of the dashbaord panel after logging in, where he has the basic data of the system.
* User can add, edit, and delete products and suppliers.
* User have access to orders, customers and reports data.
* In the settings, user can change the displayed currency in the system and update its account information.
* All data tables support pagination for easy navigation.

## Tech Stack
* **Language:** Java 23
* **Framework:** Spring Boot (v3.4.0)
* **Frontend:** React
* **Database:** PostgreSQL
* **Build Tool:** Maven
* **Containerization**: Docker & Docker Compose
  
## Installation
**1. Clone the Repo**
* ``` git clone https://github.com/WiktorG3/InverWarehouseSystem.git ```
* cd InverWarehouseSystem-main

**2. Start the application using Docker Compose**
* ``` docker-compose up --build ```<br />
* This will:
  * Start the PostgreSQL database with already added data
  * Start the Spring Boot backend
  * Start the React frontend

**3. Access the App**
* Navigate to http://localhost:3000/ you should see the login page
* Log in with the ready data: login - admin, password - admin123

**4. Stopping the App**
* To stop all containers, run:
docker-compose down


## MIT License
**Copyright (c) 2025 Wiktor Gronostaj**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
## **Author**

Wiktor Gronostaj [@WiktorG3](https://github.com/WiktorG3)

