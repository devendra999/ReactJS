import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="bg-dark py-3 mt-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a href="#" className="nav-link text-white px-2">Home</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-white px-2">Features</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-white px-2">Pricing</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-white px-2">FAQs</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-white px-2">About</a></li>
                </ul>
                <p className="text-center text-white">© 2022 Company, Inc</p>
            </footer>
        </>
    )
}

export default Footer