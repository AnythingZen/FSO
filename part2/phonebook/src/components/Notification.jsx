const Notification = ({ message }) => {
  if (message === null) {
    return;
  }

  const messageError = {
    border: "5px solid red",
    borderRadius: 12,
    fontSize: 36,
    color: "red",
    fontWeight: "bold",
    padding: "20px",
    width: "50%",
    textAlign: "center",
    backgroundColor: "grey",
  };

  const messageSuccess = {
    border: "5px solid green",
    borderRadius: 12,
    fontSize: 36,
    color: "green",
    fontWeight: "bold",
    padding: "20px",
    width: "50%",
    textAlign: "center",
    backgroundColor: "lightgrey",
  };

  const displayStyle =
    message.search("Added") > -1 ? messageSuccess : messageError;

  return <p style={displayStyle}>{message}</p>;
};

export default Notification;
