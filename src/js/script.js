{
  'use strict';

  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    book: {
      image: '.books-list .book__image',
      favorite: '.books-list .favorite',
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  const render = function () {
    for (let elem of dataSource.books) {
      const generatedHTML = templates.booksList(elem);
      const element = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.bookList);
      menuContainer.appendChild(element);
    }
  };


  const favoriteBooks = [];
  const initActions = function () {
    // Przygotuj w niej referencję do listy wszystkich elementów .book__image w liście .booksList.
    const booksList = document.querySelectorAll(select.book.image);
    for (let elem of booksList) {
      console.log(elem);
      elem.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const id = elem.getAttribute('data-id');// pobierze z jego data-id identyfikator książki,
        console.log('id:', id);
        console.log('fav books', favoriteBooks);

        if (favoriteBooks.includes(id)) {
          const indexOfID = favoriteBooks.indexOf(id);
          elem.classList.remove('favorite');
          favoriteBooks.splice(indexOfID, 1);
        } else {
          elem.classList.add('favorite');
          favoriteBooks.push(id);// i doda ten identy do favoriteBooks.
        }
      });
    }
  };


  render();
  initActions();
}



