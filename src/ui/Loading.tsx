import styled from "styled-components";

export const LoadingSkeleton = styled.span`
  width: 100%;
  height: 30px;
  display: block;
  margin: 0;
  position: relative;
  background: #fff;
  box-sizing: border-box;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.5) 50%,
        transparent 100%
      ),
      linear-gradient(#ddd 30px, transparent 0);
    background-repeat: no-repeat;
    background-size: 75px 175px, 100% 30px;
    background-position: -100% 0, center 0;
    box-sizing: border-box;
    animation: animloader 1s linear infinite;
  }

  @keyframes animloader {
    to {
      background-position: 100% 0, center 0, center 60px, center 120px;
    }
  }
`;
