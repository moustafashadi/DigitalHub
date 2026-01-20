import { Layout, Card, Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="py-6 px-12 max-w-[800px] mx-auto">
        <Card className="rounded-xl shadow-card">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            Back to Users
          </Button>
          <Title level={2}>About This App</Title>
          <Paragraph>
            This is a test page to verify SWR caching works correctly.
          </Paragraph>
          <Paragraph>
            Navigate back to the Users page — if caching works, 
            the users list should appear <strong>instantly</strong> without 
            a loading spinner or network request.
          </Paragraph>
        </Card>
      </Content>
    </Layout>
  );
}