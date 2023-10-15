"use client";
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
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const [error, setError] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const signup = searchParams.get("signup") ?? false;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response: any = await axiosAuthClient.post("/login", {
        email: data.get("email"),
        password: data.get("password"),
      });
      console.log(response)
      if (!!response?.accessToken) {
        localStorage.setItem("token", response?.accessToken);
        localStorage.setItem("fullName", response?.firstName + " " + response?.lastName)
        localStorage.setItem("avatar", response?.avatar)
        localStorage.setItem("id", response?.id)
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.error ?? "Không được để trống");
      setIsError(true);
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
        <CssBaseline />
        {signup == "true" && (
          <Alert severity="success" sx={{ width: "100%" }}>
            Đăng ký thành công
          </Alert>
        )}
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
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Địa chỉ Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={isError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              error={isError}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              message="I love snacks"
              key={"top center"}
              autoHideDuration={4000}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {error}
              </Alert>
            </Snackbar>
            <Grid container>
              <Grid item xs>
                <Link href="#">Quên mật khẩu?</Link>
              </Grid>
              <Grid item>
                <Link href="/signup">Bạn chưa có tài khoản?</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Button
        onClick={async () => {
          try {
            const response = await axiosAuthClient.post("/controller", {
              pageIndex: 1,
              pageSize: 10,
            });
          } catch (error: any) {
            setError("");
            console.log(error);

            setIsError(true);
            setOpen(true);
          }
        }}
      >
        asd
      </Button>
    </ThemeProvider>
  );
}
