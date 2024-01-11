{
  const select = {
    templateOf: {
      books: "#template-book",
    },
    containerOf: {
      listBooks: ".books-list",
    },
    book: {
      image: '.book__image',
      id: 'data-id',
    },
    form: {
      filter: '.filters',
    } 
  };

  const classNames = {
    library: {
      imageFavorite: 'favorite',
    },
    form: {
      hiddenImage: 'hidden',
    },
  };

  const templates = {
    library: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
  

  function render () {
    for (let book of dataSource.books) {
      const generatedHTML = templates.library(book);
      const elementDOM = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.containerOf.listBooks);
      booksContainer.appendChild(elementDOM);
    } 
  }

  const favoriteBooks = [];
  const filters = [];

  function initActions () {
    const books = document.querySelector(select.containerOf.listBooks);

    books.addEventListener('dblclick', function(event) {
      event.preventDefault(); 

      const clickedElement = event.target.offsetParent;

      if (clickedElement && clickedElement.classList.contains('book__image')) {
        const bookId = clickedElement.getAttribute(select.book.id);
        
        if (favoriteBooks.includes(bookId)) {
          clickedElement.classList.remove(classNames.library.imageFavorite);
          const index = favoriteBooks.indexOf(bookId);
          if (index != -1) {
            favoriteBooks.splice(index, 1);
          }
        } else {
          clickedElement.classList.add(classNames.library.imageFavorite);
          favoriteBooks.push(bookId);
        }
      }
    }); 

    const formFilter = document.querySelector(select.form.filter);

    formFilter.addEventListener('click', function(event) {
      const clickedElement = event.target;

      if (clickedElement && clickedElement.tagName === 'INPUT' 
      && clickedElement.type === 'checkbox' 
      && clickedElement.name === 'filter') {
        console.log(clickedElement.value);
        console.log({filters});

        if (clickedElement.checked == true) {
          filters.push(clickedElement.value); 
        } else {
            const index = filters.indexOf(clickedElement.value);
            filters.splice(index, 1);
        }
        filterBooks(); 
      }
    });
  }

  function filterBooks () { 
    for (const book of dataSource.books) {
      let shouldBeHidden = false;
      const hiddenBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          console.log(book);
          break; 
        }
      }
      if (shouldBeHidden == true) {
        hiddenBook.classList.add(classNames.form.hiddenImage);
      } else {
        hiddenBook.classList.remove((classNames.form.hiddenImage));
      }
    }
  }

  render();
  initActions();
}
