import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
    static protoType = {
        searchBooks: PropTypes.array.isRequired,
       
    }
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
        this.props.onSearchBook(query.trim())
    }

    

    render() {
        const { query } = this.state
        const { searchBooks } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                    </Link>                    
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" onChange={e=> this.updateQuery(e.target.value) } value={query} placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    
                    {
                        
                       searchBooks.map((book) => (                                                    
                            <li key={book.id}>
                                <Book        
                                    book={book}
                                    handleChange={this.props.onUpdateBook}
                                />
                            </li>                            
                        ))
                    }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks