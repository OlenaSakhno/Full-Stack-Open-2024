import { useNotificationDispatch } from "../NotificationContext";

const Button = ({ type, label }) => {
  const dispatch = useNotificationDispatch();
  return (
    <button onClick={() => dispatch({ type })} type={type}>
      {label}
    </button>
  );
};

export default Button;
