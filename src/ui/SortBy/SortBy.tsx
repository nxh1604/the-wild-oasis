import StyledSelect from "../Select";
import { useSearchParams } from "react-router-dom";

const SortBy = ({
  options,
}: React.PropsWithChildren<{
  options: Array<{ [T: string]: string }>;
}>): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <StyledSelect
      onChange={(e) => {
        searchParams.set("sort", e.target.value);
        setSearchParams(searchParams);
      }}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SortBy;
