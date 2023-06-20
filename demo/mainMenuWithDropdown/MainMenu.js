import React from 'react'

const menu = [
    {
        'menuitem': 'Home',
        'menuurl': '/home.html',
    },
    {
        'menuitem': 'About',
        'menuurl': '/about.html',
    },
    {
        'menuitem': 'Services',
        'menuurl': '/services.html',
        'submenu': [
            {
                'menuitem': 'submenu one',
                'menuurl': '/submenuOne.html',
            },
            {
                'menuitem': 'submenu two',
                'menuurl': '/submenuTwo.html',
            },
            {
                'menuitem': 'submenu three',
                'menuurl': '/submenuThree.html',
                'submenu' : [
                    {
                        'menuitem': 'submenu Three one',
                        'menuurl': '/submenuThreeOne.html',
                    },
                    {
                        'menuitem': 'submenu Three two',
                        'menuurl': '/submenuThreeTwo.html',
                    },
                    {
                        'menuitem': 'submenu Three Three',
                        'menuurl': '/submenuThreeThree.html',
                    },
                    {
                        'menuitem': 'submenu Three four',
                        'menuurl': '/submenuThreeFour.html',
                    },
                ],
            },
        ],
    },
    {
        'menuitem': 'Inquiery',
        'menuurl': '/inquiry.html',
    },
    {
        'menuitem': 'Contact',
        'menuurl': '/contact.html',
    },
];

const MainMenu = () => {
  return (
    <div className="section">
        <div className="container">
            <div className="mainmenu">
                <ul>
                      {
                          menu.map((e, i) => {
                              const { menuitem, menuurl, submenu } = e;
                              return (
                                  <li key={i}><a href={menuurl}>{menuitem}</a>

                                      {e.submenu ? <ul>
                                          {submenu.map((event, index) => {
                                              const { menuitem, menuurl } = event;
                                              return <li key={index}><a href={menuurl}>{menuitem}</a>
                                                 
                                                  {event.submenu ? <ul>
                                                      {event.submenu.map((hish, index) => {
                                                          const { menuitem, menuurl } = hish;
                                                          return <li key={index}><a href={menuurl}>{menuitem}</a></li>
                                                      })}
                                                  </ul> : ''}
                                                  
                                              </li>
                                          })}
                                      </ul> : ''}

                                  </li>
                              )
                          })
                      }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default MainMenu