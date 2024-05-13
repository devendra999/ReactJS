
'use client'
import {Books, BooksHOC, SongsHOC} from '../components/hoc';
import {CounterGreen, CounterRed} from '../components/counterHoc';

export default function Home() {
    
  return (
    <>
      <div>
        <h1>Hello HOC</h1>
        <BooksHOC name='books' />
        <SongsHOC name='songs' />
      </div>
      <div>
        <h1>Hello HOC counter</h1>
        <CounterRed  /><br /><br />
        <CounterGreen  />
      </div>
    </>
  )
}
