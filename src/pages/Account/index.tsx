// import Heading from "../ui/Heading";
// import Row from "../ui/Row";

import styled from "styled-components";
import UpdatePasswordForm from "../../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../../features/authentication/UpdateUserDataForm";
import { Heading } from "../../ui";

function Account() {
  return (
    <AccountWrapper>
      <Heading as="h1">Update your account</Heading>

      <Wrapper>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserWrapper>
          <UpdateUserDataForm />
        </UpdateUserWrapper>
      </Wrapper>

      <Wrapper>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordWrapper>
          <UpdatePasswordForm />
        </UpdatePasswordWrapper>
      </Wrapper>
    </AccountWrapper>
  );
}

export default Account;

const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  min-width: fit-content;
`;

const Wrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-width: fit-content;
  width: 100%;
  max-width: 150rem;
`;

const UpdateUserWrapper = styled.div`
  width: 100%;
  max-width: 150rem;
`;

const UpdatePasswordWrapper = styled.div`
  width: 100%;
  max-width: 150rem;
`;
