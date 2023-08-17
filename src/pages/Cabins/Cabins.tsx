import { styled } from "styled-components";

import { Heading, Row } from "../../ui";
import { CabinTable } from "../../features/cabins";
import { CreateCabinModal } from "../../features/cabins/modals";

function Cabins() {
  return (
    <StyledContainer>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row type="vertical">
        <CabinTable />
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
