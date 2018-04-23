import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookshelfChanger from "./BookshelfChanger";

class Book extends Component{
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeBookshelf: PropTypes.func.isRequired
  };

  render(){
    const { book } = this.props;
    return(
      <div className="book" id={book.id}>
        <div className="book-top">
            <div className="book-cover" style={{backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
            <BookshelfChanger
              book={book}
              changeBookshelf={this.props.changeBookshelf}/>
        </div>
        <div className="book-title">{book.name}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book;