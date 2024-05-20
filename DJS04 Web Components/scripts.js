
// Importing data and constants from data.js file
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";


/**
 * Creates an HTML element with specified attributes and innerHTML.
 *
 * @param {string} tag - The HTML tag of the element to create
 * @param {0bject.<string, string>} attributes - The attributes to set for the element
 * @param {string} innerHTML - The innerHTML content of the element.
 * @returns {HTMLElement} The created HTML element
 */
const createElement = (tag, attributes, innerHTML) => {
  const element = document.createElement(tag); // Create the specified HTML element
  // Set attributes for the element
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
  element.innerHTML = innerHTML; // Set the innerHTML of the element
  return element; // Return the created element
};

/**
 * Renders dropdown options based on provided data.
 *
 * @param {Object.<string, string>} data - The data to generate options from, where key is the value and value is the display name.
 * @param {string} selector - The CSS selector for the element to append the options to.
 * @param {string} defaultValue - The default option text to display.
 */
const renderOptions = (data, selector, defaultValue) => {
  const fragment = document.createDocumentFragment(); // Create a document fragment to hold the options

  // Create a default option with the provided defaultValue
  fragment.appendChild(createElement("option", { value: "any" }, defaultValue));

  // Create options for each entry in the data object and append them to the fragment
  Object.entries(data).forEach(([id, name]) =>
    fragment.appendChild(createElement("option", { value: id }, name))
  );

  document.querySelector(selector).appendChild(fragment); // Append the fragment to the specified selector
};

// Function to render books with preview information
const renderBooks = (matches, limit) => {
  const fragment = document.createDocumentFragment(); // Create a document fragment to hold the book previews
  // Create a preview button for each book in the matches array
  matches.slice(0, limit).forEach(({ author, id, image, title }) => {
    const element = createElement(
      "button",
      { class: "preview", "data-preview": id }, // Make sure the data-preview attribute is set to the book's ID
      `<img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>`
    );
    fragment.appendChild(element); // Append the preview button to the fragment
  });

  document.querySelector("[data-list-items]").appendChild(fragment); // Append the fragment to the list items container
};

// Initial rendering of books and dropdown options
renderBooks(books, BOOKS_PER_PAGE);
renderOptions(genres, "[data-search-genres]", "All Genres");
renderOptions(authors, "[data-search-authors]", "All Authors");

// Function to handle canceling search and settings overlays
const handleCancel = (selector) => () => {
  document.querySelector(selector).open = false; // Close the overlay
};

// Event listeners for cancel buttons
document
  .querySelector("[data-search-cancel]")
  .addEventListener("click", handleCancel("[data-search-overlay]"));
document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", handleCancel("[data-settings-overlay]"));

// Event listener to open search overlay and focus on the search input
document.querySelector("[data-header-search]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = true; // Open the search overlay
  document.querySelector("[data-search-title]").focus(); // Focus on the search input
});

// Event listener to open settings overlay
document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true; // Open the settings overlay
  });

// Event listener to close the active book preview overlay
document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false; // Close the active book preview overlay
});

// Event listener for settings form submission
document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
    const formData = new FormData(event.target); // Get form data
    const { theme } = Object.fromEntries(formData); // Extract theme from form data

    applyTheme(theme); // Apply the selected theme using the function from theme.js

    document.querySelector("[data-settings-overlay]").open = false; // Close the settings overlay
  });

let matches = books;
let page = 1;

// Event listener for search form submission
document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
    const formData = new FormData(event.target); // Get form data
    const filters = Object.fromEntries(formData); // Convert form data to object
    // Filter books based on search criteria
    matches = books.filter(
      ({ title, author, genres }) =>
        (filters.title.trim() === "" ||
          title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === "any" || author === filters.author) &&
        (filters.genre === "any" || genres.includes(filters.genre))
    );
    // Show or hide message based on search result
    document
      .querySelector("[data-list-message]")
      .classList[matches.length < 1 ? "add" : "remove"]("list__message_show");
    document.querySelector("[data-list-items]").innerHTML = ""; // Clear the list items container
    renderBooks(matches, BOOKS_PER_PAGE); // Render filtered books
    document.querySelector("[data-list-button]").disabled =
      matches.length <= BOOKS_PER_PAGE; // Disable show more button if necessary
    document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${Math.max(
      matches.length - BOOKS_PER_PAGE,
      0
    )})</span>
  `; // Update show more button text
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top of page
    document.querySelector("[data-search-overlay]").open = false; // Close the search overlay
  });

// Event listener for show more button
document.querySelector("[data-list-button]").addEventListener("click", () => {
  const fragment = document.createDocumentFragment(); // Create a document fragment to hold the new previews
  const startIndex = page * BOOKS_PER_PAGE; // Calculate start index for new previews
  const endIndex = Math.min(startIndex + BOOKS_PER_PAGE, matches.length); // Calculate end index for new previews
  // Create preview buttons for the next page of books and append them to the fragment
  matches
    .slice(startIndex, endIndex)
    .forEach(({ author, id, image, title }) => {
      const element = createElement(
        "button",
        { class: "preview", "data-preview": id },
        `<img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>`
      );
      fragment.appendChild(element);
    });
  document.querySelector("[data-list-items]").appendChild(fragment); // Append the new previews to the list items container
  page++; // Increment page number
  document.querySelector("[data-list-button]").disabled =
    matches.length <= page * BOOKS_PER_PAGE; // Disable show more button if necessary
  document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${Math.max(
      matches.length - page * BOOKS_PER_PAGE,
      0
    )})</span>
  `; // Update show more button text
});

// Event listener for clicking on book previews
document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    let node = event.target; // Get the clicked element
    // Traverse up the DOM tree until a preview button is found
    while (node && !node.dataset.preview) {
      if (!node.parentNode) {
        break; // Exit the loop if there's no parent node
      }
      node = node.parentNode;
    }

    if (node) {
      // If a preview button is found
      const book = books.find(({ id }) => id === node.dataset.preview); // Find the corresponding book object
      if (book) {
        // If the book object is found
        // Show the active book preview overlay and fill it with book details
        document.querySelector("[data-list-active]").open = true;
        document.querySelector("[data-list-blur]").src = book.image;
        document.querySelector("[data-list-image]").src = book.image;
        document.querySelector("[data-list-title]").innerText = book.title;
        document.querySelector("[data-list-subtitle]").innerText = `${
          authors[book.author]
        } (${new Date(book.published).getFullYear()})`;
        document.querySelector("[data-list-description]").innerText =
          book.description;
      }
    }
  });


/**
 * Custom element representing a modal for previewing books.
 * @module BookPreviewModalComponent
 * @extends HTMLElement
 */
class BookPreviewModalComponent extends HTMLElement {
  /**
   * Creates an instance of BookPreviewModalComponent.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Lifecycle callback invoked when the element is added to the DOM.
   * Renders the modal component and attaches event listeners.
   */
  connectedCallback() {
    this.render();
    // Add event listeners for closing the modal
    this.shadowRoot
      .querySelector("[data-close-button]")
      .addEventListener("click", this.closeModal.bind(this));
    this.shadowRoot
      .querySelector("[data-modal-overlay]")
      .addEventListener("click", this.closeModal.bind(this));
    // Prevent closing modal when clicking inside modal content
    this.shadowRoot
      .querySelector(".modal-content")
      .addEventListener("click", (event) => event.stopPropagation());
  }

  /**
   * Renders the modal component with HTML and CSS styles.
   */
  render() {
    this.shadowRoot.innerHTML = `
          <style>
            /* CSS styles for the book preview modal */
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .modal-content {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
            }
            .close-button {
              position: absolute;
              top: 10px;
              right: 10px;
              background: none;
              border: none;
              font-size: 24px;
              cursor: pointer;
            }
          </style>
          <div class="modal-overlay" data-modal-overlay>
            <div class="modal-content">
              <button class="close-button" data-close-button>&times;</button>
              <!-- Content goes here -->
            </div>
          </div>
        `;
  }

  /**
   * Closes the modal by removing it from the DOM.
   */
  closeModal() {
    this.remove(); // Remove the modal from the DOM
  }
}

// Define the custom element
customElements.define("book-preview-modal", BookPreviewModalComponent);


// SearchResultsComponent.js

/**
 * Represents a custom search overlay component with search results.
 * @class SearchOverlayComponent
 * @extends HTMLElement
 */
class SearchOverlayComponent extends HTMLElement {
  /**
   * Creates an instance of SearchOverlayComponent.
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Lifecycle method called when the component is connected to the DOM.
   * Renders the search overlay and attaches event listeners.
   * @method connectedCallback
   */
  connectedCallback() {
    this.render();
    // Add event listeners for search input and button
    this.shadowRoot
      .querySelector("[data-search-input]")
      .addEventListener("input", this.handleSearch.bind(this));
    this.shadowRoot
      .querySelector("[data-search-button]")
      .addEventListener("click", this.handleSearch.bind(this));
  }

  /**
   * Renders the search overlay component.
   * @method render
   */
  render() {
    this.shadowRoot.innerHTML = `
            <div class="search-overlay">
                <input type="text" data-search-input placeholder="Search..." />
                <button data-search-button>Search</button>
                <div class="search-results" data-search-results></div>
            </div>
            <style>
                /* CSS styles for the search overlay */
                .search-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 1rem;
                    background-color: rgba(var(--color-light), 1);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                }
                
                /* Other CSS styles omitted for brevity */
            </style>
        `;
  }

  /**
   * Handles the search action triggered by user input.
   * @method handleSearch
   */
  handleSearch() {
    const searchInput = this.shadowRoot.querySelector(
      "[data-search-input]"
    ).value;
    // Implement search functionality here
    const searchResults = this.searchBooks(searchInput);
    this.displaySearchResults(searchResults);
  }

  /**
   * Searches for books based on the provided query.
   * @method searchBooks
   * @param {string} query - The search query.
   * @returns {Array} An array of search results.
   */
  searchBooks(query) {
    // convert the query to lowercase for case insensitive search
    const lowercaseQuery = query.toLowerCase();
    // filter books based on the query
    const searchResults = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(lowercaseQuery) ||
        authors[book.author].toLowerCase().includes(lowercaseQuery)
      );
    });
    return searchResults;
  }

  /**
   * Displays the search results in the search overlay.
   * @method displaySearchResults
   * @param {Array} results - An array of search results.
   */
  displaySearchResults(results) {
    // Clear previous results
    const searchResultsContainer = this.shadowRoot.querySelector(
      "[data-search-results]"
    );
    searchResultsContainer.innerHTML = "";

    // Render search results using SearchResultsComponent
    const searchResultsComponent = document.createElement("search-results");
    searchResultsComponent.setAttribute(
      "data-results",
      JSON.stringify(results)
    );
    searchResultsContainer.appendChild(searchResultsComponent);
  }
}

// Define the custom element
customElements.define("search-overlay", SearchOverlayComponent);


/**
 * Represents a custom rating and review component.
 * @class RatingReviewComponent
 * @extends HTMLElement
 */
class RatingReviewComponent extends HTMLElement {
  /**
   * Creates an instance of RatingReviewComponent.
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Lifecycle method called when the component is connected to the DOM.
   * Renders the rating and review component and attaches event listeners.
   * @method connectedCallback
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Renders the rating and review component.
   * @method render
   */
  render() {
    // Implement rendering logic here
    this.shadowRoot.innerHTML = `
            <div class="rating-review">
                <!-- Display average rating -->
                <div class="average-rating">Average Rating: <span class="rating-value">4.5</span></div>
                
                <!-- Display user reviews -->
                <div class="user-reviews">
                    <h3>User Reviews</h3>
                    <ul class="review-list">
                        <li class="review">User 1: "Great book!"</li>
                        <li class="review">User 2: "Highly recommended!"</li>
                        <!-- Add more user reviews dynamically -->
                    </ul>
                </div>
                
                <!-- Provide options for users to submit their own ratings and reviews -->
                <div class="user-input">
                    <h3>Submit Your Rating & Review</h3>
                    <form class="review-form">
                        <label for="rating">Rating:</label>
                        <input type="number" id="rating" name="rating" min="1" max="5">
                        <br>
                        <label for="review">Review:</label>
                        <textarea id="review" name="review" rows="4" cols="50"></textarea>
                        <br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <style>
                /* CSS styles for the rating and review component */
                /* CSS styles for the rating and review component */
.rating-review {
    font-family: Arial, sans-serif;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.average-rating {
    margin-bottom: 20px;
    font-size: 18px;
}

.user-reviews {
    margin-bottom: 20px;
}

.user-reviews h3 {
    font-size: 16px;
    margin-bottom: 10px;
}

.review-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.review {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 5px;
}

.user-input h3 {
    font-size: 16px;
    margin-bottom: 10px;
}

.review-form label {
    display: block;
    margin-bottom: 5px;
}

.review-form input[type="number"],
.review-form textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.review-form button[type="submit"] {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.review-form button[type="submit"]:hover {
    background-color: #0056b3;
}

            </style>
        `;
  }
}

// Define the custom element
customElements.define("rating-review", RatingReviewComponent);


/**
 * @module Theme
 */

/**
 * Applies the selected theme to the document by setting CSS variables.
 *
 * @param {string} theme - The selected theme. It can be either 'night' or 'day'.
 */
 const applyTheme = (theme) => {
  /**
   * CSS variable for the dark theme
   * @type {string}
   * @prop {string} colorDark - The CSS variable value for the dark color in dark mode
   * @prop {string} colorLight- The CSS variable value for the light color in dark mode
   */
  const colorDark = theme === "night" ? "255, 255, 255" : "10, 10, 20";

  /**
   * CSS variable for the light theme
   * @type {string}
   * @prop {string} colorDark - The CSS variable value for the dark color in light mode
   * @prop {string} colorLight - The CSS variable value for the light color in light mode
   */
  const colorLight = theme === "night" ? "10, 10, 20" : "255, 255, 255";

  /**
   *Set the CSS variables for dark and light colors
   * */
  document.documentElement.style.setProperty("--color-dark", colorDark);
  document.documentElement.style.setProperty("--color-light", colorLight);
};

/**
 * Web component for toggling the theme between 'night' and 'day'.
 *
 * @class ThemeToggleComponent
 * @extends HTMLElement
 */
class ThemeToggleComponent extends HTMLElement {
  /**
   * Creates an instance of ThemeToggleComponent.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Lifecycle method called when the component is connected to the DOM.
   * Renders the toggle button and attaches event listeners.
   */
  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", this.toggleTheme.bind(this));
  }

  /**
   * Toggles the theme between 'night' and 'day'.
   */
  toggleTheme() {
    const currentTheme =
      document.documentElement.style.getPropertyValue("--color-dark") ===
      "255, 255, 255"
        ? "night"
        : "day";
    const newTheme = currentTheme === "night" ? "day" : "night";
    applyTheme(newTheme);
  }

  /**
   * Renders the toggle button.
   */
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 0.5rem 1rem;
          background-color: var(--color-dark);
          color: var(--color-light);
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      </style>
      <button>Toggle Theme</button>
    `;
  }
}

// Define the custom element
customElements.define("theme-toggle", ThemeToggleComponent);
