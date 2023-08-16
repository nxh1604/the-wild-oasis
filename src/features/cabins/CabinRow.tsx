import { useState } from "react";
import styled from "styled-components";

import { useDeleteCabin } from "./hooks";

import { ICabinData } from "../../services/apiCabins/apiCabins";
import { formatCurrency } from "../../utils/helpers";

import { Button } from "../../ui";
import CabinCreateOrEditForm from "./CabinCreateOrEditForm";

const CabinRow = ({ cabin }: { cabin: ICabinData }): JSX.Element => {
  const [isEdit, setIsEdit] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  return (
    <>
      <TableRow role="row">
        <Img
          src={(image as string) || "default-img.png"}
          alt={`${description || name}`}
        />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Button onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? "Cancel" : "Edit"}
          </Button>
          <button
            onClick={() => {
              if (cabinId) deleteCabin(cabinId);
            }}
            disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "delete"}
          </button>
        </div>
      </TableRow>
      {isEdit && <CabinCreateOrEditForm cabin={cabin} />}
    </>
  );
};

export default CabinRow;

const TableRow = styled.li`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
