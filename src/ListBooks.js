import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class Books extends Component {
    render() {
        
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            title={'Currently Reading'}
                            books={this.props.books.filter(book => book.shelf === 'currentlyReading')}
                            onUpdateBook={this.props.onUpdateBook}
                        />
                        <BookShelf 
                            title={'Want to Read'}
                            books={this.props.books.filter(book => book.shelf === 'wantToRead')}
                            onUpdateBook={this.props.onUpdateBook}
                        />
                        <BookShelf 
                            title={'Read'}
                            books={this.props.books.filter(book => book.shelf === 'read')}
                            onUpdateBook={this.props.onUpdateBook}
                        />                        
                    </div>      
                </div>
                <div className="open-search">                    
                    <Link to='/search'>
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Books