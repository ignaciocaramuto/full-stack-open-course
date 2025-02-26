const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const color = notification?.type === "error" ? "red" : "green";

  const style = {
    color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    <div style={style}>
      <span>{notification?.message}</span>
    </div>
  );
};

export default Notification;
