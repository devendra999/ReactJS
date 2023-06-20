import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import CustomModal from '../customModal/CustomModal';
import Tooltip from '../customTooltip/Tooltip';

const AsyncAPI = () => {
    const [user, setuser] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };



    const getuser = async () => {
        try {
            let res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            setuser(data)

        } catch (error) {
            console.log(error);
        }
    };

    

    useEffect(() => {
        getuser();
    }, [])
    


  return (
    <div className="section">
        <div className="container">
            <h4>Async API Fetch</h4>
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
                <button onClick={openModal}>Open custom Modal</button>
              
              <CustomModal isOpen={isOpen} onClose={closeModal}>
                  <h2>Custom Modal</h2>
                  <p>This is a custom modal created with React.js.</p>
              </CustomModal>

              <div className="mt-5">
                  <Tooltip text="This is a tooltip">
                      <button>custo tooltip</button>
                  </Tooltip>
              </div>
        </div>
    </div>
  )
}

export default AsyncAPI