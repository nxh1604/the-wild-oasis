import styled from "styled-components";
import UpdateSettingsForm from "../../features/settings/UpdateSettingsForm";
import Heading from "../../ui/Heading";

function Settings() {
  return (
    <SettingsWrapper>
      <Heading as="h1">Update hotel settings</Heading>
      <Wrapper>
        <UpdateSettingsForm />
      </Wrapper>
    </SettingsWrapper>
  );
}

export default Settings;

const Wrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-width: fit-content;
  width: 100%;
  max-width: 150rem;
`;

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  min-width: fit-content;
`;
