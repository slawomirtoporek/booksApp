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
  };

  const classNames = {
    library: {
      imageFavorite: 'favorite',
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

  function initActions () {
    const books = document.querySelector(select.containerOf.listBooks);

    books.addEventListener('dblclick', function(event) {
      event.preventDefault(); 

      const book = event.target.offsetParent;

      if (book && book.classList.contains('book__image')) {
        const bookId = book.getAttribute(select.book.id);
        
        if (favoriteBooks.includes(bookId)) {
          book.classList.remove(classNames.library.imageFavorite);
          const index = favoriteBooks.indexOf(bookId);
          if (index != -1) {
            favoriteBooks.splice(index, 1);
          }
        } else {
          book.classList.add(classNames.library.imageFavorite);
          favoriteBooks.push(bookId);
        }
      }
    }); 
  }

  render();
  initActions();
}
