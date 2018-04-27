import React from 'react'
import { Route , Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './Search';
import Bookshelf from './Bookshelf';

class BooksApp extends React.Component {
  MAX_RESULTS = 30;

  state = {
    books: [],
    searchBooks: []
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  getBookshelfBooks(bookshelfName){
    return this.state.books.filter((b) => b.shelf === bookshelfName)
  }

  changeBookshelf = (book, newBookshelf) => {
    BooksAPI.update(book, newBookshelf).then(() => {
      // Update the local copy of the book
      book.shelf = newBookshelf;

      // Filter out the book and append it to the end of the list
      // so it appears at the end of whatever shelf it was added to.
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }));
    });
  };

  updateQuery = (query) => {
    if(query){
      BooksAPI.search(query, this.MAX_RESULTS).then((books) => {
        // if the BookAPI.search worked properly, this would be unnecessary
        if(books.error !== undefined) {
          this.setState({ searchBooks: [] })
        } else {
        if(books.length){
            books.forEach((book, index) => {
              let myBook = this.state.books.find((b) => b.id === book.id);
              book.shelf = myBook ? myBook.shelf : 'none';
              books[index] = book;
            });

            this.setState({
              searchBooks: books
            });
        }
        }
      });
      } else {
      this.setState({
        searchBooks: []
      });
    }
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title="Currently Reading"
                  books={this.getBookshelfBooks("currentlyReading")}
                  changeBookshelf={this.changeBookshelf}
                />
                <Bookshelf
                  title="Want to Read"
                  books={this.getBookshelfBooks("wantToRead")}
                  changeBookshelf={this.changeBookshelf}
                />
                <Bookshelf
                  title="Read"
                  books={this.getBookshelfBooks("read")}
                  changeBookshelf={this.changeBookshelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

        <Route path="/search" render={({ history }) => (
          <Search
            books={this.state.searchBooks}
            updateQuery={this.updateQuery}
            changeBookshelf={this.changeBookshelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
