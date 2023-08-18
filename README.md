# Dynamic Profile - Full Stack CRUD Application

Dynamic Profile is a Full Stack CRUD application built using Next.js, Node.js, Express.js, and MongoDB. It allows users to create, edit, and manage their profiles and connections.

## Screen Shots

![Screenshot 2023-08-19 012824](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/7b3a3f20-37f6-4d21-8ffc-f91eaaca0e96)
![Screenshot 2023-08-19 012846](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/6128c3b3-9107-4d7f-a5f5-8ee7881bf0f0)
![Screenshot 2023-08-19 012902](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/754c9e6a-a403-4f8f-bea1-7e74e181b001)


![Screenshot 2023-08-19 012930](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/442f889b-54b9-4d62-9998-cac753fd292c)
![Screenshot 2023-08-19 012434](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/db2f9048-cf3d-490b-baad-fb62c1b28853)
![Screenshot 2023-08-19 012902](https://github.com/BhupendraShahi/dynamic-profile/assets/62903302/754c9e6a-a403-4f8f-bea1-7e74e181b001)
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
