/**
 * 搜索-添加页面
 */


import React, { Component } from 'react'
// import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class AddBooks extends Component {


    state = {
        showingBooks: []
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book,shelf).then((res)=>{
            alert(`Done! 《${book.title}》 moved to "${shelf}" shelf!`)
            /**
             * 我在这里本来想调用sweetalert2做一个好看点的弹窗. 
             * 代码:                 
             * swal({
                    title: 'Done!',
                    text: `Done! 《${book.title}》 moved to "${shelf}" shelf!`,
                    imageUrl: 'Lawliet02.jpeg'
                })
             * 在前端第一个项目<经典街机游戏克隆>中成功使用过. 操作步骤是在html中加入引用. 在这里则报错 说swal对象没有被定义. 
             * 所以在组件中要如何引用外部的工具呢?
             */
        })
    }

    searchBooks(value) {
        BooksAPI.search(value).then((resp)=>{
            //没有搜索到结果      
            if(Object.prototype.toString.call(resp) !== '[object Array]'){
                this.setState({showingBooks:[]})
                return
            }
            //有结果. 但结果中的所有图书 包括在首页已经选好shelf的 都没有shelf属性 
            //已经在首页的书 则添加已选定的shelf  其余的都为none
            const handledBookArray = resp.map((resBook)=>{
                const markedBook = this.props.allBooks.find(markedBook=>markedBook.id===resBook.id)
                const shelf = markedBook ? markedBook.shelf : 'none'
                resBook.shelf = shelf//加一个shelf属性
                return resBook
            })
            this.setState({showingBooks:handledBookArray})
        })
        
    }

    render() {
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to='/'></Link>
                        <div className="search-books-input-wrapper">
                            <input onChange={(e) => this.searchBooks(e.target.value)} type="text" placeholder="Search by title or author" />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <BookShelf 
                        books={this.state.showingBooks}
                        updateBooks={(book, shelf)=>this.updateBook(book, shelf)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default AddBooks;