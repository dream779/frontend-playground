import { Button, Form, Input } from "antd";

export default function Login() {
  return (
    <div className="container">
      <div className="login">
        <div className="title">登录</div>
        <Form>
          <Form.Item name="username" label="用户名">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录2
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
