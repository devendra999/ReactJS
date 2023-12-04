import Image from "next/image";
import styles from "./page.module.css";
import Title from "@/components/Title";
import Questions from "./question/page";
import MultipleShow from "./multiple-show/page";

export default function Home() {
  return (
    <>
      <div className="question">
        <div className="main-wrapper">
          <Title text="Questions Accordion Single" />
          <Questions />
        </div>
        <div className="main-wrapper">
          <Title text="Questions Accordion Multiple" />
          <MultipleShow />
        </div>
      </div>
    </>
  );
}
