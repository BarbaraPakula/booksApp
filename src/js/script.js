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
      image: '.books-list .book__image',
      favorite: '.books-list .favorite',
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };
  const menuContainer = document.querySelector(select.containerOf.bookList);
  const formHtmlFiltered = document.querySelector(select.containerOf.form);
  const favoriteBooks = [];
  const filters = [];


  const render = function () {
    for (let elem of dataSource.books) {
      elem.ratingBgc = determineRatingBgc(elem.rating);
      elem.ratingWidth = elem.rating * 10;
      const generatedHTML = templates.booksList(elem);
      const element = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.bookList);
      menuContainer.appendChild(element);
    }
  };

  function initActions() {

    menuContainer.addEventListener('dblclick', function (event) {
      event.preventDefault();

      const elem = event.target.offsetParent;
      if (elem.classList.contains('book__image')) {
        const id = elem.getAttribute('data-id');
        if (favoriteBooks.includes(id)) {
          const indexOfBookID = favoriteBooks.indexOf(id);
          elem.classList.remove('favorite');
          favoriteBooks.splice(indexOfBookID, 1);
        }
        else {
          elem.classList.add('favorite');
          favoriteBooks.push(id);
        }
        // console.log(favoriteBooks);
      }
    });

    formHtmlFiltered.addEventListener('change', function (event) {
      event.preventDefault();
      const elem = event.target;
      if (elem.type === 'checkbox') {
        if (elem.checked) {
          filters.push(elem.value);
          console.log(filters);
        } else {
          const indexOfFilter = filters.indexOf(elem.value);
          filters.splice(indexOfFilter, 1);
          console.log(filters);
        }
      }
      filterBooks();
    });


  }
  function filterBooks() {
    for (let elem of dataSource.books) {
      let shouldBeHidden = false;

      for (let filter of filters) {
        if (!elem.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        const book = document.querySelector('.book__image[data-id="' + elem.id + '"]');
        console.log('book', book);
        console.log('elem', elem.id);
        book.classList.add('hidden');
      } else {
        const book = document.querySelector('.book__image[data-id="' + elem.id + '"]');
        book.classList.remove('hidden');
      }
    }
  }
  function determineRatingBgc(rating) {
    let background = '';
    if (rating <= 6) background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);';
    else if (rating > 6 && rating <= 8) background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);';
    else if (rating > 8 && rating <= 9) background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    else if (rating > 9) background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';
    console.log(background);
    return background;
  }


  render();
  initActions();
  determineRatingBgc();
}


