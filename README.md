# Dev Blog Service

This repository contains a RESTful API service designed to function similarly to [dev.to](http://dev.to). The service allows users to register, log in, create blog posts, and manage them. The service uses Node.js, Express, MongoDB, Mongoose, JWT, and other essential tools.

## Features

- **User Management**: Register new users, fetch user details by ID.
- **Authentication**: Generate JWT for user login.
- **Post Management**: Create, list, update, and delete blog posts.

## Tools & Technologies

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling tool.
- **JWT**: JSON Web Tokens for authentication.
- **bcryptjs**: Library for hashing passwords.
- **dotenv**: Module for managing environment variables.
- **http-errors**: Library for HTTP error handling.

## Installation

1. **Clone the Repository**

    ```bash
    git clone git@github.com:morwen44/blog-restful.git
    ```
  

2. **Navigate to the Project Directory**

    ```bash
    cd blog-restful
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Create a `.env` File**

    Copy `.env.example` to `.env` and fill in the required environment variables.

    ```bash
    cp .env.example .env
    ```

5. **Set Up MongoDB**

    Make sure you have MongoDB running and configured in your `.env` file.

## Running the Service

1. **Start the Server**

    ```bash
    npm start
    ```

## API Endpoints

### User Endpoints

- **POST /users/signup**
  
  Registers a new user.
  
  **Request Body**:
  ```json
  {
    "name": "string",
    "profilePic": "string",
    "email": "string",
    "password": "string"
  }
    ```  


- **GET /users/:id**

  Retrieves user information by ID.

#### Authentication Endpoints

- **POST /auth/login**

  Logs in a user and returns a JWT.

  **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

  
#### Post Endpoints

- **POST /posts** (Protected)

  Creates a new post. The post is assigned to the user making the request.

  **Request Body**:
  ```json
  {
    "title": "string",
    "image": "string",
    "body": "string"
  }
  ```

 - **GET /posts?search=example**

    Lists all posts. Supports filtering by title using a query parameter `search`.

     **Query Parameters**:
  - `search`: Search term for filtering posts by title.

- **POST /posts** (Protected)

  Creates a new post. The post is assigned to the user making the request.

  **Request Body**:
  ```json
  {
    "title": "string",
    "image": "string",
    "body": "string"
  }
  ```
- **PATCH /posts/:id** (Protected)

  Updates a post. Users cannot change the post's author.

  **Request Body**:
  ```json
  {
    "title": "string",
    "image": "string",
    "body": "string"
  }
  ```
- **DELETE /posts/:id** (Protected)

  Deletes a post. Only the owner of the post can delete it.

## Error Handling

The service uses the `http-errors` library to handle errors. Errors will be returned with appropriate HTTP status codes and messages.


