"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [isError, setIsError] = React.useState([false, false, false, false]);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body = {
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    };

    try {
      const response = await axiosAuthClient.post("/signup", body);
      router.push(`/login?signup=true`);
    } catch (error: any) {
      console.log(error.response.data.error)
      let thisErr =
        error.response.data.error != undefined ? error.response.data.error : "";
      if (thisErr == "") {
        let errs = [false, false, false, false];
        console.log(error.response.data);
        error.response.data.forEach((element: any) => {
          thisErr += element.field + " " + element.message + " - ";
          if (element.field == "email") {
            errs[2] = true;
          }
          if (element.field == "password") {
            errs[3] = true;
          }
          if (element.field == "firstName") {
            errs[0] = true;
          }
          if (element.field == "lastName") {
            errs[1] = true;
          }
        });
        setIsError(errs)
      } else {
        setIsError([false, false, true, false])
      }
      setError(thisErr.substring(0, thisErr.length-2));
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
            Đăng ký
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Họ"
                  autoFocus
                  error={isError[0]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Tên"
                  name="lastName"
                  autoComplete="family-name"
                  error={isError[1]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ Email"
                  name="email"
                  autoComplete="email"
                  error={isError[2]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={isError[3]}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login">Bạn đã có tài khoản?</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
