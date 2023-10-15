"use client";

import Link from "next/link";
import {
  Navbar,
  Nav,
  Container,
  FormControl,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { usePathname } from "next/navigation";
import Principal from "./header.principal";
import { useEffect, useState } from "react";
function Header() {
  const path = usePathname();
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    setFullName(localStorage.getItem("fullName") ?? "");
    setAvatar(localStorage.getItem("avatar") ?? "");
  });

  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{
        background: "linear-gradient(to right, #7f7fd5, #23709E)",
        marginBottom: 30,
      }}
    >
      <Container>
        <Navbar.Brand href="/">
          <Image src="/logo2.png" width={60} height={60}></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" variant="underline">
            <Nav.Item>
              <Link
                href="/"
                className={path === "/" ? "nav-link active" : "nav-link"}
                style={{ color: "#fff", marginLeft: 10 }}
              >
                Hỏi & Đáp
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                href="/post"
                className={path === "/posts" ? "nav-link active" : "nav-link"}
                style={{ color: "#fff", marginLeft: 10 }}
              >
                Chia sẻ kiến thức
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                href="/post/create"
                className={
                  path === "/post/create" ? "nav-link active" : "nav-link"
                }
                style={{ color: "#fff", marginLeft: 10 }}
              >
                Đăng bài || Câu hỏi
              </Link>
            </Nav.Item>
          </Nav>
          <Form className="d-flex">
            <Container
              style={{
                width: "fit-content",
                height: "fit-content",
                position: "relative",
                padding: 0,
              }}
            >
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                style={{ paddingRight: 30 }}
              />
              <Button
                variant="outline-primary"
                style={{ position: "absolute", top: "0", right: "0" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Button>
            </Container>
          </Form>
          <Nav>
            <Nav.Link style={{ padding: 0 }}>
              <Principal fullName={fullName} avatar={avatar}></Principal>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
