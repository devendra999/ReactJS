import { useProductContext } from "../context/productContext";
import SingleUser from "./SingleUser";


const About = () => {
  const { isLoading, featuredProducts, products } = useProductContext();
  
  if (isLoading) {
    return <h2>Loading.....</h2>
  }


  return (
    <>
      <h1>about</h1>
      {featuredProducts.map((elem, i) => {
        return <SingleUser key={i} {...elem} />
      })}
    </>
  )
}

export default About