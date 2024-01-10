import styled from "styled-components";
import SignupForm from "../../features/authentication/SignupForm";
import Heading from "../../ui/Heading";

function NewUsers() {
  return (
    <UserWrapper>
      <Heading as="h1">Create a new user</Heading>
      <Wrapper>
        <SignupForm />
      </Wrapper>
    </UserWrapper>
  );
}

export default NewUsers;

const Wrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-width: fit-content;
  width: 100%;
  max-width: 150rem;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  min-width: fit-content;
`;
