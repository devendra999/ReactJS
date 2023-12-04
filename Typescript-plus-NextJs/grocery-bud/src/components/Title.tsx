import React from "react";

interface TitleProps {
  text: string;
}

const Title = (props: TitleProps) => {
  return <h3>{props.text}</h3>;
};

export default Title;
