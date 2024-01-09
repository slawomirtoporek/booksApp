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
    }
  };

  const classNames = {
    library: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  function render () {
    for (let book of dataSource.books) {
      const generatedHTML = classNames.library(book);
      const elementDOM = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.containerOf.listBooks);
      booksContainer.appendChild(elementDOM);
    } 
  }

  const favoriteBooks = [];

  function initActions () {
    const books = document.querySelectorAll(select.book.image);

    for (let selectBook of books) {
      selectBook.addEventListener('dblclick', function(event) {
        event.preventDefault(); 
        selectBook.classList.add('favorite');
        const bookId = selectBook.getAttribute(select.book.id);
        favoriteBooks.push(bookId);
      });
    }
  }

  render();
  initActions();
}
