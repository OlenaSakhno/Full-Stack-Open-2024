const Notify = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <div style={{ border: "1px solid red", borderRadius: "5px" }}>
        {errorMessage}
      </div>
    );
  }
};
export default Notify;
