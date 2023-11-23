"use client";
import Home from "@/app/page";
import { colors } from "@mui/material";

export default function Follow() {
  return (
    <>
      <h2 style={{color: 'black'}}>Danh sách bài viết đang theo dõi:</h2>
      <Home search={{ isFollow: true }}></Home>
    </>
  );
}
