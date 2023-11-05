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
import { useEffect, useState } from "react";
import axiosAuthClient from "@/api/axiosClient";

export default function ProfileBasic(props: any) {
  const user = props.user;
  const myUserId = props.myUserId;
  const [isFollow, setIsFollow] = useState(null);
  const [totalFollow, setTotalFollow] = useState(null)
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
                      <Button className="flex-grow-1" variant="contained">
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
