// Email regex: /\S+@\S+\.\S+/

import styled from "styled-components";
import { Button, ButtonGroup, Form, FormRow, Input } from "../../ui";
import { useForm } from "react-hook-form";
import { useSignUp } from "./hooks/useSignUp";

interface IUserSubmitData {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignupForm() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    reset,
  } = useForm<IUserSubmitData>();

  const { signUp, isLoading } = useSignUp();

  const onSubmitSuccess = (data: IUserSubmitData) => {
    const singUpObj = {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
    };
    signUp(singUpObj, {
      onSuccess: () => reset(),
    });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmitSuccess)}>
      <FormRow label="Full name" errorMessage={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" errorMessage={errors.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S/,
              message: "please provide valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        errorMessage={errors.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "password must containt 8 characters or more",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        errorMessage={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Password need to match",
          })}
        />
      </FormRow>

      {/* type is an HTML attribute! */}
      <FormRow>
        <StyledGroup>
          <ButtonGroup>
            <Button variation="secondary" type="reset" disabled={isLoading}>
              Cancel
            </Button>
            <Button disabled={isLoading}>Create new user</Button>
          </ButtonGroup>
        </StyledGroup>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
export const StyledGroup = styled.div`
  grid-column-start: 3;
  width: max-content;
  justify-self: flex-start;
`;
