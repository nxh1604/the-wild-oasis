import React from "react";
import { Form, FormRow, Input, Spinner } from "../../ui";
import { useSettings, useUpdateSettings } from "./hooks";
import toast from "react-hot-toast";

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

  const { isUpdating, updateSetting } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  if (error) toast.error("Can't get data settings");

  const handleUpdate = (
    e: React.FocusEvent<HTMLInputElement>,
    filed: string
  ) => {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [filed]: Number(value) });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          defaultValue={minBookLength}
          onBlur={(e) => {
            if (Number(e.target.value) === minBookLength) return;

            handleUpdate(e, "minBookLength");
          }}
          type="number"
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          onBlur={(e) => {
            if (Number(e.target.value) === maxBookLength) return;
            handleUpdate(e, "maxBookLength");
          }}
          defaultValue={maxBookLength}
          type="number"
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          onBlur={(e) => {
            if (Number(e.target.value) === maxGuestsPerBooking) return;

            handleUpdate(e, "maxGuestsPerBooking");
          }}
          defaultValue={maxGuestsPerBooking}
          type="number"
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          onBlur={(e) => {
            if (Number(e.target.value) === breakfastPrice) return;

            handleUpdate(e, "breakfastPrice");
          }}
          defaultValue={breakfastPrice}
          type="number"
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
