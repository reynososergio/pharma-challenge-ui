import { MainLayoutProps } from "@/types/layouts";
import Container from "react-bootstrap/Container";
import Sidebar from "@/components/sidebar/Sidebar";

const MainLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <header className="main-navbar">
        <Sidebar />
        <h2 className="main-title">{title}</h2>
      </header>

      <Container fluid className="content-container">
        {children}
      </Container>
    </div>
  );
};

export default MainLayout;
