// import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

import { useCabins } from "./hooks";

import CabinRow from "./CabinRow";
import { Empty, Menus, Table } from "../../ui";

const CabinTable = (): JSX.Element => {
  // lấy data cabins từ react-query;
  const { cabins } = useCabins();

  // lấy param, query từ URL
  const [searchParams] = useSearchParams();

  if (!cabins?.length) return <Empty resource={"cabins"} />;

  // 1 Filter data theo query của url
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
  // 2 Sort data theo query url
  const sortQuery = searchParams.get("sort")?.split("-") || ["name", "asc"];
  // check co phai co sortQuery[1] theo sau khong => neu khong auto asc
  const sortType = sortQuery[1] ? (sortQuery[1] === "asc" ? 1 : -1) : 1;

  let sortData: ICabinData[] | [];

  // check xem sort query co nam trong array hay khong => neu khong auto [];
  if (
    ["name", "maxCapacity", "discount", "regularPrice"].includes(sortQuery[0])
  ) {
    const sortKey = sortQuery[0] as
      | "name"
      | "maxCapacity"
      | "discount"
      | "regularPrice";
    sortData = filterData.sort((p, c) => {
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
  } else {
    sortData = [];
  }

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
          // data la data cua Cabin da qua filter va sort
          data={sortData}
          // render props dung de pass callback vao component;
          render={(cabin: ICabinData) => (
            <CabinRow cabin={cabin} menuId={cabin.id} key={cabin.id} />
          )}
        />
      </Menus>
    </Table>
  );
};

export default CabinTable;
