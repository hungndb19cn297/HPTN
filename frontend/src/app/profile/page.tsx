"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import Home from "../page";
import { useState } from "react";
import { Container, Image } from "react-bootstrap";
import ProfileBasic from "@/component/app.profile";
import axiosAuthClient from "@/api/axiosClient";
import React, { useEffect } from "react";

const Profile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClick = () => {
    router.push("/");
  };
  const [userId, setUserId] = useState(
    Number.isNaN(Number(searchParams.get("userId")))
      ? 0
      : Number(searchParams.get("userId"))
  );
  const [user, setUser] = useState(null);
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
    setMyUserId(localStorage.getItem("id"));
    axiosAuthClient
      .get("/users/pub?userId=" + userId)
      .then((response: any) => {
        console.log(response);
        setUser(response);
      })
      .catch((error) => console.log(error));
  }, []);

  
  return (
    <>
      <Container>
        <ProfileBasic user={user} myUserId={myUserId} ></ProfileBasic>
      </Container>
      <br />
      <br />
      <Home search={{ createdBy: userId }}></Home>
    </>
  );
};

export default Profile;
