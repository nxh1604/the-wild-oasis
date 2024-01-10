import { styled } from "styled-components";

const StyledFormRowVertical = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.8rem;
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
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRowVertical = ({
  label = "",
  children,
  errorMessage = "",
}: {
  label?: string;
  children: React.ReactElement<HTMLInputElement>;
  errorMessage?: string | undefined;
}): JSX.Element => {
  return (
    <StyledFormRowVertical>
      {label && (
        <Label htmlFor={`${children.props.id}`}>
          <strong>{label}</strong>
        </Label>
      )}
      {children}
      {errorMessage && <Error>{errorMessage}</Error>}
    </StyledFormRowVertical>
  );
};

export default FormRowVertical;
