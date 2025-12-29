import { useState, useEffect } from "react";
import { Layout, Row, Col, Spin, Card, ConfigProvider } from "antd";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import useUsers from "../hooks/useUsers";
import UsersList from "../components/UsersList";
import UserCard from "../components/UserCard";
import UserCardModal from "../components/UserCardModal";

const { Content } = Layout;

export default function UsersPage() {
  const { users: filteredUsers, search, setSearch, loading } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 1024;
  });
  const [modalOpen, setModalOpen] = useState(false);

  // Determine if mobile based on window width (< 768px)
  const isMobile = windowWidth < 768;

  // Handle responsive detection
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle modal state when switching between mobile/desktop
  useEffect(() => {
    if (isMobile && selectedUser) {
      // Switching to mobile with a selected user - open modal
      setModalOpen(true);
    } else if (!isMobile) {
      // Switching to desktop - close modal
      setModalOpen(false);
    }
  }, [isMobile, selectedUser]);

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (isMobile) {
      setModalOpen(true);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
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
              <Title />
              <SearchBar search={search} setSearch={setSearch} />
            </div>
          </Card>

          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Spin size="large" tip="Loading users..." />
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {/* Users list - full width on mobile via span */}
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
                  />
                </Card>
              </Col>
              {/* Sidebar - only on desktop */}
              {!isMobile && (
                <Col span={10} xl={8}>
                  <div className="sticky top-6">
                    <UserCard selectedUser={selectedUser} />
                  </div>
                </Col>
              )}
            </Row>
          )}

          {/* Mobile modal for user details */}
          <UserCardModal
            open={modalOpen && isMobile}
            onClose={handleModalClose}
            selectedUser={selectedUser}
          />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
