# DJS03 Project Brief: Book Connect - Abstractions

Dive into the delightful world of "Book Connect," where literary adventures await at your fingertips! Browse, explore, and uncover your next great read from a vast, vibrant collection. Whether you're a fan of thrilling mysteries, epic fantasies, or heartwarming romances, "Book Connect" brings the magic of books directly to you. Happy reading! 

The "Book Connect" project provides an opportunity for students to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate students' understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![alt text](image.png)

## Book Library Web Application

### Overview

The Book Library Web Application is a comprehensive tool designed to manage and explore a collection of books. It consists of several custom elements which I created using the Shadow DOM encapsulating the CSS and HTML and using custom elements.However I struggled with implementing the event listeners:

- **Book List (`<book-list>`):** This custom element renders a list of books with options for filtering and sorting.
- **Book Preview (`<book-preview>`):** Provides detailed information about a selected book, including synopsis, author, and cover image.
- **Search Form (`<search-form>`):** Allows users to search for books by title, author, or genre.
- **Settings Form (`<settings-form>`):** Enables users to customize the application theme between day and night modes.
- **Navigation Bar (`<nav-bar>`):** Facilitates navigation between different sections of the application and used to search the data as well as change the theme.

### Implementation

Each custom element is implemented as a JavaScript class extending `HTMLElement`. Utilizing the shadow DOM ensures encapsulation of styles and scripts, preventing unintended interference with other page elements.

In the `connectedCallback` method, event listeners are established to handle user interactions effectively:

- **Search Form Submission:** Upon submitting a search query, the `search-submit` event is dispatched, carrying the specified filters for book retrieval.
- **Book Preview Activation:** Clicking on a book triggers the `preview-click` event, passing the book ID for fetching detailed information.
- **Settings Change:** Adjusting the theme in the Settings Form updates the application's appearance dynamically, providing a seamless user experience.

### Struggles

**Event Handlers:** I struggled with implementing the event listenersfor the search and settings form for changing the theme toggling night and day.

**Search Functionality:** I struggled with implementing the search functionality of the search form which searches and filters the data by searching for authors or genres.

**Replicating Grid Layout:** My Bookpreview custom element does not perfectly replicate the original code.I tried modifying the CSS in the custom element.





