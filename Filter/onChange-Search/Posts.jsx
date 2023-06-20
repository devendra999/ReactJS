import React, { useEffect, useState } from 'react'
import SearchPost from './SearchPost';

const Posts = () => {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
      const loadData = async () => {
        let res = await fetch("https://jsonplaceholder.typicode.com/posts")
        setData(await res.json());
      }
      loadData();
    }, [])

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }
  
  const filteredPost = data.filter((post) => {
    return (post.title.toLowerCase().includes(inputValue.toLowerCase()))
  });




  return (
    <section>
        <div className="container">

            <SearchPost 
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter something"
            />


            {filteredPost.length > 0 && filteredPost.map((post, index) => {
                return <div className="single-post" key={index}>
                  <h5>{post.title}</h5>
                  <p>{post.body}</p>
                </div>
            })}

          {!filteredPost && data.map((post, index) => {
                return <div className="single-post" key={index}>
                  <h5>{post.title}</h5>
                  <p>{post.body}</p>
                </div>
            })}
        </div>
    </section>
  )
}

export default Posts