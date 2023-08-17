import styled from "styled-components";
import { HiSquare2Stack } from "react-icons/hi2";

import { useCreateCabin } from "./hooks";
import { formatCurrency } from "../../utils/helpers";
import { ICabinData } from "../../services/apiCabins/apiCabins";

import { Button } from "../../ui";
import { DeleteCabinModal, UpdateCabinModal } from "./modals";
import Table from "../../ui/Table/Table";

const CabinRow = ({ cabin }: { cabin: ICabinData }): JSX.Element => {
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const handleDuplicateCabin = () => {
    const duplicatedCabin = {
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    };

    createCabin(duplicatedCabin);
  };

  return (
    <Table.Row role="row">
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
        <Button
          onClick={handleDuplicateCabin}
          disabled={isCreating}
          size="small"
          variation="secondary">
          <HiSquare2Stack />
        </Button>
        <UpdateCabinModal cabin={cabin} />
        <DeleteCabinModal cabinId={cabinId} />
      </div>
    </Table.Row>
  );
};

export default CabinRow;

// const TableRow = styled.li`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
