import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import axiosAuthClient from "@/api/axiosClient";
import { useRouter } from "next/navigation";

export default function ProfileBasic(props: any) {
  const router = useRouter();
  const user = props.user;
  const myUserId = props.myUserId;
  const setAvatar = props.setAvatar;
  const [isFollow, setIsFollow] = useState(null);
  const [totalFollow, setTotalFollow] = useState(null);
  const inputFile = useRef(null);
  if (user?.id != myUserId && myUserId != null && user?.id != null) {
    axiosAuthClient
      .get("/follows?toId=" + user?.id)
      .then((response: any) => {
        setIsFollow(response);
      })
      .catch((error) => console.log(error));
  }
  return (
    <Container>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={(file) => {
          const formData = new FormData();
          formData.append("file", file.target.files[0]);
          console.log(formData);
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          axiosAuthClient
            .post("/users/avatar", formData, config)
            .then((response) => {
              console.log(response);
              localStorage.setItem("avatar", response);
              window.location.reload()
            })
            .catch((error) => console.log(error));
        }}
      />
      <MDBRow className="justify-content-center">
        <MDBCard style={{ borderRadius: "15px" }}>
          <MDBCardBody className="p-4">
            <div className="d-flex text-black">
              <div className="flex-shrink-0">
                <MDBCardImage
                  style={{
                    maxWidth: "120px",
                    maxHeight: "120px",
                    borderRadius: "10px",
                  }}
                  src={user?.avatar ?? "logo.jpg"}
                  alt="Generic placeholder image"
                  fluid
                  onClick={() => {
                    if (user?.id == myUserId) inputFile.current.click();
                  }}
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <div
                  className="d-flex flex-column justify-content-around"
                  style={{ maxWidth: "fit-content", marginLeft: 20 }}
                >
                  <MDBCardTitle>
                    {user?.firstName} {user?.lastName}
                  </MDBCardTitle>
                  <MDBCardText> </MDBCardText>
                  {isFollow != null && (
                    <div className="d-flex pt-1">
                      <Button
                        className="flex-grow-1"
                        variant={isFollow === false ? "outlined" : "contained"}
                        onClick={() => {
                          axiosAuthClient
                            .post("/follows?toId=" + user?.id)
                            .then((response: any) => {
                              setTotalFollow(response);
                            })
                            .catch((error) => console.log(error));
                        }}
                      >
                        {isFollow === false ? "Theo dõi" : "Đã theo dõi"}
                      </Button>
                    </div>
                  )}
                  {user?.id == myUserId && myUserId != null && (
                    <div className="d-flex pt-1">
                      <Button className="flex-grow-1" variant="contained" onClick={() => router.push("/profile/update")}>
                        Cập nhật
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-grow-1 ms-3">
                <div
                  className="d-flex flex-column justify-content-start rounded-3 p-2 mb-2"
                  style={{ backgroundColor: "#efefef" }}
                >
                  <div>
                    <p className="mb-1">Số bài viết: {user?.totalPosts}</p>
                  </div>
                  <p className="mb-1">Số bình luận: {user?.totalComments}</p>
                  <div>
                    <p className="mb-1">
                      Số người theo dõi: {totalFollow ?? user?.totalFollowers}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </Container>
  );
}
