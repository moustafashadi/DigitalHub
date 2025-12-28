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
      style={{ maxWidth: 400 }}
    />
  );
}

export default SearchBar;
