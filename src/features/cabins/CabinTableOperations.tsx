import { Filter, SortBy } from "../../ui";
import { StyledTableOperations } from "../bookings/BookingTableOperations";

function CabinTableOperations() {
  return (
    <StyledTableOperations>
      <Filter
        field="discount"
        options={[
          { label: "All", value: "all" },
          { label: "no-discount", value: "no-discount" },
          { label: "with-discount", value: "with-discount" },
        ]}
      />
      <SortBy
        options={[
          { label: "Sort by name (0-9 | A-Z)", value: "name-asc" },
          { label: "Sort by name (Z-A | 9-0)", value: "name-desc" },
          { label: "Sort by price (Low to High)", value: "regularPrice-asc" },
          {
            label: "Sort by price (High to Low)",
            value: "regularPrice-desc",
          },
          { label: "Sort by discount (Low to High)", value: "discount-asc" },
          { label: "Sort by discount (High to Low)", value: "discount-desc" },
          {
            label: "Sort by capacity (Low to High)",
            value: "maxCapacity-asc",
          },
          {
            label: "Sort by capacity (High to Low)",
            value: "maxCapacity-desc",
          },
        ]}
      />
    </StyledTableOperations>
  );
}

export default CabinTableOperations;
