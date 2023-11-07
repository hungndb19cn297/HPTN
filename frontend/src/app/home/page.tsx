"use client";
import { Alert, Snackbar } from "@mui/material";
import Home from "../page";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home2() {
  const [err, setErr] = useState("");
  const [errType, setErrType] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("isDelete") == "true") {
      setErr("Xoá bài viết thành công!");
      setErrType(true);
    } else if (searchParams.get("isDelete") == "false") {
      setErr("Xoá bài viết thất bại");
      setErrType(false);
    } else if (searchParams.get("postNotFound") == "true") {
        setErr("Bài viết không tồn tại");
        setErrType(false);
    }

  }, []);
  return (
    <>
      <Snackbar
        open={err != ""}
        autoHideDuration={6000}
        onClose={() => setErr("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={errType ? "success" : "error"}
          sx={{ width: "100%" }}
          onClick={() => setErr("")}
        >
          {err}
        </Alert>
      </Snackbar>
      <Home></Home>
    </>
  );
}
