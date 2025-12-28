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

function UserCard({ selectedUser }) {
  if (!selectedUser) {
    return (
      <Card
        style={{
          borderRadius: 12,
          textAlign: "center",
          backgroundColor: "#fafafa",
          border: "2px dashed #d9d9d9",
        }}
      >
        <UserOutlined style={{ fontSize: 48, color: "#bfbfbf" }} />
        <Title level={5} style={{ color: "#8c8c8c", marginTop: 16 }}>
          Select a user to view details
        </Title>
      </Card>
    );
  }

  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <Avatar
          size={80}
          style={{ backgroundColor: "#1890ff" }}
          icon={<UserOutlined />}
        />
        <Title level={3} style={{ marginTop: 12, marginBottom: 4 }}>
          {selectedUser.name}
        </Title>
        <Text type="secondary">@{selectedUser.username}</Text>
      </div>

      <Divider />

      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <MailOutlined style={{ color: "#1890ff", fontSize: 18 }} />
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Email
            </Text>
            <br />
            <Text>{selectedUser.email}</Text>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <PhoneOutlined style={{ color: "#1890ff", fontSize: 18 }} />
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Phone
            </Text>
            <br />
            <Text>{selectedUser.phone}</Text>
          </div>
        </div>

        {selectedUser.website && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <GlobalOutlined style={{ color: "#1890ff", fontSize: 18 }} />
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Website
              </Text>
              <br />
              <Text>{selectedUser.website}</Text>
            </div>
          </div>
        )}

        {selectedUser.address && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <HomeOutlined style={{ color: "#1890ff", fontSize: 18 }} />
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BankOutlined style={{ color: "#1890ff", fontSize: 18 }} />
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Company
              </Text>
              <br />
              <Text>{selectedUser.company.name}</Text>
            </div>
          </div>
        )}
      </Space>
    </Card>
  );
}

export default UserCard;
