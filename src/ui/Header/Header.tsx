import { styled } from "styled-components";

const StyledHeader = styled.header`
  padding: 3.2rem 4rem;
  border-bottom: 1px solid;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
`;

const Header = (): JSX.Element => {
  return <StyledHeader>Header</StyledHeader>;
};

export default Header;
