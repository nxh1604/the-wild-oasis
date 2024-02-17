import styled from "styled-components";
import LoginForm from "../../features/authentication/LoginForm";
import { Heading, Logo } from "../../ui";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    padding: 0 1.2rem;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as={"h4"}>Log into your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
