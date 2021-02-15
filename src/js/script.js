{
  'use strict';

  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      form: '.filters',
    },
    book: {
      image: 'book__image',
      favorite: '.books-list .favorite',
    },
  };

  const classNames = {
    favoriteBook: 'favorite',
    hidden: 'hidden',
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
      thisBooksList.determineRatingBgc();
    }

    initData() {
      this.data = dataSource.books;
      // const thisBooksList = this;TODO
      // thisBooksList.data = dataSource.books;
    }

    getElements() {
      const thisBooksList = this;
      thisBooksList.menuContainer = document.querySelector(select.containerOf.bookList);
      thisBooksList.formHtmlFiltered = document.querySelector(select.containerOf.form);
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    render() {
      const thisBooksList = this;
      for (let elem of dataSource.books) {
        elem.ratingBgc = thisBooksList.determineRatingBgc(elem.rating);
        elem.ratingWidth = elem.rating * 10;
        const generatedHTML = templates.booksList(elem);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.menuContainer.appendChild(element);
      }
    }

    filterBooks() {
      const thisBooksList = this;
      for (let elem of dataSource.books) {
        let shouldBeHidden = false;

        for (let filter of thisBooksList.filters) {
          if (!elem.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          const book = document.querySelector('.book__image[data-id="' + elem.id + '"]');
          book.classList.add(classNames.hidden);
        } else {
          const book = document.querySelector('.book__image[data-id="' + elem.id + '"]');
          book.classList.remove(classNames.hidden);
        }
      }
    }
    determineRatingBgc(rating) {
      let background = '';
      if (rating <= 6) background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);';
      else if (rating > 6 && rating <= 8) background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);';
      else if (rating > 8 && rating <= 9) background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      else if (rating > 9) background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';
      return background;
    }
    initActions() {
      const thisBooksList = this;
      // console.log(this);

      thisBooksList.menuContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const elem = event.target.offsetParent;
        console.log(elem);
        if (elem.classList.contains(select.book.image)) {
          // console.log(select.book.image);
          const id = elem.getAttribute('data-id');

          if (thisBooksList.favoriteBooks.includes(id)) {
            const indexOfBookID = thisBooksList.favoriteBooks.indexOf(id);
            elem.classList.remove(classNames.favoriteBook);
            thisBooksList.favoriteBooks.splice(indexOfBookID, 1);
          }
          else {
            elem.classList.add(classNames.favoriteBook);
            thisBooksList.favoriteBooks.push(id);
          }
        }
      });

      thisBooksList.formHtmlFiltered.addEventListener('change', function (event) {
        event.preventDefault();
        const elem = event.target;
        if (elem.type === 'checkbox') {
          if (elem.checked) {
            thisBooksList.filters.push(elem.value);
            // console.log(thisBooksList.filters);
          } else {
            const indexOfFilter = thisBooksList.filters.indexOf(elem.value);
            thisBooksList.filters.splice(indexOfFilter, 1);
            // console.log(filters);
          }
        }
        thisBooksList.filterBooks();
      });
    }
  }
  // const app = new BooksList();
  const app = {
    initializeProject: function () {
      new BooksList();
    }
  };
  app.initializeProject();
}
