// Each bookshelf has many books, a list of books is a collection of bookshelfs
import React, {Component} from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Bookshelf extends Component {
  static propTypes = {
      title: PropTypes.string.isRequired,
      books: PropTypes.array.isRequired,
      changeBookshelf: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id} className="contact-list-item">
                <Book
                  book={book}
                  changeBookshelf={this.props.changeBookshelf}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;