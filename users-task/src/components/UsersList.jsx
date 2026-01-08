import { List, Avatar, Typography, Button, Popconfirm, message } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

function UsersList({
  filteredUsers,
  setSelectedUser,
  selectedUser,
  onDeleteUser,
}) {
  const handleDelete = (e, userId) => {
    e.stopPropagation(); // Prevent selecting the user when clicking delete

    // If the deleted user is currently selected, clear selection
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }

    onDeleteUser(userId);
    message.success("User deleted successfully");
  };

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
          actions={[
            <Popconfirm
              key="delete"
              title="Delete User"
              description="Are you sure you want to delete this user?"
              onConfirm={(e) => handleDelete(e, user.id)}
              onCancel={(e) => e.stopPropagation()}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => e.stopPropagation()}
                size="small"
              />
            </Popconfirm>,
          ]}
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
