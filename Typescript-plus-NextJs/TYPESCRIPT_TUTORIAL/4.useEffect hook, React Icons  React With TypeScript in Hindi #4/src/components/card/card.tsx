import './card.css';

type CardProps = {
  children: JSX.Element;
  bgColor?: string;
  height?: string;
  padding?: string;
};

function Card(props: CardProps) {
  return (
    <div
      className="card"
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
