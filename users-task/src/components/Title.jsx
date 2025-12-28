import React from "react";
import { Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";

const { Title: AntTitle } = Typography;

function Title() {
  return (
    <AntTitle
      level={2}
      style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}
    >
      <TeamOutlined />
      Users Directory
    </AntTitle>
  );
}

export default Title;
