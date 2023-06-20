import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick.scss'
const slideImages = [
    {
        id: 1,
        imageurl: 'https://images.pexels.com/photos/16904525/pexels-photo-16904525/free-photo-of-woman-sitting-in-river.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
        id: 2,
        imageurl: 'https://images.pexels.com/photos/16354604/pexels-photo-16354604/free-photo-of-landscape-man-couple-love.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
        id: 3,
        imageurl: 'https://images.pexels.com/photos/16790806/pexels-photo-16790806/free-photo-of-wood-sea-road-landscape.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
        id: 4,
        imageurl: 'https://images.pexels.com/photos/16763284/pexels-photo-16763284/free-photo-of-wood-landscape-sun-countryside.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
];

const SlickCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
    };

  return (
    <>
        <div className="section">
            <div className="container">
                <h4>Slick Carousel</h4>
                  <Slider {...settings}>

                    {
                        slideImages.map((e) => {
                            return <div key={e.id}>
                                <img src={e.imageurl} alt="Image 1" />
                            </div>
                        })
                    }
                  </Slider>
            </div>
        </div>
    </>
  )
}

export default SlickCarousel