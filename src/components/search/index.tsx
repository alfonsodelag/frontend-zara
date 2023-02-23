import React from "react";
import { useState } from "react";

interface SearchBoxProps {
  onChange: (text: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = React.memo(
  ({ onChange }) => {
    const [searchValue, setSearchValue] = useState("");

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      onChange(e.target.value);
    };

    return (
      <div className="border border-gray-300 rounded flex max-w-sm">
        <input
          className="w-full p-2 text-gray-700 leading-tight focus:outline-none"
          type="text"
          value={searchValue}
          onChange={onChangeSearchInput}
          placeholder="Filter podcasts..."
        />
      </div>
    );
  }
);
