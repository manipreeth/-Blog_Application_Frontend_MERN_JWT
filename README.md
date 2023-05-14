# Blog Application-MERN stack(CURD Operations) 📝🌐

## Description 📝

The Blog Application built with the MERN stack (MongoDB, Express, React, and Node.js) is a web-based platform that allows users to create and publish blog posts. It is designed to provide an easy-to-use interface for authors to write and publish their articles, and for readers to discover and read content on various topics.

## Authentication 🔐

Whenever a user logs in, a _JSON WEB TOKEN(JWT)_ is created and stored in the local storage. This allows the user to remain logged in even if they navigate away from the site or close their browser. The JWT is stored for 24 hours, starting from when they create it, after which it will expire and the user will be required to log in again.

## Features 🚀

The key features of the Blog Application are:

🔒 User authentication and authorization using _JSON WEB TOKEN(JWT)_

📝 Ability for authors to create and publish blog posts
📖 Ability for readers to view blog posts and comments made by others
💬 Commenting functionality
📱 Responsive design for optimal viewing on desktop and mobile devices

## Installation 🔧

To install the Blog Application, follow these steps:

- Clone the repository to your local machine.
- Navigate to the root directory of the project in the terminal.
- Run the command npm install to install all required dependencies.
- Create a .env file in the root directory and add the necessary environment variables.
- Start the application by running the command npm start.

## Usage 📋

To use the Blog Application, follow these steps:

### Home 🏠

The home page displays all the posts made by the user and others. Anyone can read a post and comments made by other users using the home section, even if they are not logged in. However, if a user is not logged in, they cannot make a post or leave a comment.

If the user is logged in, they can comment on a post by visiting it and typing their comment in the comment box. Once they click the Submit button, their comment will be published.

### My Posts 📝

The My Posts section displays all the posts made by the user. If no posts are made, a Create Post button is displayed. Click on the button to navigate to the Create Post section.

User can also Delete there respective posts by clicking on delete button available.

### Create Post 📝

In the Create Post section, you can create a new blog post by providing the following details:

- Post title
- Post image
- Post category
- Post description
  Once you have filled in all the details, click on the Publish button to make your post live.

## Profile 👥

The Profile section allows you to edit your username, gender, profile picture, and about information.

## Dependencies 📦

This project uses the following dependencies:

- React Icons
- Bootstrap
- TipTap (for `texteditor` in create post section)

## Contribution 🤝

Contributions are always welcome! If you would like to contribute to the project, please fork the repository and submit a pull request.
