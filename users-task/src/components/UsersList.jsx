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
          className={`user-list-item ${
            selectedUser?.id === user.id ? "selected" : ""
          }`}
        >
          <List.Item.Meta
            avatar={<Avatar className="bg-primary" icon={<UserOutlined />} />}
            title={<Text strong>{user.name}</Text>}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}

export default UsersList;
