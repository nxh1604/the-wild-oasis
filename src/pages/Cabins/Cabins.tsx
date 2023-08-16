import { useState } from "react";
import { styled } from "styled-components";

import { Button, Heading, Row } from "../../ui";
import { CabinCreateOrEditForm, CabinTable } from "../../features/cabins";

function Cabins() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <StyledContainer>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row type="vertical">
        <CabinTable />
        <Button onClick={() => setOpenForm(!openForm)}>Add new cabin</Button>
        {openForm && <CabinCreateOrEditForm />}
      </Row>
    </StyledContainer>
  );
}

export default Cabins;

export const loader = () => {
  document.title = "The Wild Oasis | cabins";
  return null;
};

const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
