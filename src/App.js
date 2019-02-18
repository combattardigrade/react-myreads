import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'


class BooksApp extends React.Component {

  state = {
    books: [],
    searchBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
          
        }))
        
      })
  }

  updateBook = (book,shelf) => {    
    BooksAPI.update(book, shelf)
    .then((data) => {      
      
      if(this.state.books.includes(book)){
        this.setState((currentState) => ({        
          books: currentState.books.map((b) => {
            b.shelf = b.id === book.id ? shelf : b.shelf          
            return b
          }) 
        }))
      } else {
        book.shelf = shelf
        this.setState((currentState) => ({
          books: [...currentState.books,book]
        }))
        
      }   
    })
  }

  searchBook = (query) => {
    
    if(query.length <= 0) {
      this.setState({searchBooks:[]})
      return false 
    }
      
    BooksAPI.search(query)
    .then((searchBooks) => {      
      if('error' in searchBooks){
        this.setState({searchBooks:[]})
        return false
      }
      this.setState((currentState) => ({
        searchBooks: searchBooks.map((b) => {
          
          let match = currentState.books.find((myBook) => myBook.id === b.id)       
          
          if(match !== undefined){
            return match
          } else {            
            b.shelf = 'none'            
            return b
          }
          
        })
      }))     
    })
  }

  render() {

    const { books } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks 
            books={books}
            onUpdateBook={this.updateBook}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks 
            onSearchBook={this.searchBook}
            searchBooks={this.state.searchBooks}
            onUpdateBook={this.updateBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
