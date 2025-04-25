import { useState } from "react";
import { Nav, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { List } from "react-bootstrap-icons";

import "@/styles/sidebar.css";
import { ROUTES } from "@/config/routes";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const toggleSidebar = () => setShow(!show);

  return (
    <>
      <Button
        variant="primary"
        onClick={toggleSidebar}
        className="btn-challenge btn-challenge-sidebar m-2 sidebar-toggle"
      >
        <List className="sidebar-icon" />
      </Button>

      <Offcanvas
        show={show}
        onHide={toggleSidebar}
        backdrop={false}
        placement="start"
        className="sidebar-container"
      >
        <Offcanvas.Header closeButton className="sidebar-header">
          <Offcanvas.Title>Pharma Challenge</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="sidebar-body d-flex flex-column">
          <Nav className="">
            <Nav.Link as={Link} to={ROUTES.HOME} className="sidebar-link">
              Home
            </Nav.Link>
          </Nav>

          <Nav className="">
            <Nav.Link
              as={Link}
              to={ROUTES.MEDICATION_TYPE.LIST}
              className="sidebar-link"
            >
              Medication Types
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
