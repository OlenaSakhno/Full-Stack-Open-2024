export const Button = (props) => {
  const { handleClick, text } = props;
  return (
    <button
      style={{
        margin: "5px 5px 10px 0",
        backgroundColor: "#0F6292",
        borderRadius: "5px",
        color: "#fff",
        border: "2px solid #0F6292",
        padding: "2px 2px 2px 2px",
      }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
