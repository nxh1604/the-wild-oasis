import styled, { css } from "styled-components";

const Form = styled.form<{ type?: string }>`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;
      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 120rem;

      @media (max-width: 1280px) {
        width: 80rem;
      }
      @media (max-width: 920px) {
        width: 60rem;
      }

      @media (max-width: 768px) {
        width: 40rem;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
