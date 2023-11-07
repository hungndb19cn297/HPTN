"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Image } from "react-bootstrap";
import axiosAuthClient from "@/api/axiosClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const defaultTheme = createTheme();
export default function SignUp() {
  const [myUserId, setMyUserId] = React.useState(null);
  const router = useRouter();
  useEffect(() => {
    setMyUserId(localStorage.getItem("id"));
  });
  const [error, setError] = React.useState("");
  const [isError, setIsError] = React.useState([false, false, false, false]);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body = {
      newPassword: data.get("newPassword"),
      oldPassword: data.get("oldPassword"),
    };

    try {
      const response = await axiosAuthClient.put("/users/password", body);
      router.push(`/profile?isSuccess=true&userId=` + myUserId);
    } catch (error: any) {
      let thisErr =
        error.response.data.error != undefined ? error.response.data.error : "";
      if (thisErr?.trim() == "Sai mật khẩu cũ") {
        setIsError([true, false]);
      } else if (thisErr == "") {
        let errs = [false, false];
        error.response.data.forEach((element: any) => {
          thisErr += element.field + " " + element.message + " - ";
          if (element.field == "oldPassword") {
            errs[0] = true;
          }
          if (element.field == "newPassword") {
            errs[1] = true;
          }
        });
        setIsError(errs);
      } else {
        setIsError([false, false]);
      }
      setError(thisErr.substring(0, thisErr.length - 2));
      setOpen(true);
    }
  };

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
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          backgroundColor: "#fff",
          padding: "10px 30px 30px 30px",
          borderRadius: 8,
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          message="I love snacks"
          key={"top center"}
          autoHideDuration={4000}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src="logo2.png" width={60} height={60}></Image>
          <Typography component="h1" variant="h5">
            Đổi mật khẩu
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="oldPassword"
                  label="Mật khẩu cũ"
                  type="password"
                  id="oldPassword"
                  error={isError[0]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newPassword"
                  label="Mật khẩu mới"
                  type="password"
                  id="newPassword"
                  error={isError[1]}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đổi mật khẩu
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/profile/update">Đổi thông tin cá nhân</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
