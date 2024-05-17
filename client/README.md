# InstaVerse-App

## Description:
InstaVerse-App is a MERN (MongoDB, Express.js, React.js, Node.js) stack application that allows users to share stories with others. Users can register/login to the platform, create stories by filling out a form with captions, tags, and images, and interact with other users' stories by liking, editing, and deleting them.

## Steps to Run the Application:

1. Clone the Repository:
`git clone https://github.com/your-username/InstaVerse-App.git`

2. Set Up Environment Variables:
Create a .env file in the root directory and add the necessary environment variables, including MongoDB connection string, JWT secret key

3. Run the Server:
Start the backend server:
`npm start`

4. Run the Client:
Open a new terminal window/tab and navigate to the client directory, then start the React development server:

```
cd client
npm start
```

5. Access the Application:
Open your web browser and navigate to http://localhost:3000 to access the InstaVerse-App.



## How the Website Runs:

1. User Authentication:

- Users can register/login to the platform using their email address and password.

2. Creating Stories:

- After logging in, users can create stories by filling out a form that includes fields for captions, tags, and images.

3. Interacting with Stories:

- Users can like, edit, and delete their own stories.
- Users can also like stories posted by other users.

4. Viewing Stories:

- When not logged in or registered, visitors can view the stories on the homepage but cannot like, edit, or delete them.

Note: Ensure that MongoDB is running locally or that the connection string points to a MongoDB instance accessible by the application.

Feel free to reach out for any further assistance or queries regarding the InstaVerse-App.