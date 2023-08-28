import { styled } from "styled-components";
import { Suspense } from "react";
import { Heading, Row, StyledErrorFallback } from "../../ui";
import { CabinTable } from "../../features/cabins";
import { CreateCabinModal } from "../../features/cabins/modals";
import { Await, useLoaderData } from "react-router-dom";
import { ICabinData } from "../../services/apiCabins/apiCabins";
import CabinsSkeletonLoading from "./CabinsSkeletonLoading";
import CabinTableOperations from "../../features/cabins/CabinTableOperations";

function Cabins() {
  const { cabins } = useLoaderData() as { cabins: Promise<ICabinData[]> };

  return (
    <StyledContainer>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row type="vertical">
        {/* <CabinsSkeletonLoading /> */}
        <Suspense fallback={<CabinsSkeletonLoading />}>
          <Await resolve={cabins} errorElement={<StyledErrorFallback />}>
            <CabinTable />
            <div style={{ alignSelf: "flex-end" }}>
              <CreateCabinModal />
            </div>
          </Await>
        </Suspense>
      </Row>
    </StyledContainer>
  );
}

export default Cabins;

export const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
