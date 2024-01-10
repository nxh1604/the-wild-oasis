import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { StyledGroup } from "./SignupForm";
import { ButtonGroup } from "../../ui";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm<{
    password: string;
    passwordConfirm: string;
  }>();
  const { errors } = formState;

  const { updateUser, isLoading } = useUpdateUser();

  function onSubmit({ password }: { password: string }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Password (min 8 characters)" errorMessage={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" errorMessage={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <StyledGroup>
          <ButtonGroup>
            <Button onClick={() => reset()} type="reset" variation="secondary">
              Cancel
            </Button>
            <Button disabled={isLoading}>Update password</Button>
          </ButtonGroup>
        </StyledGroup>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
