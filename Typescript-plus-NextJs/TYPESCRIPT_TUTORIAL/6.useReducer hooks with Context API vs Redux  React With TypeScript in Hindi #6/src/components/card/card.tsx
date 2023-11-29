import { useContext } from 'react';
import { ThemeContext } from '../../context/theme/theme';
import './card.css';

type CardProps = {
  children: JSX.Element;
  bgColor?: string;
  height?: string;
  padding?: string;
};

function Card(props: CardProps) {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={`card ${theme}`}
      style={{
        backgroundColor: props.bgColor,
        height: `${props.height}rem`,
        padding: `${props.padding}rem`,
      }}
    >
      {props.children}
    </div>
  );
}

export default Card;
