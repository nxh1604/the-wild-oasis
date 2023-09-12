import { useState } from "react";

import Button from "../../ui/Button/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./hooks/useUser";
import { ButtonGroup } from "../../ui";
import { StyledGroup } from "./SignupForm";
import { useUpdateUser } from "./hooks/useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();

  let email = "",
    currentFullName = "";
  if (user?.email && user?.user_metadata?.fullName) {
    email = user.email;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    currentFullName = user.user_metadata.fullName;
  }

  const { updateUser, isLoading } = useUpdateUser();
  const [fullName, setFullName] = useState<string>(currentFullName);
  const [avatar, setAvatar] = useState<null | File>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!avatar) {
      updateUser({ fullName });
      return;
    }
    updateUser({ fullName, avatar });
  }
  const handleReset = () => {
    setAvatar(null);
    setFullName(currentFullName);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input type="email" value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          id="fullName"
          type="text"
          value={fullName}
          disabled={isLoading}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          disabled={isLoading}
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) setAvatar(e.target.files[0]);
          }}
        />
      </FormRow>
      <FormRow>
        <StyledGroup>
          <ButtonGroup>
            <Button
              variation="secondary"
              type="reset"
              disabled={isLoading}
              onClick={handleReset}>
              Cancel
            </Button>
            <Button
              disabled={isLoading || (fullName === currentFullName && !avatar)}>
              Create new user
            </Button>
          </ButtonGroup>
        </StyledGroup>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
