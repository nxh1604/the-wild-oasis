import React from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ active?: "true" | "false" }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  &:disabled {
    cursor: unset;
  }
`;

const Filter = ({
  field,
  options,
}: React.PropsWithChildren<{
  field: string;
  options: Array<{ [T: string]: string }>;
}>) => {
  const [searchParams, setSearchParms] = useSearchParams();
  const handleClick = (value: string) => {
    searchParams.set(field, value);
    setSearchParms(searchParams);
  };

  const active = searchParams.get(field) || options[0].value;

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={`${active === option.value}`}
          disabled={active === option.value}
          onClick={() => {
            handleClick(option.value);
          }}>
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
