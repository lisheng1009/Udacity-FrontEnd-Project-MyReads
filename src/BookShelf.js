
/**
 * 最小组件: 单个书架, 显示指定书架的书本
 */

import React, { Component } from 'react'

class BookShelf extends Component {

    updateBook = (book, shelf) => {
        console.log('bookshelf', book, shelf)
        this.props.updateBooks(book, shelf)
    }

    render() {
        return (
            <div>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map(book =>
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf} onChange={(e) => this.updateBook(book, e.target.value)}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>)}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf