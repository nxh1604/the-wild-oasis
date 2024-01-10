import styled from "styled-components";
import { Filter, SortBy, TableOperations } from "../../ui";

function BookingTableOperations() {
  return (
    <StyledTableOperations>
      <Filter
        field="status"
        options={[
          { value: "all", label: "All" },
          { value: "unconfirmed", label: "Unconfirmed" },
          { value: "checked-in", label: "Checked in" },
          { value: "checked-out", label: "Checked out" },
        ]}
        resetPage={true}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </StyledTableOperations>
  );
}

export const StyledTableOperations = styled(TableOperations)`
  flex-grow: 1;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
`;

export default BookingTableOperations;
