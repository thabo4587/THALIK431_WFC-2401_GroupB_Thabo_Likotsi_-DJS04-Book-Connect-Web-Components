// scripts.js
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

class BookPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
            .preview {
                border-width: 0;
                width: 100%;
                font-family: Roboto, sans-serif;
                padding: 0.5rem 1rem;
                display: flex;
                align-items: center;
                cursor: pointer;
                text-align: left;
                border-radius: 8px;
                border: 1px solid rgba(var(--color-dark), 0.15);
                background: rgba(var(--color-light), 1);
              }
              .preview_hidden {
                display: none;
              }
              
              .preview:hover {
                background: rgba(var(--color-blue), 0.05);
              }
              
              .preview__image {
                width: 48px;
                height: 70px;
                object-fit: cover;
                background: grey;
                border-radius: 2px;
                box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
              }
              
              .preview__info {
                padding: 1rem;
              }
              
              .preview__title {
                margin: 0 0 0.5rem;
                font-weight: bold;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;  
                overflow: hidden;
                color: rgba(var(--color-dark), 0.8)
              }
              
              .preview__author {
                color: rgba(var(--color-dark), 0.4);
              }
            </style>
            <button class="preview" data-preview>
                <img class="preview__image" />
                <div class="preview__info">
                <button class="preview" data-preview>
                <img class="preview__image" />
                <div class="preview__info">
                    <h3 class="preview__title"></h3>
                    <div class="preview__author"></div>
                </div>
            </button>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.preview').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('preview-click', {
                detail: this.getAttribute('data-preview'),
                bubbles: true,
                composed: true
            }));
        });
    }

    static get observedAttributes() {
        return ['data-preview', 'data-image', 'data-title', 'data-author'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'data-preview':
                this.shadowRoot.querySelector('.preview').setAttribute('data-preview', newValue);
                break;
            case 'data-image':
                this.shadowRoot.querySelector('.preview__image').src = newValue;
                break;
            case 'data-title':
                this.shadowRoot.querySelector('.preview__title').innerText = newValue;
                break;
            case 'data-author':
                this.shadowRoot.querySelector('.preview__author').innerText = authors[newValue];
                break;
        }
    }
}

customElements.define('book-preview', BookPreview);


class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Allow external styles to be applied
        this.render();
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
            .header {
                background-color: rgba(var(--color-force-dark), 0.9);
                position: sticky;
                top: 0;
                left: 0;
              }
              
              .header__inner {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                max-width: 70rem;
                padding: 0 1rem;
                margin: 0 auto;
              }
              
              .header__logo {
                padding: 1.5rem 0 1.5rem 0.5rem;
                display: flex;
                align-items: center;
                justify-content: flex-start;
              }
              
              .header__shape {
                height: 1rem;
                margin-right: 0.75rem;
                fill: rgb(var(--color-blue));
                display: none;
              }
              
              @media (min-width: 30rem) {
                .header__shape {
                  display: block;
                }
              }
              
              .header__text {
                height: 1rem;
                fill: rgba(var(--color-force-light), 1);
              }
              
              @media (min-width: 30rem) {
                .header__text {
                  height: 1.25rem;
                  fill: rgba(var(--color-force-light), 1);
                }
              }
              
              .header__icon {
                width: 1.5rem;
                height: 1.5rem;
                fill: rgba(var(--color-force-light), 1);
              }
              
              .header__button {
                background-color: rgba(var(--color-force-light), 0.1);
                transition: background-color 0.1s;
                border-width: 0;
                border-radius: 6px;
                height: 2.5rem;
                width: 2.5rem;
                cursor: pointer;
                margin-right: 0.25rem;
              }
              
              .header__button:hover {
                background-color: rgba(var(--color-force-light), 0.2);
              }
              
              .header__button:active {
                background-color: rgba(var(--color-force-light), 0.3);
              }
            </style>

            <header class="header">
            <div class="header__inner">
              <div class="header__logo">
                <svg
                  class="header__shape"
                  viewBox="0 0 89 68"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M52.88 57.62 4.126 37.897a3 3 0 0 0-2.25 5.562L58.95 66.55a11.062 11.062 0 0 0 2.1.849l.154.062c.351.142.714.213 1.071.22 5.35.912 10.682-2.253 12.34-7.577l14.27-45.83C90.694 8.473 87.456 2.307 81.654.5c-5.8-1.806-11.966 1.432-13.773 7.233l-8.23 26.429L49.03 4.479a5 5 0 1 0-9.415 3.37l14.04 39.23-31.087-31.085a4 4 0 1 0-5.657 5.656l35.97 35.97Z"
                  ></path>
                </svg>
      
                <svg
                  class="header__text"
                  viewBox="0 0 652 74"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M49.344 37.056c3.84 1.216 6.848 3.264 9.024 6.144 2.176 2.816 3.264 6.304 3.264 10.464 0 5.888-2.304 10.432-6.912 13.632C50.176 70.432 43.52 72 34.752 72H0V4.8h32.832c8.192 0 14.464 1.568 18.816 4.704 4.416 3.136 6.624 7.392 6.624 12.768 0 3.264-.8 6.176-2.4 8.736-1.536 2.56-3.712 4.576-6.528 6.048ZM15.456 16.512v15.84h15.456c3.84 0 6.752-.672 8.736-2.016 1.984-1.344 2.976-3.328 2.976-5.952s-.992-4.576-2.976-5.856c-1.984-1.344-4.896-2.016-8.736-2.016H15.456ZM33.6 60.288c4.096 0 7.168-.672 9.216-2.016 2.112-1.344 3.168-3.424 3.168-6.24 0-5.568-4.128-8.352-12.384-8.352H15.456v16.608H33.6ZM92.126 72.768c-5.44 0-10.336-1.12-14.688-3.36-4.288-2.304-7.648-5.472-10.08-9.504-2.432-4.032-3.648-8.608-3.648-13.728 0-5.12 1.216-9.696 3.648-13.728 2.432-4.032 5.792-7.168 10.08-9.408 4.352-2.304 9.248-3.456 14.688-3.456 5.44 0 10.304 1.152 14.592 3.456 4.288 2.24 7.648 5.376 10.08 9.408 2.432 4.032 3.648 8.608 3.648 13.728 0 5.12-1.216 9.696-3.648 13.728-2.432 4.032-5.792 7.2-10.08 9.504-4.288 2.24-9.152 3.36-14.592 3.36Zm0-12.288c3.84 0 6.976-1.28 9.408-3.84 2.496-2.624 3.744-6.112 3.744-10.464s-1.248-7.808-3.744-10.368c-2.432-2.624-5.568-3.936-9.408-3.936s-7.008 1.312-9.504 3.936c-2.496 2.56-3.744 6.016-3.744 10.368s1.248 7.84 3.744 10.464c2.496 2.56 5.664 3.84 9.504 3.84ZM150.232 72.768c-5.44 0-10.336-1.12-14.688-3.36-4.288-2.304-7.648-5.472-10.08-9.504-2.432-4.032-3.648-8.608-3.648-13.728 0-5.12 1.216-9.696 3.648-13.728 2.432-4.032 5.792-7.168 10.08-9.408 4.352-2.304 9.248-3.456 14.688-3.456 5.44 0 10.305 1.152 14.593 3.456 4.288 2.24 7.647 5.376 10.079 9.408 2.432 4.032 3.649 8.608 3.649 13.728 0 5.12-1.217 9.696-3.649 13.728s-5.791 7.2-10.079 9.504c-4.288 2.24-9.153 3.36-14.593 3.36Zm0-12.288c3.84 0 6.977-1.28 9.409-3.84 2.496-2.624 3.744-6.112 3.744-10.464s-1.248-7.808-3.744-10.368c-2.432-2.624-5.569-3.936-9.409-3.936-3.84 0-7.008 1.312-9.503 3.936-2.496 2.56-3.745 6.016-3.745 10.368s1.249 7.84 3.745 10.464c2.495 2.56 5.663 3.84 9.503 3.84ZM205.939 51.744l-7.2 7.104V72h-14.976V.768h14.976v40.32l21.888-20.736h17.856L216.979 42.24 240.403 72h-18.144l-16.32-20.256ZM297.941 73.152c-6.848 0-13.056-1.472-18.624-4.416-5.504-3.008-9.856-7.136-13.056-12.384-3.136-5.312-4.704-11.296-4.704-17.952 0-6.656 1.568-12.608 4.704-17.856 3.2-5.312 7.552-9.44 13.056-12.384 5.568-3.008 11.808-4.512 18.72-4.512 5.824 0 11.072 1.024 15.744 3.072 4.736 2.048 8.704 4.992 11.904 8.832l-9.984 9.216c-4.544-5.248-10.176-7.872-16.896-7.872-4.16 0-7.872.928-11.136 2.784-3.264 1.792-5.824 4.32-7.68 7.584-1.792 3.264-2.688 6.976-2.688 11.136 0 4.16.896 7.872 2.688 11.136 1.856 3.264 4.416 5.824 7.68 7.68 3.264 1.792 6.976 2.688 11.136 2.688 6.72 0 12.352-2.656 16.896-7.968l9.984 9.216c-3.2 3.904-7.168 6.88-11.904 8.928-4.736 2.048-10.016 3.072-15.84 3.072Z"
                  ></path>
      
                  <path
                    d="M353.126 72.768c-5.44 0-10.336-1.12-14.688-3.36-4.288-2.304-7.648-5.472-10.08-9.504-2.432-4.032-3.648-8.608-3.648-13.728 0-5.12 1.216-9.696 3.648-13.728 2.432-4.032 5.792-7.168 10.08-9.408 4.352-2.304 9.248-3.456 14.688-3.456 5.44 0 10.304 1.152 14.592 3.456 4.288 2.24 7.648 5.376 10.08 9.408 2.432 4.032 3.648 8.608 3.648 13.728 0 5.12-1.216 9.696-3.648 13.728-2.432 4.032-5.792 7.2-10.08 9.504-4.288 2.24-9.152 3.36-14.592 3.36Zm0-12.288c3.84 0 6.976-1.28 9.408-3.84 2.496-2.624 3.744-6.112 3.744-10.464s-1.248-7.808-3.744-10.368c-2.432-2.624-5.568-3.936-9.408-3.936s-7.008 1.312-9.504 3.936c-2.496 2.56-3.744 6.016-3.744 10.368s1.248 7.84 3.744 10.464c2.496 2.56 5.664 3.84 9.504 3.84ZM418.049 19.584c6.4 0 11.552 1.92 15.456 5.76 3.968 3.84 5.952 9.536 5.952 17.088V72H424.48V44.736c0-4.096-.895-7.136-2.687-9.12-1.792-2.048-4.384-3.072-7.776-3.072-3.776 0-6.784 1.184-9.024 3.552-2.24 2.304-3.36 5.76-3.36 10.368V72h-14.977V20.352h14.305V26.4c1.984-2.176 4.448-3.84 7.392-4.992 2.944-1.216 6.176-1.824 9.696-1.824ZM479.624 19.584c6.4 0 11.552 1.92 15.456 5.76 3.968 3.84 5.952 9.536 5.952 17.088V72h-14.976V44.736c0-4.096-.896-7.136-2.688-9.12-1.792-2.048-4.384-3.072-7.776-3.072-3.776 0-6.784 1.184-9.024 3.552-2.24 2.304-3.36 5.76-3.36 10.368V72h-14.976V20.352h14.304V26.4c1.984-2.176 4.448-3.84 7.392-4.992 2.944-1.216 6.176-1.824 9.696-1.824ZM560.961 46.368c0 .192-.096 1.536-.288 4.032h-39.072c.704 3.2 2.368 5.728 4.992 7.584 2.624 1.856 5.888 2.784 9.792 2.784 2.688 0 5.056-.384 7.104-1.152 2.112-.832 4.064-2.112 5.856-3.84l7.968 8.64c-4.864 5.568-11.968 8.352-21.312 8.352-5.824 0-10.976-1.12-15.456-3.36-4.48-2.304-7.936-5.472-10.368-9.504-2.432-4.032-3.648-8.608-3.648-13.728 0-5.056 1.184-9.6 3.552-13.632 2.432-4.096 5.728-7.264 9.888-9.504 4.224-2.304 8.928-3.456 14.112-3.456 5.056 0 9.632 1.088 13.728 3.264 4.096 2.176 7.296 5.312 9.6 9.408 2.368 4.032 3.552 8.736 3.552 14.112Zm-26.784-15.456c-3.392 0-6.24.96-8.544 2.88-2.304 1.92-3.712 4.544-4.224 7.872h25.44c-.512-3.264-1.92-5.856-4.224-7.776-2.304-1.984-5.12-2.976-8.448-2.976ZM591.091 72.768c-5.504 0-10.464-1.12-14.88-3.36-4.352-2.304-7.776-5.472-10.272-9.504-2.432-4.032-3.647-8.608-3.647-13.728 0-5.12 1.215-9.696 3.647-13.728 2.496-4.032 5.92-7.168 10.272-9.408 4.416-2.304 9.376-3.456 14.88-3.456 5.44 0 10.176 1.152 14.208 3.456 4.097 2.24 7.072 5.472 8.928 9.696l-11.615 6.24c-2.688-4.736-6.561-7.104-11.617-7.104-3.904 0-7.136 1.28-9.696 3.84-2.559 2.56-3.84 6.048-3.84 10.464s1.281 7.904 3.84 10.464c2.56 2.56 5.792 3.84 9.696 3.84 5.12 0 8.993-2.368 11.617-7.104l11.615 6.336c-1.856 4.096-4.831 7.296-8.928 9.6-4.032 2.304-8.768 3.456-14.208 3.456Z"
                  ></path>
      
                  <path
                    d="M652.112 69.504c-1.472 1.088-3.296 1.92-5.472 2.496-2.112.512-4.352.768-6.72.768-6.144 0-10.912-1.568-14.304-4.704-3.328-3.136-4.992-7.744-4.992-13.824V33.024h-7.968v-11.52h7.968V8.928H635.6v12.576h12.864v11.52H635.6v21.024c0 2.176.544 3.872 1.632 5.088 1.152 1.152 2.752 1.728 4.8 1.728 2.368 0 4.384-.64 6.048-1.92l4.032 10.56Z"
                  ></path>
                </svg>
              </div>
              <div>
                <button class="header__button" data-header-search>
                  <svg
                    class="header__icon"
                    viewBox="0 96 960 960"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M795 963 526 695q-29 22.923-68.459 35.962Q418.082 744 372 744q-115.162 0-195.081-80Q97 584 97 471t80-193q80-80 193.5-80t193 80Q643 358 643 471.15q0 44.85-12.5 83.35Q618 593 593 627l270 268-68 68ZM371.353 650q74.897 0 126.272-52.25T549 471q0-74.5-51.522-126.75T371.353 292q-75.436 0-127.895 52.25Q191 396.5 191 471t52.311 126.75Q295.623 650 371.353 650Z"
                    ></path>
                  </svg>
                </button>
      
                <button class="header__button" data-header-settings>
                  <svg
                    class="header__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 960 960"
                  >
                    <path
                      d="M479.796 562q-77.203 0-126-48.796Q305 464.407 305 387.204 305 310 353.796 261q48.797-49 126-49Q557 212 606.5 261T656 387.204q0 77.203-49.5 126Q557 562 479.796 562ZM135 934V813.205q0-44.507 22.828-77.721Q180.656 702.27 217 685q69-31 133.459-46.5T479.731 623q66.731 0 130.5 16 63.769 16 131.69 46.194 37.911 16.085 60.995 49.445Q826 768 826 812.945V934H135Zm94-94h502v-23q0-15.353-9.5-29.323Q712 773.706 698 767q-60-28-110.495-38.5-50.496-10.5-108-10.5Q424 718 371.5 728.5 319 739 261.429 766.844 247 773.559 238 787.575q-9 14.016-9 29.425v23Zm250.796-372Q515 468 538 445.154t23-58.119q0-35.685-22.796-58.36-22.797-22.675-58-22.675Q445 306 422 328.721t-23 57.819q0 35.51 22.796 58.485 22.797 22.975 58 22.975Zm.204-81Zm0 453Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </header>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('nav-bar', NavBar);

class BookList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
            .list {
                padding-bottom: 10rem;
              }
              
              .list__message {
                display: none;
                padding: 10rem 4rem 2rem;
                text-align: center;
              }
              
              .list__message_show {
                display: block;
              }
              
              .list__items {
                display: grid;
                padding: 2rem 1rem;
                grid-template-columns: 4fr;
                grid-column-gap: 0.5rem;
                grid-row-gap: 0.5rem;
                margin: 0 auto;
                width: 100%;
              }
            </style>
            <div class="list">
                <div class="list__message" data-list-message>No results found</div>
                <div class="list__items" data-list-items></div>
                <button class="list__button" data-list-button>Show more</button>
            </div>
        `;
        this.page = 1;
        this.matches = books;
    }

    connectedCallback() {
        this.renderBooks(this.matches);

        this.shadowRoot.querySelector('[data-list-button]').addEventListener('click', () => {
            this.loadMoreBooks();
        });
    }

    renderBooks(matches) {
        const fragment = document.createDocumentFragment();
        matches.slice(0, BOOKS_PER_PAGE * this.page).forEach((book) => {
            const element = document.createElement('book-preview');
            element.setAttribute('data-preview', book.id);
            element.setAttribute('data-image', book.image);
            element.setAttribute('data-title', book.title);
            element.setAttribute('data-author', book.author);
            fragment.appendChild(element);
        });
        this.shadowRoot.querySelector('[data-list-items]').appendChild(fragment);
    }

    loadMoreBooks() {
        this.page += 1;
        this.renderBooks(this.matches);
    }
}

customElements.define('book-list', BookList);

class SearchForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
            .overlay {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                border-width: 0;
                box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
                animation-name: enter;
                animation-duration: 0.6s;
                z-index: 10;
                background-color: rgba(var(--color-light), 1);
              }
              
              @media (min-width: 30rem) {
                .overlay {
                  max-width: 30rem;
                  left: 0%;
                  top: 0;
                  border-radius: 8px;;
                }
              }
              
              .overlay__form {
                padding-bottom: 0.5rem;
                margin: 0 auto;
              }
              
              .overlay__row {
                display: flex;
                gap: 0.5rem;
                margin: 0 auto;
                justify-content: center;
              }
              
              .overlay__button {
                font-family: Roboto, sans-serif;
                background-color: rgba(var(--color-blue), 0.1);
                transition: background-color 0.1s;
                border-width: 0;
                border-radius: 6px;
                height: 2.75rem;
                cursor: pointer;
                width: 50%;
                color: rgba(var(--color-blue), 1);
                font-size: 1rem;
                border: 1px solid rgba(var(--color-blue), 1);
              }
              
              .overlay__button_primary {
                background-color: rgba(var(--color-blue), 1);
                color: rgba(var(--color-force-light), 1);
              }
              
              .overlay__button:hover {
                background-color: rgba(var((var(--color-blue))), 0.2);
              }
              
              
              .overlay__button_primary:hover {
                background-color: rgba(var(--color-blue), 0.8);
                color: rgba(var(--color-force-light), 1);
              }
              
              .overlay__input {
                width: 100%;
                margin-bottom: 0.5rem;
                background-color: rgba(var(--color-dark), 0.05);
                border-width: 0;
                border-radius: 6px;
                width: 100%;
                height: 4rem;
                color: rgba(var(--color-dark), 1);
                padding: 1rem 0.5rem 0 0.75rem;
                font-size: 1.1rem;
                font-weight: bold;
                font-family: Roboto, sans-serif;
                cursor: pointer;
              }
              
              .overlay__input_select {
                padding-left: 0.5rem;
              }
              
              .overlay__field {
                position: relative;
                display: block;
              }
              
              .overlay__label {
                position: absolute;
                top: 0.75rem;
                left: 0.75rem;
                font-size: 0.85rem;
                color: rgba(var(--color-dark), 0.4);
              }
              
              .overlay__input:hover {
                background-color: rgba(var(--color-dark), 0.1);
              }
              
              .overlay__title {
                padding: 1rem 0 0.25rem;
                font-size: 1.25rem;
                font-weight: bold;
                line-height: 1;
                letter-spacing: -0.1px;
                max-width: 25rem;
                margin: 0 auto;
                color: rgba(var(--color-dark), 0.8)
              }
              
              .overlay__blur {
                width: 100%;
                height: 200px;
                filter: blur(10px);
                opacity: 0.5;
                transform: scale(2);
              }
              
              .overlay__image {
                max-width: 10rem;
                position: absolute;
                top: 1.5m;
                left: calc(50% - 5rem);
                border-radius: 2px;
                box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
              }
              
              .overlay__data {
                font-size: 0.9rem;
                display: -webkit-box;
                -webkit-line-clamp: 6;
                -webkit-box-orient: vertical;  
                overflow: hidden;
                color: rgba(var(--color-dark), 0.8)
              }
              
              .overlay__data_secondary {
                color: rgba(var(--color-dark), 0.6)
              }
              
              .overlay__content {
                padding: 2rem 1.5rem;
                text-align: center;
                padding-top: 3rem;
              }
              
              .overlay__preview {
                overflow: hidden;
                margin: -1rem;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .overlay__background {
                background: rgba(var(--color-dark), 0.6);
                position: fixed;
                top: 0;
                left: 0;
                height: 100vh;
                width: 100vw;
              }
              
              /* backdrop */
              
              .backdrop {
                display: none;
                background: rgba(var(--color-dark), 0.3);
                position: fixed;
                top: 0;
                left: 0;
                height: 100vh;
                width: 100vw;
              }
              
              .overlay[open] ~ .backdrop {
                display: block;
              }
            </style>
            <form class="overlay__form" data-search-form>
                <div class="overlay__content">
                    <h2 class="overlay__title">Search</h2>
                    <div class="overlay__field">
                        <label class="overlay__label" for="search-title">Title</label>
                        <input class="overlay__input" type="text" id="search-title" name="title" data-search-title>
                    </div>
                    <div class="overlay__field">
                        <label class="overlay__label" for="search-author">Author</label>
                        <select class="overlay__input overlay__input_select" id="search-author" name="author" data-search-authors></select>
                    </div>
                    <div class="overlay__field">
                        <label class="overlay__label" for="search-genre">Genre</label>
                        <select class="overlay__input overlay__input_select" id="search-genre" name="genre" data-search-genres></select>
                    </div>
                    <div class="overlay__row">
                        <button class="overlay__button" type="button" data-search-cancel>Cancel</button>
                        <button class="overlay__button overlay__button_primary" type="submit">Search</button>
                    </div>
                </div>
            </form>
        `;
    }

    connectedCallback() {
        const cancelButton = this.shadowRoot.querySelector('[data-search-cancel]');
        cancelButton.addEventListener('click', () => {
            this.closest('dialog').close();
        });

        const form = this.shadowRoot.querySelector('[data-search-form]');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const filters = Object.fromEntries(formData);
            this.dispatchEvent(new CustomEvent('search-submit', {
                detail: filters,
                bubbles: true,
                composed: true
            }));
            this.closest('dialog').close();
        });

        this.renderDropdownOptions(authors, 'authors');
        this.renderDropdownOptions(genres, 'genres');
    }

    renderDropdownOptions(data, selector) {
        const selectElement = this.shadowRoot.querySelector(`[data-search-${selector}]`);
        selectElement.innerHTML = `<option value="any">All ${selector}</option>`;
        Object.entries(data).forEach(([id, name]) => {
            const optionElement = document.createElement('option');
            optionElement.value = id;
            optionElement.textContent = name;
            selectElement.appendChild(optionElement);
        });
    }
}

customElements.define('search-form', SearchForm);

class SettingsForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
            .overlay {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                border-width: 0;
                box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
                animation-name: enter;
                animation-duration: 0.6s;
                z-index: 10;
                background-color: rgba(var(--color-light), 1);
              }
              
              @media (min-width: 30rem) {
                .overlay {
                  max-width: 30rem;
                  left: 0%;
                  top: 0;
                  border-radius: 8px;;
                }
              }
              
              .overlay__form {
                padding-bottom: 0.5rem;
                margin: 0 auto;
              }
              
              .overlay__row {
                display: flex;
                gap: 0.5rem;
                margin: 0 auto;
                justify-content: center;
              }
              
              .overlay__button {
                font-family: Roboto, sans-serif;
                background-color: rgba(var(--color-blue), 0.1);
                transition: background-color 0.1s;
                border-width: 0;
                border-radius: 6px;
                height: 2.75rem;
                cursor: pointer;
                width: 50%;
                color: rgba(var(--color-blue), 1);
                font-size: 1rem;
                border: 1px solid rgba(var(--color-blue), 1);
              }
              
              .overlay__button_primary {
                background-color: rgba(var(--color-blue), 1);
                color: rgba(var(--color-force-light), 1);
              }
              
              .overlay__button:hover {
                background-color: rgba(var((var(--color-blue))), 0.2);
              }
              
              
              .overlay__button_primary:hover {
                background-color: rgba(var(--color-blue), 0.8);
                color: rgba(var(--color-force-light), 1);
              }
              
              .overlay__input {
                width: 100%;
                margin-bottom: 0.5rem;
                background-color: rgba(var(--color-dark), 0.05);
                border-width: 0;
                border-radius: 6px;
                width: 100%;
                height: 4rem;
                color: rgba(var(--color-dark), 1);
                padding: 1rem 0.5rem 0 0.75rem;
                font-size: 1.1rem;
                font-weight: bold;
                font-family: Roboto, sans-serif;
                cursor: pointer;
              }
              
              .overlay__input_select {
                padding-left: 0.5rem;
              }
              
              .overlay__field {
                position: relative;
                display: block;
              }
              
              .overlay__label {
                position: absolute;
                top: 0.75rem;
                left: 0.75rem;
                font-size: 0.85rem;
                color: rgba(var(--color-dark), 0.4);
              }
              
              .overlay__input:hover {
                background-color: rgba(var(--color-dark), 0.1);
              }
              
              .overlay__title {
                padding: 1rem 0 0.25rem;
                font-size: 1.25rem;
                font-weight: bold;
                line-height: 1;
                letter-spacing: -0.1px;
                max-width: 25rem;
                margin: 0 auto;
                color: rgba(var(--color-dark), 0.8)
              }
              
              .overlay__blur {
                width: 100%;
                height: 200px;
                filter: blur(10px);
                opacity: 0.5;
                transform: scale(2);
              }
              
              .overlay__image {
                max-width: 10rem;
                position: absolute;
                top: 1.5m;
                left: calc(50% - 5rem);
                border-radius: 2px;
                box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
              }
              
              .overlay__data {
                font-size: 0.9rem;
                display: -webkit-box;
                -webkit-line-clamp: 6;
                -webkit-box-orient: vertical;  
                overflow: hidden;
                color: rgba(var(--color-dark), 0.8)
              }
              
              .overlay__data_secondary {
                color: rgba(var(--color-dark), 0.6)
              }
              
              .overlay__content {
                padding: 2rem 1.5rem;
                text-align: center;
                padding-top: 3rem;
              }
              
              .overlay__preview {
                overflow: hidden;
                margin: -1rem;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .overlay__background {
                background: rgba(var(--color-dark), 0.6);
                position: fixed;
                top: 0;
                left: 0;
                height: 100vh;
                width: 100vw;
              }
              
              /* backdrop */
              
              .backdrop {
                display: none;
                background: rgba(var(--color-dark), 0.3);
                position: fixed;
                top: 0;
                left: 0;
                height: 100vh;
                width: 100vw;
              }
              
              .overlay[open] ~ .backdrop {
                display: block;
              }
            </style>
            <form class="overlay__form" data-settings-form>
                <div class="overlay__content">
                    <h2 class="overlay__title">Settings</h2>
                    <div class="overlay__field">
                        <label class="overlay__label" for="settings-theme">Theme</label>
                        <select class="overlay__input overlay__input_select" id="settings-theme" name="theme" data-settings-theme>
                            <option value="day">Day</option>
                            <option value="night">Night</option>
                        </select>
                    </div>
                    <div class="overlay__row">
                        <button class="overlay__button" type="button" data-settings-cancel>Cancel</button>
                        <button class="overlay__button overlay__button_primary" type="submit">Save</button>
                    </div>
                </div>
            </form>
        `;
    }

    connectedCallback() {
        const cancelButton = this.shadowRoot.querySelector('[data-settings-cancel]');
        cancelButton.addEventListener('click', () => {
            this.closest('dialog').close();
        });

        const formData = new FormData(form);
        const { theme } = Object.fromEntries(formData);
        const darkColor = theme === 'night' ? '255, 255, 255' : '10, 10, 20';
        const lightColor = theme === 'night' ? '10, 10, 20' : '255, 255, 255';
        document.documentElement.style.setProperty('--color-dark', darkColor);
        document.documentElement.style.setProperty('--color-light', lightColor);
        this.closest('dialog').close();

                   // scripts.js

        this.initializeTheme();
    }

    initializeTheme() {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDarkMode ? 'night' : 'day';
        this.shadowRoot.querySelector('[data-settings-theme]').value = theme;
    }
}

customElements.define('settings-form', SettingsForm);

// Other parts of the application logic

// Event listeners for other elements can be added here, like the header buttons

// Initialize components
const bookList = document.createElement('book-list');
const searchForm = document.createElement('search-form');
const settingsForm = document.createElement('settings-form');

document.body.appendChild(bookList);
document.body.appendChild(searchForm);
document.body.appendChild(settingsForm);

// Example event listeners:
searchForm.addEventListener('search-submit', (event) => {
    const filters = event.detail;
    // Handle search submit event, filter books based on the filters
    console.log('Search filters:', filters);
});

// For the 'preview-click' event, you can listen for it on the document or a parent element.
document.addEventListener('preview-click', (event) => {
    const bookId = event.detail;
    // Handle book preview click event
    console.log('Preview clicked for book ID:', bookId);
});

