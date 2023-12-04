import Image from "next/image";
import styles from "./page.module.css";
import Tour from "./tour/page";

export default function Home() {
  return (
    <>
      <h1>Hello tour</h1>
      <Tour />
    </>
  );
}
