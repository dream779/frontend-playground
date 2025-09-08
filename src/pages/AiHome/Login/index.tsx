import { Button, Form, Input } from "antd";
import styles from "./index.module.less";
import { Link } from "react-router-dom";
import request from "../../../utils/http";
export default function Login() {
  const handleClick = () => {
    request.get("/api/hello").then((res) => {
      console.log(res);
    });
  };
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage:
          "url('https://res.volccdn.com/obj/volc-console-fe/vconsole-static/auth.ydl_bg3.4a94ccf7.jpeg')",
      }}
    >
      <div className={styles.login}>
        <div className={styles.title}>账号登录</div>
        <Form
          size="large"
          onFinish={(values: { username: string; password: string }) => {
            console.log("登录", values);
            handleClick();
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button
              className={styles.loginBtn}
              type="primary"
              htmlType="submit"
              size="large"
            >
              登录
            </Button>
          </Form.Item>
          <div className={styles.footer}>
            <div>
              还没有账号？
              <Link to="/register">去注册</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
