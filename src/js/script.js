{
  const select = {
  templateOf: {
    books: "#template-book",
  },
  containerOf: {
    listBooks: ".books-list",
    },
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

  render();
}
