"use client";

import Button from "@mui/material/Button/Button";
import { useRouter } from "next/navigation";
import { Container, Image } from "react-bootstrap";

const Principal = (props: { fullName: string; avatar: string }) => {
  const router = useRouter();
  const fullName = props.fullName;
  const avatar = props.avatar ?? "logo.jpg";
  console.log(fullName);
  if (fullName === "") {
    return (
      <Container style={{ minWidth: 220 }}>
        <Button
          onClick={() => router.push("/login")}
          variant="outlined"
          style={{ marginLeft: 20, color: "#fff", borderColor: "#fff" }}
        >
          Login
        </Button>
        <Button
          onClick={() => router.push("/signup")}
          variant="outlined"
          style={{ marginLeft: 10, color: "#fff", borderColor: "#fff" }}
        >
          Signup
        </Button>
      </Container>
    );
  } else if (fullName !== null && fullName != undefined) {
    return (
      <Container style={{ minWidth: 220 }}>
        <Image
          src={avatar}
          roundedCircle
          style={{ marginLeft: 20, width: "60px", height: "60px" }}
        />
        <Button
          onClick={() => {router.push("/login"); localStorage.clear()}}
          variant="outlined"
          style={{ marginLeft: 10, color: "red", borderColor: "red" }}
        >
          Logout
        </Button>
      </Container>
    );
  } else {
    return <Container style={{ minWidth: 220 }}></Container>;
  }
};
export default Principal;
