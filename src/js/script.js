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
  const menuContainer = document.querySelector(select.containerOf.bookList);
  const favoriteBooks = [];


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
        console.log(favoriteBooks);
      }
    });


  }

  render();
  initActions();
}


