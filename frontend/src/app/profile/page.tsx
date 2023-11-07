"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import Home from "../page";
import { useState } from "react";
import { Container, Image } from "react-bootstrap";
import ProfileBasic from "@/component/app.profile";
import axiosAuthClient from "@/api/axiosClient";
import React, { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";

const Profile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState(
    Number.isNaN(Number(searchParams.get("userId")))
      ? 0
      : Number(searchParams.get("userId"))
  );
  const [user, setUser] = useState(null);
  const [myUserId, setMyUserId] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setMyUserId(localStorage.getItem("id"));
    axiosAuthClient
      .get("/users/pub?userId=" + userId)
      .then((response: any) => {
        console.log(response);
        setAvatar(response.avatar);
        setUser(response);
      })
      .catch((error) => console.log(error));
    if (searchParams.get("isSuccess") == "true") {
      setOpen(true)
    }
  }, [avatar]);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        message="I love snacks"
        key={"top center"}
        autoHideDuration={4000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Đổi thông tin thành công
        </Alert>
      </Snackbar>
      <Container>
        <ProfileBasic
          user={user}
          myUserId={myUserId}
          setAvatar={setAvatar}
          router={router}
        ></ProfileBasic>
      </Container>
      <br />
      <br />
      <Home search={{ createdBy: userId }}></Home>
    </>
  );
};

export default Profile;
