# Voting Application

This is a backend application for a voting system where users can vote for candidates. It provides functionalities for user authentication, candidate management, and voting.

## Feature

- User sign up and login with Aadhar Card Number and passwords
- User can view the list of candidate
- User can vote for a candidate (only once)
- Admin can manage candidates (add, update, delete)
- Admin cannot vote

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

## Installations

1. Clone the repository:

   ```bash
   git clone https://github.com/Vivekkumar0412/Voting_Backend.git


# API Endpoints

## Authentication

### Sign Up
- `POST /signup`: Sign up a user

### Login
- `POST /login`: Login a user

## Candidate

### Get Candidate
- `GET /candidates`: Get the list of candidates

### Add Candidate
- `POST /candidates`: Add a new candidate (Admin only)

### Update Candidate
- `PUT /candidates/:id`: Update a candidate by ID (Admin only)

### Delete Candidate
- `DELETE /candidates/:id`: Delete a candidate by ID (Admin only)

## Votings

### Get Vote Counts
- `GET /candidates/vote/count`: Get the count of votes for each candidate

### Vote for Candidate
- `POST /candidates/vote/:id`: Vote for a candidate (User only)

## User Profile

### Get Profile
- `GET /users/profile`: Get user profile information

### Change Password
- `PUT /users/profile/password`: Change user password
