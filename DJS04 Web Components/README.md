# DJS03 Project Brief: Book Connect - Abstractions

Dive into the delightful world of "Book Connect," where literary adventures await at your fingertips! Browse, explore, and uncover your next great read from a vast, vibrant collection. Whether you're a fan of thrilling mysteries, epic fantasies, or heartwarming romances, "Book Connect" brings the magic of books directly to you. Happy reading! 

The "Book Connect" project provides an opportunity for students to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate students' understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![alt text](image.png)

## Book Library Web Application

The Book Library Web Application is a comprehensive tool designed to manage and explore a collection of books. It consists of several custom elements which I created using the Shadow DOM encapsulating the CSS and HTML and using custom elements. However, I struggled with implementing the event listeners:

# Project Documentation: Building a Book Search and Preview Application from Scratch

## Introduction

This documentation provides a comprehensive overview of the development process of a Book Search and Preview Application using JavaScript, HTML, and CSS. The project involves rendering book data, implementing search and filter functionalities, managing theme settings, and creating custom web components for enhanced user interaction. This guide will detail the creation of the necessary classes, the challenges encountered, and the implementation of styling and event listeners.

## Project Overview

The Book Search and Preview Application allows users to:
1. Browse a collection of books which are stored in the data.js file.
2. Search and filter books based on title, author, and genre.
3. Preview book details in a modal window.
4. Toggle between light and dark themes.

## Initial Setup and Data Import

The project began with setting up the development environment, including creating a project directory and initializing a Git repository. The data for books, authors, and genres were imported from a separate `data.js` file. This setup provided a structured way to manage and access the book-related data needed for rendering and functionality.Instead of creating the classes in sepeprate js files I chose to combine them into one file.

### Creating HTML Elements

To dynamically generate HTML elements, a utility function was created. This function allowed the creation of elements with specified attributes and innerHTML content. This approach ensured a consistent and reusable way to build the DOM structure required for the application and it clearly shows how this project is a continuation of work that I've already done in DJS03 where I had to implement abstraction by creating factory functions.

## Rendering Dropdown Options

To facilitate filtering, dropdown options for genres and authors were rendered dynamically. This involved creating a document fragment to hold the options and appending them to the appropriate select elements in the DOM. Handling default options and ensuring that the data for the Genres and Authors was correctly mapped to the dropdown options were crucial steps in this process.

## Rendering Book Previews

The core functionality of the application is to display book previews. A function was implemented to create preview buttons for each book. Each button contained an image, title, and author information. The previews were appended to a designated container in the DOM. This process involved slicing the book data to limit the number of books displayed per page and handling the rendering efficiently to support pagination.

## Event Listeners and User Interactions

### Search and Filter Functionality

Implementing the search and filter functionality required several event listeners. The search form submission was handled to filter the books based on the user's input. The filters included title, author, and genre. Upon form submission, the book data was filtered, and the results were rendered accordingly. This also included managing the display of a message when no matches were found and updating the state of the 'Show More' button which shows the user more books depending on how many books were left in the data.js file.

### Opening and Closing Overlays

Various overlays for search, settings, and book previews were implemented. Event listeners were added to handle the opening and closing of these overlays. For instance, clicking the search button opened the search overlay and focused on the search input. Similarly, closing buttons were added to each overlay to manage their visibility.I struggled with implementing the event handlers for these overlays at first but then I realised that I had to use the functions I had already created in DJS03.

### Handling Form Submissions

Settings and search forms required event listeners to handle form submissions. For the settings form, the event listener captured the selected theme and applied it to the document. This process involved using form data by utilizing the FormData object, extracting the necessary values, and invoking a function to change the theme by setting CSS variables.

## 'Show More' Button

 An event listener for the 'Show More' button was added to load additional books when clicked. The state of the button was updated based on the remaining number of books to be displayed. This ensured a smooth and user-friendly browsing experience.

## Custom Web Components

To enhance the modularity and reusability of the application, custom web components were created. These components encapsulated specific functionalities and styles, making the codebase cleaner and more maintainable.

### Book Preview Modal

A custom element was created to handle the book preview modal. This component was responsible for rendering the modal structure, displaying book details, and managing the modal's visibility. The component used Shadow DOM to encapsulate its styles and structure, preventing any unintended style leakage.

### Search Overlay Component

A custom search overlay component was implemented to handle the search input and display search results. This component rendered an input field, a search button, and a container for displaying results. It included methods to handle search input, perform the search, and display the results dynamically.

### Rating and Review Component

The rating and review component allowed users to view average ratings, read user reviews, and submit their own ratings and reviews. This component rendered the necessary UI elements and handled form submissions for new reviews. It provided a way to dynamically display user reviews and update the average rating based on new inputs.

### Theme Toggle Component

To manage the application theme, a custom theme toggle component was created. This component rendered a button that allowed users to switch between light and dark themes.

## Challenges and Solutions


### Event Listener Implementation

. Ensuring that event listeners were correctly attached and removed as needed was crucial to prevent unintended behaviors.I really struggled  with implementing these event listeners was a struggle until I realised that I had to use the event listeners I had already created in DJS03.


### Custom Component Development

Developing custom web components required a deep understanding of the Shadow DOM and the lifecycle methods of web components. Ensuring that components were reusable, encapsulated, and interacted correctly with the rest of the application was a complex but rewarding task which taught me about the value of temawork in Software Development.
