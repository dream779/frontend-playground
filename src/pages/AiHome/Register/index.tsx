import { Button, Form, Input } from "antd";
import styles from "./index.module.less";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage:
          "url('https://res.volccdn.com/obj/volc-console-fe/vconsole-static/auth.ydl_bg3.4a94ccf7.jpeg')",
      }}
    >
      <div className={styles.login}>
        <div className={styles.title}>注册</div>
        <Form
          size="large"
          onFinish={() => {
            console.log("注册");
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
            wrapperCol={{ span: 24 }}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "确认密码" }]}
          >
            <Input.Password placeholder="确认密码" />
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
              已有账号？
              <Link to="/login">去登录</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
