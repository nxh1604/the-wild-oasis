import { css, styled } from "styled-components";

const Heading = styled.h1<{ as: "h1" | "h2" | "h3" }>`
  ${(prop) =>
    prop.as === "h1"
      ? css`
          font-size: 2.5rem;
          font-weight: 700;
        `
      : prop.as === "h2"
      ? css`
          font-size: 2.3rem;
          font-weight: 600;
        `
      : css`
          font-size: 2rem;
          font-weight: 500;
        `}
`;

export default Heading;
