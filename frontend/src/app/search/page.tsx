"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Home from "../page";
import { useEffect, useRef, useState } from "react";
import axiosAuthClient from "@/api/axiosClient";
import { Autocomplete, Button, Input, TextField } from "@mui/material";

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [key, setKey] = useState(searchParams.get("key"));
  const [tagId, setTagId] = useState(searchParams.get("tagIds")?.split(","));
  const [names, setNames] = useState([]);
  const [tagSelected, setTagSelected] = useState([]);
  const [allTag, setAllTag] = useState([]);
  const [searchKey, setSearchKey] = useState(searchParams.get("key"));
  const [searchTagIds, setSearchTagIds] = useState(searchParams.get("tagIds"));

  useEffect(() => {
    setKey(searchParams.get("key"));
    setTagId(searchParams.get("tagIds")?.split(","));

    axiosAuthClient
      .post("/tags/pub/search", {})
      .then((response: any) => {
        setNames(response.tags.map((x) => x.name));
        setAllTag(response.tags);
        const tags = searchParams.get("tagIds")?.split(",");
        const tagsSelected = [];
        if (tags != null)
          response.tags.forEach((tag) => {
            if (tags.includes(tag.id + "")) tagsSelected.push(tag.name);
          });
        setTagSelected(tagsSelected);
      })
      .catch((error) => console.log(error));
  }, [searchParams.get("key"), searchParams.get("tagIds")]);

  var timeoutTag = useRef();
  useEffect(() => {
    setSearchTagIds(
      allTag.filter((t) => tagSelected.includes(t.name)).map((t) => t.id)
    );
    // clearTimeout(timeoutTag.current);
    // timeoutTag.current = setTimeout(
    //   () =>
    //     setTagId(
    //       allTag.filter((t) => tagSelected.includes(t.name)).map((t) => t.id)
    //     ),
    //   1500
    // );
  }, [tagSelected]);

  var timeoutKey: string | number | NodeJS.Timeout | undefined;
  return (
    <>
      <div className="">
        <Input
          style={{
            background: "#fff",
            color: "#000",
            margin: "20px 20px 0px 20px",
            padding: 8,
            width: "96%",
            maxWidth: 1000,
          }}
          onChange={(x) => {
            setSearchKey(x.target.value);
            // clearTimeout(timeoutKey);
            // timeoutKey = setTimeout(() => setKey(x.target.value), 1000);
          }}
          placeholder="Tìm kiếm"
          value={searchKey}
        ></Input>
        <Autocomplete
          getOptionDisabled={() => {
            return tagSelected.length > 10;
          }}
          style={{
            background: "#fff",
            color: "#000",
            margin: 20,
            width: "96%",
            maxWidth: 1000,
          }}
          sx={{ m: 1, width: 500 }}
          multiple
          options={names}
          value={tagSelected}
          getOptionLabel={(option) => option}
          disableCloseOnSelect
          onChange={(event, value) => {
            setTagSelected(value);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Thẻ" />
          )}
        />
        <div className="d-flex flex-row-reverse bd-highlight">
          <Button
            onClick={() =>
              router.push(
                "../search?key=" + searchKey + "&tagIds=" + searchTagIds
              )
            }
            variant="contained"
            style={{marginRight: 20}}
          >
            Tìm kiếm
          </Button>
        </div>

        <Home search={{ key: key, tagId: tagId }}></Home>
      </div>
    </>
  );
}
