import React, { useState } from "react";
import { Button, Form, Input } from "antd";

export default function RegisterForm({ users, onRegister }) {
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState(null);
  function register(values) {
    const email = values.email.trim().toLowerCase();
    if (values.password !== values.confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }
    if (users.find(user => user.email === email)) {
      setError("Email này đã được đăng ký.");
      return;
    }
    const user = {name: values.name.trim(),
      email: email,
      password: values.password,
    };
    onRegister(user);
    setNewUser(user);
    setError("");
  }
  return (
    <div>
      <Form name="register"layout="vertical"onFinish={register}>
        <h2>Đăng ký</h2>
        <Form.Item label="Họ và tên"name="name"
  rules={[
    {
      required: true,
      whitespace: true,
      message: "Nhập họ tên.",
    },
  ]}
>
      <Input autoComplete="name" />
        </Form.Item>
        <Form.Item label="Email"name="email"
          rules={[
            { required: true, message: "Nhập email." },
            { type: "email", message: "Email không hợp lệ." },
          ]}
        >
          <Input autoComplete="email" />
        </Form.Item>
        <Form.Item label="Mật khẩu"name="password"
          rules={[
            { required: true, message: "Nhập mật khẩu." },
            {
              min: 8,
              message: "Mật khẩu cần ít nhất 8 ký tự.",
            },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item label="Xác nhận mật khẩu"name="confirmPassword"
          rules={[
            { required: true, message: "Nhập lại mật khẩu." },
          ]}>
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <p className="error">{error}</p>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form>
      {newUser && (
        <div className="info">
          <h3>Đăng ký thành công</h3>
          <p>Họ và tên: {newUser.name}</p>
          <p>Email: {newUser.email}</p>
        </div>
      )}
    </div>
  );
}