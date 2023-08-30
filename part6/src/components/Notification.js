import { useNotificationValue } from "../NotificationContext";
const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  const notification = useNotificationValue();
  console.log("Notification state:", notification);

  if (!notification) return null; // Return null if no notification

  return <div style={style}>{notification}</div>;
};

export default Notification;
