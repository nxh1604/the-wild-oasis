import { styled } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 2fr 1fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 920px) {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: initial;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRow = ({
  label = "",
  children,
  errorMessage = "",
}: {
  label?: string;
  children: React.ReactElement<HTMLElement>;
  errorMessage?: string | undefined;
}): JSX.Element => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={`${children.props.id}`}>{label}</Label>}
      {children}
      {errorMessage && <Error>{errorMessage}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
