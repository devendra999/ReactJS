'use client'
import React from 'react'


const DB = {
    'books': [
        {title: 'Harry Porter', author: 'Rowling'},
        {title: 'Outlier', author: 'Maxwell'}
    ],
    'songs': [
        {title: 'Du Hast', album: 'Sehnchut'},
        {title: 'Desert Rose', album: 'Brand new day'}
    ]
}

const Books = ({books}) => {
    console.log(books)
  return (
    <div>
        <h1>Books</h1>
        <ul>
            {books?.map(book=><li key={book.title}>Book: {book.title}<br/>Author: {book.author}</li>)}
        </ul>
    </div>
  )
}

const Songs = ({songs}) => {
    console.log(songs)
  return (
    <div>
        <h1>Songs</h1>
        <ul>
            {songs?.map(song=><li key={songs.title}>Song: {song.title}<br/>Album: {song.album}</li>)}
        </ul>
    </div>
  )
}


const withHOC = (Component, classes, getData) => {
    console.log(getData)
    
    return (props) => {
        
        return <div className={classes}>
            <Component {...getData(props.name)}></Component>
        </div>
    }
}



const BooksHOC = withHOC(Books, 'dark', (name)=>({[name]: DB[name]}));
const SongsHOC = withHOC(Songs, 'light', (name)=>({[name]: DB[name]}));



export {Books, Songs, BooksHOC, SongsHOC};