export default function Die(props) {
  const styles = {
    backgroundColor: props.isClicked ? "#d63384" : "#f8d4e0",
    color: props.isClicked ? "white" : "#333",
    boxShadow: props.isClicked
      ? "inset 4px 4px 8px rgba(0, 0, 0, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.4)"
      : "4px 4px 8px #d8a6b9, -4px -4px 8px #fff"
  };

  return (
    <button
      style={styles}
      onClick={() => props.hold(props.id)}
    >
      {props.value}
    </button>
  );
}
