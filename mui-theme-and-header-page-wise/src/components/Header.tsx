import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
        <header className='bg-slate-200 border-b-2 py-4 '>
            <div className="container">
                <ul className='flex items-center'>
                    <li>
                        <Link href="/home"><Button>Home</Button></Link>
                    </li>
                    <li>
                        <Link href="/about"><Button>About us</Button></Link>
                    </li>
                    <li>
                        <Link href="service"><Button>Services</Button></Link>
                    </li>
                    <li>
                        <Link href="contact"><Button>Contact us</Button></Link>
                    </li>
                    <li>
                        <Link href="inquiry"><Button>Inquiry</Button></Link>
                    </li>
                </ul>
            </div>
        </header>
    </>
  )
}

export default Header