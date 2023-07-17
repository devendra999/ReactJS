import { useProductContext } from "../context/productContext";


const About = () => {
  const {name} = useProductContext();
  
  return (
    <>
      <h1>about</h1>
      <h1>{name}</h1>
    </>
  )
}

export default About