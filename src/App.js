import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import AddBooks from './AddBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    this.updateBookList()
  }

  updateBookList(){
    var currentArray = []
    var wantToReadArray = []
    var readArray = []
    var allBooks = []

    BooksAPI.getAll().then((resp)=>{
      currentArray = resp.filter(book => book.shelf === 'currentlyReading')
      wantToReadArray = resp.filter(book => book.shelf === 'wantToRead')
      readArray = resp.filter(book => book.shelf === 'read')
      allBooks = resp
    }).then(()=>{
      this.setState((state)=>({
        currentlyReading : currentArray,
        wantToRead: wantToReadArray,
        read: readArray,
        books: allBooks
      }))
    })
  }

  render() {
    return (
      <div>
      <Route exact path='/' render={() => (
        <div className="app">
          <div className="list-books">
            <BookList
              allBooks={this.state.books}
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              updateBooks={()=>this.updateBookList()}
            />
            <div>
                <Link className="open-search button" to='/search'>Add a book</Link>
            </div>
          </div>
          )}
         </div>
      )} />
      <Route path='/search' render={()=>(
        <AddBooks allBooks = {this.state.books}/>
      )} />
    </div>

    )
  }
}

export default BooksApp
