import { Button, FileInput, Form, FormRow, Input, Textarea } from "../../ui";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { styled } from "styled-components";

import { ICabinData } from "../../services/apiCabins/apiCabins";
import { useCreateCabin, useEditCabin } from "./hooks";

function CabinCreateOrEditForm({
  cabin = null,
}: {
  cabin?: ICabinData | null;
}) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isEditing || isCreating;
  const editId = cabin ? cabin.id : null;

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

    if (cabin && editId) {
      const editedCabin = { ...data, image };
      editCabin(
        { editedCabin, editId },
        {
          onSuccess: () => reset(),
        }
      );
      return;
    }

    createCabin(
      { ...data, image },
      {
        onSuccess: () => reset(),
      }
    );
  };

  const onError = (err: FieldErrors) => {
    console.log(err);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button variation="primary" disabled={isWorking}>
          {cabin
            ? isEditing
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

export default CabinCreateOrEditForm;

const StyledFormButton = styled.div`
  padding-top: 1.2rem;
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
