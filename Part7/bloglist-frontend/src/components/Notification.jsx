import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null;
  }

  return (
    <Alert variant={notification.type === "error" ? "danger" : "success"}>
      {notification.message}
    </Alert>
  );
};

export default Notification;
