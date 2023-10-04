import { Button, ButtonGroup, Form, FormRow, Input, Spinner } from "../../ui";
import { useSettings, useUpdateSettings } from "./hooks";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      maxBookLength = 0,
      minBookLength = 0,
      maxGuestsPerBooking = 0,
      breakfastPrice = 0,
    } = {},
    error,
  } = useSettings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<ISettingData>>();

  const { isUpdating, updateSetting } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  if (error) toast.error("Can't get data settings");

  const onSubmit: SubmitHandler<Partial<ISettingData>> = (data) => {
    const updateObject = {};
    if (minBookLength !== Number(data.minBookLength))
      Object.assign(updateObject, { minBookLength: data.minBookLength });
    if (maxBookLength !== Number(data.maxBookLength))
      Object.assign(updateObject, { maxBookLength: data.maxBookLength });
    if (maxGuestsPerBooking !== Number(data.maxGuestsPerBooking))
      Object.assign(updateObject, {
        maxGuestsPerBooking: data.maxGuestsPerBooking,
      });
    if (breakfastPrice !== Number(data.breakfastPrice))
      Object.assign(updateObject, { breakfastPrice: data.breakfastPrice });

    if (Object.keys(updateObject)[0]) updateSetting(updateObject);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Minimum nights/booking"
        errorMessage={errors.minBookLength?.message}>
        <Input
          disabled={isUpdating}
          defaultValue={minBookLength}
          {...register("minBookLength", {
            required: "this field is required",
          })}
          type="number"
          id="min-nights"
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        errorMessage={errors.maxBookLength?.message}>
        <Input
          disabled={isUpdating}
          {...register("maxBookLength", {
            required: "this field is required",
          })}
          defaultValue={maxBookLength}
          type="number"
          id="max-nights"
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        errorMessage={errors.maxGuestsPerBooking?.message}>
        <Input
          disabled={isUpdating}
          {...register("maxGuestsPerBooking", {
            required: "this field is required",
          })}
          defaultValue={maxGuestsPerBooking}
          type="number"
          id="max-guests"
        />
      </FormRow>
      <FormRow
        label="Breakfast price"
        errorMessage={errors.breakfastPrice?.message}>
        <Input
          disabled={isUpdating}
          {...register("breakfastPrice", {
            required: "this field is required",
          })}
          defaultValue={breakfastPrice}
          type="number"
          id="breakfast-price"
        />
      </FormRow>
      <FormRow>
        <ButtonGroup
          style={{ gridColumnStart: 3, display: "flex", width: "max-content" }}>
          <Button type="button" variation="secondary" onClick={() => reset()}>
            Cancel
          </Button>
          <Button type="submit">Update setting</Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
