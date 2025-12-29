import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

function SearchBar({ search, setSearch }) {
  return (
    <Search
      placeholder="Search users by name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      allowClear
      prefix={<SearchOutlined />}
      size="large"
      className="w-full md:w-[300px] flex-shrink-0"
    />
  );
}

export default SearchBar;
