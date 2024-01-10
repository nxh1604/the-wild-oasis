import { styled } from "styled-components";
import { Suspense } from "react";
import { Row, StyledErrorFallback } from "../../ui";
import { CabinTable } from "../../features/cabins";
import { CreateCabinModal } from "../../features/cabins/modals";
import { Await, useLoaderData } from "react-router-dom";
import CabinsSkeletonLoading from "./CabinsSkeletonLoading";
import CabinTableOperations from "../../features/cabins/CabinTableOperations";
import { StyledHeading, StyledRow } from "../Bookings/Bookings";

function Cabins() {
  const { cabins } = useLoaderData() as { cabins: Promise<ICabinData[]> };

  return (
    <StyledContainer>
      <StyledRow>
        <StyledHeading as="h1">All cabins</StyledHeading>
        <CabinTableOperations />
      </StyledRow>
      <Row type="vertical">
        {/* <CabinsSkeletonLoading /> */}
        <Suspense fallback={<CabinsSkeletonLoading />}>
          <Await resolve={cabins} errorElement={<StyledErrorFallback />}>
            <CabinTable />
          </Await>
        </Suspense>
        <div style={{ alignSelf: "flex-end" }}>
          <CreateCabinModal />
        </div>
      </Row>
    </StyledContainer>
  );
}

export default Cabins;

const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
