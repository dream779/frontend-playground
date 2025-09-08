import { List } from "antd";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";

/**
 * 首页导航
 */
export default function Home() {
  const nav = useNavigate();
  
  return (
    <div className={styles.container}>
      <List className={styles.list}>
        <List.Item>
          <div className={styles.item} onClick={() => nav("/gemini")}>
            Gemini
          </div>
        </List.Item>
        <List.Item>
          <div className={styles.item} onClick={() => nav("/threejs")}>
            Three.js
          </div>
        </List.Item>
        <List.Item>
          <div className={styles.item} onClick={() => nav("/login")}>
            Login
          </div>
        </List.Item>
      </List>
    </div>
  );
}
