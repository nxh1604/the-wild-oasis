// import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

import { useCabins } from "./hooks";

import CabinRow from "./CabinRow";
import { Empty, Menus, Table } from "../../ui";

const CabinTable = (): JSX.Element => {
  const { cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (!cabins?.length) return <Empty resource={"cabins"} />;

  // 1 Filter
  const filterQuery = searchParams.get("discount") || "all";

  let filterData: ICabinData[] | undefined;
  switch (filterQuery) {
    case "all": {
      filterData = cabins;
      break;
    }
    case "no-discount": {
      filterData = cabins?.filter((cabin) => +cabin.discount === 0);
      break;
    }
    case "with-discount": {
      filterData = cabins?.filter((cabin) => +cabin.discount > 0);
      break;
    }
    default:
      filterData = [];
  }
  // 2 Sort
  const sortQuery = searchParams.get("sort")?.split("-") || ["name", "asc"];
  const sortType = sortQuery[1] === "asc" ? 1 : -1;
  const sortKey = sortQuery[0] as
    | "name"
    | "maxCapacity"
    | "discount"
    | "regularPrice";
  const sortData = filterData.sort((p, c) => {
    const prev = p[sortKey];
    const cur = c[sortKey];
    if (typeof prev === "string" && typeof cur === "string") {
      return (
        prev.localeCompare(cur, "en", {
          sensitivity: "base",
        }) * sortType
      );
    }
    return (Number(prev) - Number(cur)) * sortType;
  });

  return (
    <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Menus width={200}>
        <Table.Header role="row" as="header">
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Content
          data={sortData}
          render={(cabin: ICabinData) => (
            <CabinRow cabin={cabin} menuId={cabin.id} key={cabin.id} />
          )}
        />
      </Menus>
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
