import styles from "../UI/Background.module.css";
const Background = (props) => {
  return (
    <body>
      <main>
        <div className={styles["glass"]}>{props.children}</div>
      </main>
    </body>
  );
};
export default Background;
