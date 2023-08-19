# Dynamic Profile - Full Stack CRUD Application

Dynamic Profile is a Full Stack CRUD application built using Next.js, Node.js, Express.js, and MongoDB. It allows users to create, edit, and manage their profiles and connections.
Live: https://dynamic-profile.vercel.app

## Screen Shots

# Dashboard and Profile page
![Screenshot 2023-08-19 012824](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/a32085a8-62e5-4d2c-bd19-299d580a431e)


# Connections page
![Screenshot 2023-08-19 012846](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/a398e50d-526e-40ec-be20-10551c44e82b)


# Toggle Functionality of Adding and Removing  Connection
![Screenshot 2023-08-19 012902](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/c482136f-bf18-4fcc-a8bb-49ba03c85971)

# Edit Details Modal
![Screenshot 2023-08-19 012930](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/97357379-a56c-45fe-8200-7fe4297534ea)

# Login Page
![Screenshot 2023-08-19 012434](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/8731bc09-42b4-4eae-9383-4ea23af2b140)

# SignUp Page
![Screenshot 2023-08-19 012453](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/3b1ebaaf-f2ef-445c-bd8d-b8bf2d061d48)





## Features

- **Authentication:** Secure login and sign-up functionality using JWT.
- **Dynamic Profile and Connection Pages:** View and manage user profiles and connections.
- **Image Upload:** Upload profile images to Cloudinary and store URLs in the database.
- **Edit User Data:** Edit user information using the EditModal component.
- **API Binding:** Frontend API binding for seamless communication with the backend.
- **CRUD Operations:** Backend routes and controllers for Create, Read, Update, and Delete operations.
- **Connection Management:** Add and remove connections with a toggle feature.
- **Modern Design:** Stylish UI using TailwindCSS.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB account and database set up
- Cloudinary account for image uploads

### Installation

1. Clone the repository:
   git clone [https://github.com/your-username/dynamic-profile.git
](https://github.com/BhupendraShahi/dynamic-profile.git)
2. Navigate to the project directory:
   cd dynamic-profile
   cd server -> npm install -> cd .. -> cd client -> npm install
   
4. Create .env file in the server directory and replace the values for" 
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   
6. To run locally in server run -> npm start
   in client start npm run dev

   And the application will start runnung on localhost:3000

   
## Deployment
# Backend (Render)
1. Push your code to GitHub repository.
2. Create a new Web Service on Render.
3. Link your GitHub repository and configure build settings.
4. Set environment variables in Render for MongoDB and Cloudinary.
5. Deploy the backend service on Render.

# Frontend (Vercel)
1. Push your code to GitHub repository.
2. Create a new Next.js project on Vercel.
3. Link your GitHub repository and configure build settings.
4. Set environment variables in Vercel for frontend configuration.
5. Deploy the frontend project on Vercel.

## **Do not forget to update the deployed URL of frontend and backend in the code**

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.
