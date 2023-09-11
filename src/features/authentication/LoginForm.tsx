import { useState } from "react";

import { Button, Form, FormRowVertical, Input, SpinnerMini } from "../../ui";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("nxh1604@example.com");
  const [password, setPassword] = useState("qweewq123321");

  const { login, isLogingIn } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogingIn}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLogingIn ? <SpinnerMini /> : "Log in"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
