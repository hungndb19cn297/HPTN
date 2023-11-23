"use client";

import axiosClient from "@/api/axiosClient";
import axiosAuthClient from "@/api/axiosClient";

import Button from "@mui/material/Button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Image } from "react-bootstrap";

const Principal = (props: {
  fullName: string;
  avatar: string;
  userId: any;
}) => {
  const router = useRouter();
  const fullName = props.fullName;
  const avatar = props.avatar ?? "logo.jpg";
  const userId = props.userId;
  if (fullName === "") {
    return (
      <Container style={{ minWidth: 220 }}>
        <Button
          onClick={() => router.push("../login")}
          variant="outlined"
          style={{ marginLeft: 20, color: "#fff", borderColor: "#fff" }}
        >
          Đăng nhập
        </Button>
        <Button
          onClick={() => router.push("../signup")}
          variant="outlined"
          style={{ marginLeft: 10, color: "#fff", borderColor: "#fff" }}
        >
          Đăng ký
        </Button>
      </Container>
    );
  } else if (fullName !== null && fullName != undefined) {
    return (
      <Container style={{ minWidth: 220 }}>
        <Link href={"../profile?userId=" + userId}>
          <Image
            src={avatar}
            roundedCircle
            style={{ marginLeft: 20, width: "60px", height: "60px" }}
          />
        </Link>
        <Button
          onClick={async () => {
            await axiosAuthClient
              .post("out")
              .then((response) => {
                console.log(response)
                router.push("../login");
                localStorage.clear();
              })
              .catch(err => console.log(err));
          }}
          variant="outlined"
          style={{ marginLeft: 10, color: "red", borderColor: "red" }}
        >
          Đăng xuất
        </Button>
      </Container>
    );
  } else {
    return <Container style={{ minWidth: 220 }}></Container>;
  }
};
export default Principal;
