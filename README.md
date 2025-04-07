# CSC481_T03 - Theater Ticketing System Kiosk Interface

This project is a React-based web application that provides a user-friendly interface for a theater ticketing system. It allows users to browse movies, purchase tickets, and manage their theater experience conveniently.

## Membership Info for Login :

1. membershipID: 123456
2. membershipID: 654321
3. membershipID: 987654


## Features

### User Authentication
- Users can log in to their accounts to access personalized features such as redeeming points.

### Movie Browsing
- Browse through a list of currently showing movies.
- Use the search functionality to find movies by title or keywords.

### Ticket Purchasing
- Select a movie and choose tickets based on seat availability.
- View a detailed breakdown of ticket pricing.

### Snack Purchasing
- Purchase snacks independently or bundle them with movie tickets.

### Points Redemption
- If logged in, users can redeem accumulated points to purchase tickets during the payment process.

### Ticket Refund Requests
- Request refunds for previously purchased tickets directly through the kiosk.

## Installation

To run this project locally, follow the steps below:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd app
   ```

3. Install dependencies:
   ```bash
   npm i
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Technologies Used
- **Frontend Framework**: React.js
- **Styling**: Bootstrap

## File Structure

```plaintext
/src
  /assets          # Images
  /components      # Reusable React components
  /context         # State management 
  /data            # Mock users
  /pages           # Main pages (e.g., Home, Movie Details, Snack Details, Refund)
  /services        # API services and data fetching logic
  /style           # Styling files
```

## Key Components
- **Login Page**: User authentication interface.
- **Home Page**: Displays available movies with buttons to other pages(login, purchase snacks, search for movies, refund ticket).
- **Movie Details**: Detailed view of a selected movie with ticket purchasing options.
- **Snacks Page**: Detailed view of available snacks with different purchasing options.
- **Payment Page**: Handles ticket and snack payments with an option for points redemption.
- **Refund Page**: Interface for users to request ticket refunds.

## Deployment

- **Live Site**: [https://cpsc481-t03-01.netlify.app/](https://cpsc481-t03-01.netlify.app/)

### Steps Taken to Deploy

1. Created a Netlify project to host the application.
2. Linked the GitHub repository for continuous deployment.
3. Configured build settings:
    - **Base Directory**: `app`
    - **Build Command**: `npm run build`
    - **Publish Directory**: `app/build`
4. Deployed the site and verified successful build and hosting.

