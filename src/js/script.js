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

  class BooksList {
    
    constructor () {
      const thisBooksList = this;

      thisBooksList.dom = {};
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];

      thisBooksList.initData();
      thisBooksList.getElement();
      thisBooksList.initActions();
      thisBooksList.filterBooks();
      thisBooksList.determineRatingBgc();
    }
       
    initData () {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;

      for (let book of thisBooksList.data) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidthCount = book.rating * 10;
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidthCount.toString();
        const generatedHTML = templates.library(book);
        thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
        console.log(thisBooksList.element);
        const booksContainer = document.querySelector(select.containerOf.listBooks);
        booksContainer.appendChild(thisBooksList.element);
        console.log(booksContainer);
      } 
    }

    getElement () {
      const thisBooksList = this;
 
      thisBooksList.dom.listBooks = document.querySelector(select.containerOf.listBooks);
      thisBooksList.dom.filter = document.querySelector(select.form.filter);
    }

    initActions () {
      const thisBooksList = this;
      console.log(thisBooksList.dom.listBooks);
      thisBooksList.dom.listBooks.addEventListener('dblclick', function(event) {
        event.preventDefault(); 
        console.log(thisBooksList.favoriteBooks);
        const clickedElement = event.target.offsetParent;
        
        if (clickedElement && clickedElement.classList.contains('book__image')) {
          const bookId = clickedElement.getAttribute(select.book.id);
          
          if (thisBooksList.favoriteBooks.includes(bookId)) {
            clickedElement.classList.remove(classNames.library.imageFavorite);
            const index = thisBooksList.favoriteBooks.indexOf(bookId);
            if (index != -1) {
              thisBooksList.favoriteBooks.splice(index, 1);
            }
          } else {
            clickedElement.classList.add(classNames.library.imageFavorite);
            thisBooksList.favoriteBooks.push(bookId);
          }
        }
      }); 
  
      thisBooksList.dom.filter.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if (clickedElement && clickedElement.tagName === 'INPUT' 
        && clickedElement.type === 'checkbox' 
        && clickedElement.name === 'filter') {
          console.log(clickedElement.value);
          console.log(thisBooksList.filters);
  
          if (clickedElement.checked == true) {
            thisBooksList.filters.push(clickedElement.value); 
          } else {
              const index = thisBooksList.filters.indexOf(clickedElement.value);
              thisBooksList.filters.splice(index, 1);
          }
          thisBooksList.filterBooks(); 
        }
      });
    }

    filterBooks () { 
      const thisBooksList = this;
      
      for (const book of thisBooksList.data) {
        let shouldBeHidden = false;
        const hiddenBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        for (const filter of thisBooksList.filters) {
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

    determineRatingBgc (rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <=8 ) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }
  
  const app = new BooksList();
}
