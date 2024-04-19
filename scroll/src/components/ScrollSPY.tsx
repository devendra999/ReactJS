"use client";
import { useState, useEffect } from "react";
import Scrollspy from "react-scrollspy"; // for using react-scrollspy

const ScrollSPY = () => {
  const [activeItem, setActiveItem] = useState("section-1");

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = [
        document.getElementById("section-1").offsetTop,
        document.getElementById("section-2").offsetTop,
        document.getElementById("section-3").offsetTop,
        // Add more section IDs and their offsets as needed
      ];

      const scrollPosition = window.scrollY;

      // Find the index of the section whose offset is closest to the current scroll position
      const closestIndex = sectionOffsets.findIndex(
        (offset, index) =>
          offset > scrollPosition || index === sectionOffsets.length - 1
      );

      // Use the index to determine the active section
      setActiveItem(`section-${closestIndex + 1}`);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Scrollspy
      items={["section-1", "section-2", "section-3"]}
      currentClassName="active"
      componentTag="div"
    >
      <div id="section-1">
        <h2>Section 1</h2>
        <div style={{ width: "100%", height: "100vh", background: "#f44ff4" }}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            placeat dignissimos labore sit maxime optio ducimus dolor, provident
            explicabo architecto fugit sed saepe enim possimus at. Beatae totam
            dolor vitae hic? Sunt ab repellendus odio cum, dolorem sapiente
            asperiores provident necessitatibus nobis natus possimus impedit.
            Voluptatum voluptatem sit, fuga quidem ducimus quis aspernatur quos
            perferendis! Eos eligendi dolore quam necessitatibus sequi ipsam
            quaerat earum itaque labore minima esse autem reiciendis unde
            veniam, eum ullam aliquam repudiandae fuga ab, ut recusandae! Veniam
            eligendi vel nostrum animi laudantium ea, soluta natus eius culpa
            quaerat nisi? Error illum laboriosam possimus nam fugiat, delectus
            nulla quam minima dicta ex eos quibusdam repudiandae numquam tempore
            illo a, cupiditate minus quas dolorum. Esse deleniti asperiores
            cupiditate quaerat rerum voluptatum, rem magni maxime aspernatur
            obcaecati est veritatis omnis. Ab corrupti laboriosam quis autem est
            quo magni reiciendis corporis asperiores cum! Temporibus officiis
            expedita tempore ratione necessitatibus tempora cum neque magni
            quisquam fuga. Pariatur neque reiciendis unde blanditiis maiores
            amet, ducimus maxime dolor eius odit fugiat libero molestiae ab
            consequatur veniam magnam aliquam illum ipsum, nisi qui, assumenda
            animi aperiam. Rem, corrupti? Id, voluptates obcaecati odio culpa
            sequi enim, libero accusantium et commodi neque est fuga dolore qui
            minima quas iure. Hic unde sint corporis placeat! Et, deleniti
            nostrum mollitia aperiam quas laborum sed facilis dolorum iure
            perferendis illum, molestias a ipsa doloribus, dignissimos
            laudantium adipisci. Esse minima magnam ad quidem eveniet aut id hic
            necessitatibus ducimus! Nesciunt id eaque voluptates asperiores
            provident impedit architecto ipsa corporis modi? Expedita sequi
            ducimus assumenda.
          </p>
        </div>
      </div>
      <div id="section-2">
        <h2>Section 2</h2>
        <div style={{ width: "100%", height: "100vh", background: "#f85845" }}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            placeat dignissimos labore sit maxime optio ducimus dolor, provident
            explicabo architecto fugit sed saepe enim possimus at. Beatae totam
            dolor vitae hic? Sunt ab repellendus odio cum, dolorem sapiente
            asperiores provident necessitatibus nobis natus possimus impedit.
            Voluptatum voluptatem sit, fuga quidem ducimus quis aspernatur quos
            perferendis! Eos eligendi dolore quam necessitatibus sequi ipsam
            quaerat earum itaque labore minima esse autem reiciendis unde
            veniam, eum ullam aliquam repudiandae fuga ab, ut recusandae! Veniam
            eligendi vel nostrum animi laudantium ea, soluta natus eius culpa
            quaerat nisi? Error illum laboriosam possimus nam fugiat, delectus
            nulla quam minima dicta ex eos quibusdam repudiandae numquam tempore
            illo a, cupiditate minus quas dolorum. Esse deleniti asperiores
            cupiditate quaerat rerum voluptatum, rem magni maxime aspernatur
            obcaecati est veritatis omnis. Ab corrupti laboriosam quis autem est
            quo magni reiciendis corporis asperiores cum! Temporibus officiis
            expedita tempore ratione necessitatibus tempora cum neque magni
            quisquam fuga. Pariatur neque reiciendis unde blanditiis maiores
            amet, ducimus maxime dolor eius odit fugiat libero molestiae ab
            consequatur veniam magnam aliquam illum ipsum, nisi qui, assumenda
            animi aperiam. Rem, corrupti? Id, voluptates obcaecati odio culpa
            sequi enim, libero accusantium et commodi neque est fuga dolore qui
            minima quas iure. Hic unde sint corporis placeat! Et, deleniti
            nostrum mollitia aperiam quas laborum sed facilis dolorum iure
            perferendis illum, molestias a ipsa doloribus, dignissimos
            laudantium adipisci. Esse minima magnam ad quidem eveniet aut id hic
            necessitatibus ducimus! Nesciunt id eaque voluptates asperiores
            provident impedit architecto ipsa corporis modi? Expedita sequi
            ducimus assumenda.
          </p>
        </div>
      </div>
      <div id="section-3">
        <h2>Section 3</h2>
        <div style={{ width: "100%", height: "100vh", background: "#f85255" }}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            placeat dignissimos labore sit maxime optio ducimus dolor, provident
            explicabo architecto fugit sed saepe enim possimus at. Beatae totam
            dolor vitae hic? Sunt ab repellendus odio cum, dolorem sapiente
            asperiores provident necessitatibus nobis natus possimus impedit.
            Voluptatum voluptatem sit, fuga quidem ducimus quis aspernatur quos
            perferendis! Eos eligendi dolore quam necessitatibus sequi ipsam
            quaerat earum itaque labore minima esse autem reiciendis unde
            veniam, eum ullam aliquam repudiandae fuga ab, ut recusandae! Veniam
            eligendi vel nostrum animi laudantium ea, soluta natus eius culpa
            quaerat nisi? Error illum laboriosam possimus nam fugiat, delectus
            nulla quam minima dicta ex eos quibusdam repudiandae numquam tempore
            illo a, cupiditate minus quas dolorum. Esse deleniti asperiores
            cupiditate quaerat rerum voluptatum, rem magni maxime aspernatur
            obcaecati est veritatis omnis. Ab corrupti laboriosam quis autem est
            quo magni reiciendis corporis asperiores cum! Temporibus officiis
            expedita tempore ratione necessitatibus tempora cum neque magni
            quisquam fuga. Pariatur neque reiciendis unde blanditiis maiores
            amet, ducimus maxime dolor eius odit fugiat libero molestiae ab
            consequatur veniam magnam aliquam illum ipsum, nisi qui, assumenda
            animi aperiam. Rem, corrupti? Id, voluptates obcaecati odio culpa
            sequi enim, libero accusantium et commodi neque est fuga dolore qui
            minima quas iure. Hic unde sint corporis placeat! Et, deleniti
            nostrum mollitia aperiam quas laborum sed facilis dolorum iure
            perferendis illum, molestias a ipsa doloribus, dignissimos
            laudantium adipisci. Esse minima magnam ad quidem eveniet aut id hic
            necessitatibus ducimus! Nesciunt id eaque voluptates asperiores
            provident impedit architecto ipsa corporis modi? Expedita sequi
            ducimus assumenda.
          </p>
        </div>
      </div>
    </Scrollspy>
  );
};

export default ScrollSPY;
