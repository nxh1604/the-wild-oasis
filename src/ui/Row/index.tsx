import { styled, css } from "styled-components";

const Row = styled.div<{ type?: string }>`
  display: flex;
  ${(prop) =>
    prop.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(prop) =>
    prop.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "horizontal",
};

export default Row;
