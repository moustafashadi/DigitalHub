import { useState } from "react";
import { Layout, Row, Col, Spin, Card, ConfigProvider } from "antd";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import useUsers from "../hooks/useUsers";
import UsersList from "../components/UsersList";
import UserCard from "../components/UserCard";

const { Content } = Layout;

export default function UsersPage() {
  const { users: filteredUsers, search, setSearch, loading } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
        <Content
          style={{
            padding: "24px 48px",
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Card
            style={{
              marginBottom: 24,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <Title />
              <SearchBar search={search} setSearch={setSearch} />
            </div>
          </Card>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 300,
              }}
            >
              <Spin size="large" tip="Loading users..." />
            </div>
          ) : (
            <Row gutter={24}>
              <Col xs={24} md={14} lg={16}>
                <Card
                  title={`Users (${filteredUsers.length})`}
                  style={{
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                  }}
                  bodyStyle={{ maxHeight: 500, overflowY: "auto" }}
                >
                  <UsersList
                    filteredUsers={filteredUsers}
                    setSelectedUser={setSelectedUser}
                    selectedUser={selectedUser}
                  />
                </Card>
              </Col>
              <Col xs={24} md={10} lg={8}>
                <div style={{ position: "sticky", top: 24 }}>
                  <UserCard selectedUser={selectedUser} />
                </div>
              </Col>
            </Row>
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
