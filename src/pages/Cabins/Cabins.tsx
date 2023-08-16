import { useState } from "react";
import { styled } from "styled-components";

import { Button, Heading, Row } from "../../ui";
import { CreateOrUpdateCabinForm, CabinTable } from "../../features/cabins";

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
        {openForm && <CreateOrUpdateCabinForm />}
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
