import React, { Component } from 'react';
import PropTypes from 'prop-types';


class BookshelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeBookshelf: PropTypes.func.isRequired
  };

  state = {
    currentBookshelf: this.props.book.shelf,
    updating: false
  };

  changeBookshelf = (event) => {
    this.props.changeBookshelf(this.props.book, event.target.value);
    this.setState({
      currentBookshelf: event.target.value,
      updating: true
    });
  }

  componentWillReceiveProps(){
    // Remove the process indicator
    this.setState({
      updating: false
    });
  }

  render(){
    return(
      <div className="book-shelf-changer">
        <select
            value={this.state.currentBookshelf}
            onChange={this.changeBookshelf}
        >
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
          { this.state.updating && (<div className="cssload-spin-box"></div>)}
      </div>
    )
  }
}

export default BookshelfChanger;