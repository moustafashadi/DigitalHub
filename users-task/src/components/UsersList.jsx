import { List, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

function UsersList({ filteredUsers, setSelectedUser, selectedUser }) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={filteredUsers}
      locale={{ emptyText: "No users found" }}
      renderItem={(user) => (
        <List.Item
          key={user.id}
          onClick={() => setSelectedUser(user)}
          style={{
            cursor: "pointer",
            padding: "12px 16px",
            borderRadius: 8,
            marginBottom: 8,
            backgroundColor:
              selectedUser?.id === user.id ? "#e6f4ff" : "#fafafa",
            border:
              selectedUser?.id === user.id
                ? "1px solid #1890ff"
                : "1px solid #f0f0f0",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (selectedUser?.id !== user.id) {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
            }
          }}
          onMouseLeave={(e) => {
            if (selectedUser?.id !== user.id) {
              e.currentTarget.style.backgroundColor = "#fafafa";
            }
          }}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                icon={<UserOutlined />}
              />
            }
            title={<Text strong>{user.name}</Text>}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}

export default UsersList;
