import styles from "./privateProfile.module.css";

const PrivateProfile = (props) => {
  return (
    <div className={styles["screen"]}>
      <div className={styles["content"]}>
        <div className={styles["data"]}>
          <h1 className={styles["heading"]}>Hello , {props.data.username}</h1>
          <h2> Username : {props.data.email}</h2>
          <h3> You Are Access to the private data in the route</h3>

          <button className={styles["btn"]} onClick={props.onClick}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default PrivateProfile;
