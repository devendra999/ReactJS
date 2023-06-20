import React, { useState } from 'react'
import './accordion.scss'

const accData = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
        "userId": 1,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    },
    {
        "userId": 1,
        "id": 5,
        "title": "nesciunt quas odio",
        "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    },
];

const Accordion = () => {
    const [value, setvalue] = useState(1);


  return (
    <>
        <div className="accordion-section">
            <div className="container">
                <div className="acc-wrapper">

                    {
                        accData.map((e) => {
                            const { id, title, body } = e;
                            return (
                                <div className={`single-acc ${value == id ? 'active' : ''}`} key={id} >
                                    <div className="acc-title" onClick={() => setvalue(id)}>{title}</div>
                                    <div className="acc-content">
                                        <div className='sdf'>
                                            {body}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Accordion