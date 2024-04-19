import Image from "next/image";
import styles from "./page.module.css";
import ScrollClassAddRemove from "@/components/ScrollClassAddRemove";
import Sticky from "@/components/Sticky";
import ScrollSPY from "@/components/ScrollSPY";
import ScrollSPYWithClick from "@/components/ScrollSPYWithClick";
import ShowOnScroll from "@/components/ShowOnScroll";
import VerticalTimelineActiveOnscroll from "@/components/VerticalTimelineActiveOnscroll";

export default function Home() {
  return (
    <>
      <ScrollClassAddRemove />
      {/* <Sticky /> */}
      {/* <ScrollSPYWithClick /> */}
      {/* <ScrollSPY /> */}
      {/* <ScrollClassAddRemove /> */}
      {/* <ShowOnScroll /> */}
      {/* <VerticalTimelineActiveOnscroll /> */}
    </>
  );
}
