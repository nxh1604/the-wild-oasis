// import styled from "styled-components";

import { useCabins } from "./hooks";

import { Empty, Spinner } from "../../ui";
import CabinRow from "./CabinRow";
import StyledErrorFallback from "../../ui/ErrorFallback";
import Table from "../../ui/Table/Table";
import { ICabinData } from "../../services/apiCabins";

const CabinTable = (): JSX.Element => {
  const { isLoading, error, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  if (error) return <StyledErrorFallback />;

  if (!cabins?.length) return <Empty resource={"cabins"} />;

  return (
    <Table role="table">
      <Table.Header role="row" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <div></div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>
      <Table.Content
        data={cabins}
        render={(cabin: ICabinData) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        )}
      />
    </Table>
  );
};

export default CabinTable;

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

// const TableContent = styled.ul`
//   display: flex;
//   flex-direction: column;
// `;
