# FlashCard Full Stack App

## Overview
A flashcard review app with Angular frontend and Spring Boot backend.

## Tech Stack
- Backend: Spring Boot, H2, Lombok
- Frontend: Angular, RxJS, HttpClient, Tailwind CSS
- 
## Environment Setup
Backend: `./mvnw spring-boot:run` (port 8080)
Frontend: `npm install && ng serve` (port 4200)

## Home Page
- Showcases the decks currently in the database, the page is loaded with 5 decks of 10 cards each from the preexisting database.
- Navigation to manage decks & cards

## Manage Decks
- Function to create new cards
- Function to edit or delete existing cards
- Confirmation screen before proceeding
- Input validation to make sure all fields are valid

## Flashcard
- Click the reveal the answer
- Navigation to previous page
- Navigation to next or previous card

