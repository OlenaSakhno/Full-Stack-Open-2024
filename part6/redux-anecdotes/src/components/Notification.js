import { useSelector } from "react-redux";

const Notification = ({ id }) => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const notification = anecdotes.find((anecdote) => anecdote.id === id);
  const style = {
    border: "1px solid green",
    borderRadius: "0.3rem",
    backgroundColor: "#D0FFBC",
    color: "green",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>You voted: {notification.content}</div>;
};

export default Notification;
