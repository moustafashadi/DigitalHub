import { Card, Avatar, Typography, Space, Divider } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HomeOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function UserCard({ selectedUser, isModal = false }) {
  if (!selectedUser) {
    return (
      <Card
        className="rounded-xl text-center bg-gray-50"
        style={{ border: "2px dashed #d9d9d9" }}
      >
        <UserOutlined className="text-5xl text-gray-400" />
        <Title level={5} className="text-gray-500 mt-4">
          Select a user to view details
        </Title>
      </Card>
    );
  }

  const content = (
    <>
      <div className="text-center mb-4">
        <Avatar size={80} className="bg-primary" icon={<UserOutlined />} />
        <Title level={3} className="mt-3 mb-1">
          {selectedUser.name}
        </Title>
        <Text type="secondary">@{selectedUser.username}</Text>
      </div>

      <Divider />

      <Space direction="vertical" size="middle" className="w-full">
        <div className="flex items-center gap-3">
          <MailOutlined className="text-primary text-lg" />
          <div>
            <Text type="secondary" className="text-xs">
              Email
            </Text>
            <br />
            <Text>{selectedUser.email}</Text>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PhoneOutlined className="text-primary text-lg" />
          <div>
            <Text type="secondary" className="text-xs">
              Phone
            </Text>
            <br />
            <Text>{selectedUser.phone}</Text>
          </div>
        </div>

        {selectedUser.website && (
          <div className="flex items-center gap-3">
            <GlobalOutlined className="text-primary text-lg" />
            <div>
              <Text type="secondary" className="text-xs">
                Website
              </Text>
              <br />
              <Text>{selectedUser.website}</Text>
            </div>
          </div>
        )}

        {selectedUser.address && (
          <div className="flex items-center gap-3">
            <HomeOutlined className="text-primary text-lg" />
            <div>
              <Text type="secondary" className="text-xs">
                Address
              </Text>
              <br />
              <Text>
                {selectedUser.address.street}, {selectedUser.address.city}
              </Text>
            </div>
          </div>
        )}

        {selectedUser.company && (
          <div className="flex items-center gap-3">
            <BankOutlined className="text-primary text-lg" />
            <div>
              <Text type="secondary" className="text-xs">
                Company
              </Text>
              <br />
              <Text>{selectedUser.company.name}</Text>
            </div>
          </div>
        )}
      </Space>
    </>
  );

  if (isModal) {
    return <div className="p-4">{content}</div>;
  }

  return <Card className="rounded-xl shadow-card-lg">{content}</Card>;
}

export default UserCard;
