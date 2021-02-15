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
      // console.log('elem',elem);
      let shouldBeHidden = false;

      for (let filter of filters) {
        if (!elem.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        const book = document.querySelector('.book__image[data-id="' + elem.id + '"]');
        console.log( 'book', book);
        console.log('elem' ,elem.id);
        book.classList.add('hidden');
      } else {
        const book = document.querySelector('.book__image[data-id="' + elem.id + '"]');
        book.classList.remove('hidden');
      }
    }
  }

  render();
  initActions();
}


