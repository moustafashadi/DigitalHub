import { Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";

const { Title: AntTitle } = Typography;

function Title() {
  return (
    <AntTitle level={2} className="m-0 flex items-center gap-2">
      <TeamOutlined />
      Users Directory
    </AntTitle>
  );
}

export default Title;
