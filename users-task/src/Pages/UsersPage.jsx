import { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Spin,
  Card,
  ConfigProvider,
  Button,
  Tooltip,
  message,
} from "antd";
import { ReloadOutlined, DatabaseOutlined } from "@ant-design/icons";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import useUsers from "../hooks/useUsers";
import useWindowSize from "../hooks/useWindowSize";
import UsersList from "../components/UsersList";
import UserCard from "../components/UserCard";
import UserCardModal from "../components/UserCardModal";
import EditUserModal from "../components/EditUserModal";

const { Content } = Layout;

export default function UsersPage() {
  const {
    users: filteredUsers,
    search,
    setSearch,
    loading,
    updateUser,
    deleteUser,
    refreshFromAPI,
  } = useUsers();

  const { isMobile } = useWindowSize();
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  // Handle refresh from API
  const handleRefresh = () => {
    refreshFromAPI();
    setSelectedUser(null);
    message.info("Refreshing data from API...");
  };

  // Handle user update - sync selected user state
  const handleUserUpdated = (id, userData) => {
    if (selectedUser?.id === id) {
      setSelectedUser((prev) => ({ ...prev, ...userData }));
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
        },
      }}
    >
      <Layout className="min-h-screen bg-gray-100 overflow-hidden">
        <Content className="py-4 px-3 md:py-6 md:px-12 max-w-[1200px] mx-auto w-full box-border overflow-x-hidden text-left">
          {/* Responsive header */}
          <Card className="mb-4 md:mb-6 rounded-xl shadow-card">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div className="flex items-center gap-3">
                <Title />
                <Tooltip title="Data is cached in localStorage">
                  <DatabaseOutlined className="text-green-500" />
                </Tooltip>
              </div>
              <div className="flex items-center gap-3">
                <SearchBar search={search} setSearch={setSearch} />
                <Tooltip title="Refresh from API (clears cache)">
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={handleRefresh}
                    loading={loading}
                  />
                </Tooltip>
              </div>
            </div>
          </Card>

          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Spin size="large" tip="Loading users..." />
            </div>
          ) : (
            <EditUserModal
              onSave={updateUser}
              onUserUpdated={handleUserUpdated}
            >
              {({ openEditModal }) => (
                <Row gutter={[16, 16]}>
                  {/* Users list - full width on mobile */}
                  <Col span={isMobile ? 24 : 14} xl={isMobile ? 24 : 16}>
                    <Card
                      title={`Users (${filteredUsers.length})`}
                      className="rounded-xl shadow-card"
                      classNames={{ body: "max-h-[500px] overflow-y-auto" }}
                    >
                      <UsersList
                        filteredUsers={filteredUsers}
                        setSelectedUser={handleUserSelect}
                        selectedUser={selectedUser}
                        onDeleteUser={deleteUser}
                      />
                    </Card>
                  </Col>

                  {/* Sidebar - only on desktop */}
                  {!isMobile && (
                    <Col span={10} xl={8}>
                      <div className="sticky top-6">
                        <UserCard
                          selectedUser={selectedUser}
                          onEdit={openEditModal}
                        />
                      </div>
                    </Col>
                  )}

                  {/* Mobile modal for user details - manages its own state */}
                  <UserCardModal
                    selectedUser={selectedUser}
                    isMobile={isMobile}
                    onEdit={openEditModal}
                  />
                </Row>
              )}
            </EditUserModal>
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
