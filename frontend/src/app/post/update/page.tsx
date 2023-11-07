"use client";
import { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
// import axiosAuthClient from "";
import dynamic from "next/dynamic";
import axiosAuthClient from "@/api/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";

// const axiosPostClient = dynamic(() => import("@/api/axiosPostClient"), { ssr: false });
const MyEditor = dynamic(() => import("@/component/app.full.editor.jsx"), {
  ssr: false,
});
const EditorNoToolBar = dynamic(
  () => import("@/component/app.no.toolbar.editor.jsx"),
  { ssr: false }
);

export default function CreatePost() {
  const [names, setNames] = useState([]);
  const [contentValue, setContentValue] = useState();
  const [titleValue, setTitleValue] = useState();
  const [tagSelected, setTagSelected] = useState([]);
  const [allTag, setAllTag] = useState([]);
  const [err, setErr] = useState("");
  const [id, setId] = useState(-1);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const postId = searchParams.get("postId");
    axiosAuthClient
      .post("/posts/pub/search", { id: postId })
      .then((response: any) => {
        if (response.posts.length !== 1) {
          router.push("../notFound=true");
          return;
        }
        const post = response.posts[0];
        if (post.createdBy.id != localStorage.getItem("id")) {
          console.log(post.createdBy.id + " " + localStorage.getItem("id"));
          router.push("../post?notPermission=true&postId=" + postId);
          return;
        }
        setId(post.id);
        try {
          setContentValue(JSON.parse(post.content));
        } catch (error) {
          setContentValue(post.content);
        }
        try {
          setTitleValue(JSON.parse(post.title));
        } catch (error) {
          setTitleValue(post.title);
        }
        const tags = post.tags.map((x) => x.name);
        setTagSelected(tags);
      })
      .catch((error) => router.push("../notFound=true"));

    axiosAuthClient
      .post("/tags/pub/search", {})
      .then((response: any) => {
        setNames(response.tags.map((x) => x.name));
        setAllTag(response.tags);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      tagSelected.length === 0 ||
      !!!titleValue ||
      !!!contentValue ||
      JSON.stringify(titleValue).length > 255 ||
      JSON.stringify(contentValue).length > 40000
    ) {
      setErr("Tag 1 ~ 5 cái, tiêu đề < 200 ký tự, nội dung < 15000 ký tự");
      return;
    } else {
      setErr("");
      try {
        if (id == -1) {
          const response: any = await axiosAuthClient.post("/posts", {
            title: JSON.stringify(titleValue),
            content: JSON.stringify(contentValue),
            tagIds: allTag
              .filter((t) => tagSelected.includes(t.name))
              .map((t) => t.id),
          });
          router.push("/post?postId=" + response);
        } else {
          const response: any = await axiosAuthClient.put("/posts", {
            id: id,
            title: JSON.stringify(titleValue),
            content: JSON.stringify(contentValue),
            tagIds: allTag
              .filter((t) => tagSelected.includes(t.name))
              .map((t) => t.id),
          });
          router.push("/post?postId=" + response);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Snackbar
        open={err != ""}
        autoHideDuration={6000}
        onClose={() => setErr("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClick={() => setErr("")}
        >
          {err}
        </Alert>
      </Snackbar>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <EditorNoToolBar
          value={titleValue}
          setValue={setTitleValue}
          placeholder={"Tiêu đề"}
        />
        <br />
        <Autocomplete
          getOptionDisabled={() => {
            return tagSelected.length > 4;
          }}
          style={{
            background: "#fff",
            color: "#000",
            margin: 0,
            width: "100%",
          }}
          sx={{ m: 1, width: 500 }}
          multiple
          options={names}
          value={tagSelected}
          getOptionLabel={(option) => option}
          disableCloseOnSelect
          onChange={(event, value) => {
            setTagSelected(value);
            console.log(value);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Thẻ" />
          )}
        />
        <br />
        <MyEditor value={contentValue} setValue={setContentValue} />
        <div style={{ position: "relative", marginTop: 10 }}>
          <Button
            variant="contained"
            style={{ position: "absolute", right: 0 }}
            type="submit"
          >
            Đăng
          </Button>
        </div>
      </Box>
    </>
  );
}
