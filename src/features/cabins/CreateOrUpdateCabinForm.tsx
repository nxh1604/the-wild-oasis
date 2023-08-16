import { Button, FileInput, Form, FormRow, Input, Textarea } from "../../ui";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { styled } from "styled-components";

import { ICabinData } from "../../services/apiCabins/apiCabins";
import { useCreateCabin, useUpdateCabin } from "./hooks";

function CreateOrUpdateCabinForm({
  cabin = null,
  closeModal,
}: {
  cabin?: ICabinData | null;
  closeModal?: () => void;
}) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  const isWorking = isUpdating || isCreating;
  const updateId = cabin ? cabin.id : null;

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ICabinData>({
    values: cabin ? { ...cabin } : undefined,
  });

  const onSubmit: SubmitHandler<ICabinData> = (data) => {
    const image = data.image instanceof FileList ? data.image[0] : data.image;

    if (cabin && updateId) {
      const updatedCabin = { ...data, image };
      updateCabin(
        { updatedCabin, updateId },
        {
          onSuccess: () => {
            closeModal?.();
            reset();
          },
        }
      );
      return;
    }
    createCabin(
      { ...data, image },
      {
        onSuccess: () => {
          closeModal?.();
          reset();
        },
      }
    );
  };

  const onError = (err: FieldErrors) => {
    console.log(err);
  };

  return (
    <Form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit, onError)}
      type={`${closeModal ? "modal" : "regular"}`}>
      <FormRow label="Cabin name" errorMessage={errors.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
          placeholder="nxh"
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        errorMessage={errors.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity field should not less than 1",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Regular price"
        errorMessage={errors.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Price field should not less than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" errorMessage={errors.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) => {
              if (value === 0) return true;
              return (
                (value && Number(value) <= Number(getValues("regularPrice"))) ||
                "Discount should less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        errorMessage={errors.description?.message}>
        <Textarea
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" errorMessage={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: !cabin && "this field is required",
          })}
        />
      </FormRow>

      <StyledFormButton>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => closeModal?.()}
          variation="secondary"
          type="reset">
          Cancel
        </Button>
        <Button variation="primary" disabled={isWorking}>
          {cabin
            ? isUpdating
              ? "Editing cabin..."
              : "Edit cabin"
            : isCreating
            ? "Creating new cabin..."
            : "Add new cabin"}
        </Button>
      </StyledFormButton>
    </Form>
  );
}

export default CreateOrUpdateCabinForm;

const StyledFormButton = styled.div`
  padding-top: 1.2rem;
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
