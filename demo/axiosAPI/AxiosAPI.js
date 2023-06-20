import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

const AxiosAPI = () => {
    const [user, setUser] = useState([]);

    const getUser = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                setUser(res.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getUser();
    }, [])
    

  return (
    <div className="section">
        <div className="container">
            <h4>Axios API Fetch</h4>
              <table className='table'>
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Website</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          user.map((e, i) => {
                              const { name, username, email, phone, website } = e;
                              return (
                                  <tr key={i}>
                                      <td>{name}</td>
                                      <td>{username}</td>
                                      <td>{email}</td>
                                      <td>{phone}</td>
                                      <td>{website}</td>
                                  </tr>
                              )
                          })
                      }
                  </tbody>
              </table>
        </div>
    </div>
  )
}

export default AxiosAPI