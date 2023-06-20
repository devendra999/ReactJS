import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './showData.scss';

const projectData = [
    {
        id: 1,
        name: 'EVO SaaS',
        devlope: 'Web Application',
        asignto: [
            {
                'image': '../images/one.jpg',
                'assignname': 'Fredrick Adams'
            },
            {
                'image': '../images/two.jpg',
                'assignname': 'Joyce Freeman'
            },
            {
                'image': '../images/three.jpg',
                'assignname': 'Clayton Bates'
            },
            {
                'image': '../images/four.jpg',
                'assignname': 'Heval Sdls'
            },
        ],
        progress: '80%',

    },
    {
        id: 2,
        name: 'AIA Bill App',
        devlope: 'Mobile Application',
        asignto: [
            {
                'image': '../images/five.jpeg',
                'assignname': 'cerlyn prenkies'
            },
            {
                'image': '../images/six.jpeg',
                'assignname': 'Gabrier Frazier'
            },
        ],
        progress: '45%',

    },
    {
        id: 3,
        name: 'IOP Web',
        devlope: 'Web Backend Application',
        asignto: [
            {
                'image': '../images/seven.jpeg',
                'assignname': 'Debra Hamilton'
            },
            {
                'image': '../images/eight.jpeg',
                'assignname': 'Devendra Prajapati'
            },
            {
                'image': '../images/nine.jpeg',
                'assignname': 'Ron Vargas'
            },
            {
                'image': '../images/ten.jpeg',
                'assignname': 'Kihsdf ciado'
            },
            {
                'image': '../images/eleven.jpeg',
                'assignname': 'Losrui Camron'
            },
        ],
        progress: '73%',

    },
    {
        id: 4,
        name: 'Octonine POS',
        devlope: 'Backend Application',
        asignto: [
            {
                'image': '../images/one.jpg',
                'assignname': 'Britely Hale'
            },
            {
                'image': '../images/two.jpg',
                'assignname': 'Devendra Prajapati'
            },
            {
                'image': '../images/three.jpg',
                'assignname': 'Sammantha Phillips'
            },
            {
                'image': '../images/four.jpg',
                'assignname': 'Heval Sdls'
            },
        ],
        progress: '21%',

    },
];



const APIDataShowWithCondition = () => {
    const [user, setuser] = useState([])

    const getuser = async () => {
        try {
            let res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            setuser(data)

        } catch (error) {
            console.log(error);
        }
    };

    
    // const limitData = asignto.slice(0, 3);
    // console.log(limitData);


    useEffect(() => {
        getuser();
    }, [])
  return (
    <>
        <div className="section">
            <div className="container">
                <h3>API DATA show with condition</h3>
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
                                          <td>{username == 'Bret' ? 'Devendra999' : username}</td>
                                          <td>{email}</td>
                                          <td>{phone == '1-770-736-8031 x56442' ? '9998858662' : phone }</td>
                                          <td>{username == 'Antonette' && website == 'anastasia.net' ? '-----' : website}</td>
                                      </tr>
                                  )
                              })
                          }
                      </tbody>
                  </table>

                  <div className="mt-4">
                    <h4>Another Demo</h4>
                    <table className="table">
                        <tbody>
                            {
                                projectData.map((e, i) => {
                                    const { id, name, devlope, asignto, progress} = e;
                                    return <tr key={id}>
                                        <td>{name}</td>
                                        <td>{devlope}</td>
                                        <td>
                                            <div className="all-person">
                                                {
                                                    asignto.slice(0, 3).map((event, index) => {
                                                        const { image, assignname } = event;
                                                        return <div className="person" key={index}>
                                                            <img style={{ width: '40px', height: '40px', borderRadius: '100px', objectFit: 'cover' }} src={image} alt="" /> <span className="name">{assignname}</span>
                                                        </div>
                                                    })
                                                }
                                                {asignto.length > 3 && <div className='person'>{`+${asignto.length - 3}`}<span class="name">{`+${asignto.length - 3} More`}</span></div>}
                                            </div>
                                        </td>
                                        <td>{progress}</td>
                                    </tr>
                                })
                            }
                            
                        </tbody>
                    </table>
                  </div>
            </div>
        </div>
    </>
  )
}

export default APIDataShowWithCondition