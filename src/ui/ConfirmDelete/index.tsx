import styled from "styled-components";
import { Button, Heading } from "..";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  closeModal,
}: {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  closeModal?: () => void;
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to <strong>delete</strong> this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          onClick={() => {
            if (closeModal) closeModal();
          }}
          variation="secondary"
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button onClick={() => onConfirm()} variation="danger" disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
