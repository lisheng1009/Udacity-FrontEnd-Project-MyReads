/**
 * 首页:书架展示  包括正在读 想读 和 已读三个书架
 */

import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class BookList extends Component {

    componentDidMount(){
        this.props.updateBooks()
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book,shelf).then(res=>this.props.updateBooks())
    }

    render() {
        return (
            <div>
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <BookShelf 
                            books={this.props.currentlyReading}
                            updateBooks={(book, shelf)=>this.updateBook(book, shelf)}
                            />
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <BookShelf books={this.props.wantToRead} 
                            updateBooks={(book, shelf)=>this.updateBook(book, shelf)}/>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <BookShelf books={this.props.read} 
                            updateBooks={(book, shelf)=>this.updateBook(book, shelf)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default BookList;