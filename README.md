# Blog Application-MERN stack(CURD Operations) 📝🌐

## Description 📝

The Blog Application built with the MERN stack (MongoDB, Express, React, and Node.js) is a web-based platform that allows users to create and publish blog posts. It is designed to provide an easy-to-use interface for authors to write and publish their articles, and for readers to discover and read content on various topics.

## Authentication 🔐

Whenever a user logs in, a _JSON WEB TOKEN(JWT)_ is created and stored in the local storage. This allows the user to remain logged in even if they navigate away from the site or close their browser. The JWT is stored for 24 hours, starting from when they create it, after which it will expire and the user will be required to log in again.

## Features 🚀

The Blog Application includes the following features:

🔒 OTP Functionality:</br>

-When a new user registers, an OTP is sent to their email address for verification.</br>
-Users need to enter the OTP to complete the email verification process.</br>
-For login authorization, a OTP is sent to the user's email, and they need to enter it to log in.</br>
</br>

🔐 User Authentication and Authorization: </br>

-User authentication and authorization using _JSON Web Token (JWT)_.</br>
-Users can create an account, log in, and remain logged in with a JWT stored in local storage.</br>
-JWT expires after 24 hours, requiring users to log in again.</br>
</br>

📝 Create and Publish Blog Posts:</br>

-Authors can create and publish blog posts.</br>
-Users can provide a post title, image, category, and description.</br>
</br>

💬 Commenting Functionality:</br>

-Users can comment on blog posts.</br>
-Comments are displayed below each post.</br>
-Users can edit and delete their own comments.</br>
-User can read comments made by other users</br>
</br>

👍 Liking Functionality:</br>

-Users can like and unlike posts by clicking on heart icon.</br>
-Like status is displayed on each post.</br>
-Total likes count is displayed on each post.</br>
</br>

✏️ Edit Posts:</br>

-Users can edit their own posts.</br>
-The editing feature allows users to update the post title, image, category, and description.</br>
</br>

🗑️ Delete Posts:</br>

-Users can delete their own posts.</br>
-The delete option removes the post permanently.</br>
</br>

📤 Share URL Button:</br>

-Users can share the URL of a post.</br>
-Clicking the share URL button allows users to copy the post URL for sharing.</br>
</br>

#### Registration and Email Verification

🔐 When a new user registers with the Blog Application using their email address, an OTP (One-Time Password) is sent to the registered email for verification.</br>

📧 If the user completes the registration process by entering the correct OTP, their email address will be verified, and their account will be successfully registered.</br>

🔄 If a user registers with an email address but does not verify it, and later attempts to register again with the same email address, the system will recognize the email and send a new OTP for verification.</br>

✅ When the user enters the correct OTP, the system will verify their email address and retain the details previously entered by the user during the initial registration attempt.</br>

#### Login and Email Verification

🔒 If a registered user tries to log in but has not yet verified their email address, they will be redirected to a "Verify Email" page instead of the OTP verification page.</br>

📧 On the "Verify Email" page, the user will be prompted to check their email inbox for a verification link or OTP.</br>

🔑 After the user verifies their email address, they will be able to proceed with the OTP verification process to authorize their login.</br>

-These additional features enhance the user registration and login processes, ensuring that users can complete the email verification step and seamlessly access their accounts. It also provides a streamlined experience for users who may have previously registered but did not complete the verification process.

📱 Responsive Design:</br>

-The application is designed to provide optimal viewing on desktop and mobile devices.</br>
-The responsive design ensures a consistent user experience across different screen sizes.</br>
</br>

## Installation 🔧

To install the Blog Application, follow these steps:

- Clone the repository to your local machine.
- Navigate to the root directory of the project in the terminal.
- Run the command npm install to install all required dependencies.
- Start the application by running the command npm start.

## Usage 📋

To use the Blog Application, follow these steps:

### Home 🏠

The home page displays all the posts made by other users. To access the posts and interact with them, users need to log in. After logging in, users can view the posts created by other users, read the content, and view the comments made by others.

Each post on the home page is displayed with a brief preview of the content. To read the full post and view all the comments, users can click on the "Read more" link. This will navigate them to the individual post page.

On the individual post page, users can read the entire post, including any images or additional content. They can also view all the comments made by other users on that post. To leave a comment, users can enter their text in the comment box and click the "post" button.

By providing this login-based access to posts, the platform ensures a personalized and interactive experience for users. They can explore the posts, engage with the content, and participate in discussions through comments.

This update allows users to fully utilize the features of the blog application while maintaining a secure and personalized environment.

### My Posts 📝

The My Posts section displays all the posts made by the user. If no posts are made, a Create Post button is displayed. Click on the button to navigate to the Create Post section.

User can also edit and delete there respective posts by clicking on edit and delete buttons available.

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
- Lottie (for `animation` in home)

## Contribution 🤝

Contributions are always welcome! If you would like to contribute to the project, please fork the repository and submit a pull request.
