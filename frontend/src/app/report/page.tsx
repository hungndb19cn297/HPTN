"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axiosAuthClient from "@/api/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Image } from "react-bootstrap";

export default function Report() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("post");
  const [period, setPeriod] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    var periodReport = searchParams.get("period");
    var typeReport = searchParams.get("type");
    if (periodReport != "MONTHLY" && periodReport != "DAILY")
      periodReport = "WEEKLY";
    if (typeReport != "USER") typeReport = "POST";
    setPeriod(periodReport);
    setType(typeReport);
    axiosAuthClient
      .get("/reports/pub/post-interact?periodReport=" + periodReport)
      .then((response: any) => {
        var report = response.map((x: any) => {
          var temp = "";
          try {
            console.log();
            temp = JSON.parse(x.title).ops[0].insert;
          } catch (error) {
            temp = x.title;
          }
          return {
            bookmarksCount: x.bookmarksCount,
            commentCount: x.commentCount,
            voteCount: x.voteCount,
            totalInteract: x.totalInteract,
            id: x.id,
            title: temp,
            followCount: x.followCount,
            user: x.user?.firstName + " " + x.user?.lastName,
            avatar: x.user?.avatar,
            userId: x.user?.id
          };
        });
        setData(report);
      });
  }, []);
  return (
    <>
      <FormControl>
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          style={{ fontSize: 20 }}
        >
          Loại
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={type}
          onChange={(event) => {
            setType((event.target as HTMLInputElement).value);
            var url =
              "/reports/pub/" +
              ((event.target as HTMLInputElement).value == "POST"
                ? "post"
                : "user") +
              "-interact?periodReport=" +
              period;
            axiosAuthClient.get(url).then((response: any) => {
              var report = response.map((x: any) => {
                var temp = "";
                try {
                  console.log();
                  temp = JSON.parse(x.title).ops[0].insert;
                } catch (error) {
                  temp = x.title;
                }
                return {
                  bookmarksCount: x.bookmarksCount,
                  commentCount: x.commentCount,
                  voteCount: x.voteCount,
                  totalInteract: x.totalInteract,
                  id: x.id,
                  title: temp,
                  followCount: x.followCount,
                  user: x.user?.firstName + " " + x.user?.lastName,
                  avatar: x.user?.avatar,
                  userId: x.user?.id
                };
              });
              setData(report);
            });
          }}
        >
          <FormControlLabel
            value="POST"
            control={<Radio />}
            label="Thống kê theo tương tác bài viết"
          />
          <FormControlLabel
            value="USER"
            control={<Radio />}
            label="Thống kê theo tương tác người dùng"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl>
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          style={{ fontSize: 20 }}
        >
          Thời gian
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={period}
          onChange={(event) => {
            setPeriod((event.target as HTMLInputElement).value);
            var url =
              "/reports/pub/" +
              (type == "POST" ? "post" : "user") +
              "-interact?periodReport=" +
              (event.target as HTMLInputElement).value;
            axiosAuthClient.get(url).then((response: any) => {
              var report = response.map((x: any) => {
                var temp = "";
                try {
                  console.log();
                  temp = JSON.parse(x.title).ops[0].insert;
                } catch (error) {
                  temp = x.title;
                }
                return {
                  bookmarksCount: x.bookmarksCount,
                  commentCount: x.commentCount,
                  voteCount: x.voteCount,
                  totalInteract: x.totalInteract,
                  id: x.id,
                  title: temp,
                  followCount: x.followCount,
                  user: x.user?.firstName + " " + x.user?.lastName,
                  avatar: x.user?.avatar,
                  userId: x.user?.id
                };
              });
              setData(report);
            });
          }}
        >
          <FormControlLabel
            value="DAILY"
            control={<Radio />}
            label="Theo ngày"
          />
          <FormControlLabel
            value="WEEKLY"
            control={<Radio />}
            label="Theo tuần"
          />
          <FormControlLabel
            value="MONTHLY"
            control={<Radio />}
            label="Theo tháng"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, maxWidth: "100%" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow style={{}}>
              <TableCell style={{ fontSize: 14, fontWeight: 600 }} align="left">
                {type == "POST" ? "Tiêu đề bài viết" : "Thành viên"}
              </TableCell>
              <TableCell
                style={{ fontSize: 14, fontWeight: 600 }}
                align="center"
              >
                Số lượt lưu
              </TableCell>
              <TableCell
                style={{ fontSize: 14, fontWeight: 600 }}
                align="center"
              >
                Số lượt bình luận
              </TableCell>
              <TableCell
                style={{ fontSize: 14, fontWeight: 600 }}
                align="center"
              >
                Số lượt bỏ phiếu
              </TableCell>
              <TableCell
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  display: type == "POST" ? "none" : "table-cell",
                }}
                align="center"
              >
                Số người theo dõi
              </TableCell>
              <TableCell
                style={{ fontSize: 14, fontWeight: 600 }}
                align="center"
              >
                Tổng tương tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="left"
                  component="th"
                  scope="row"
                  style={{
                    maxWidth: 400,
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    fontSize: 16,
                  }}
                >
                  {type == "USER" && (
                    <Link
                      style={{ textDecoration: "none" }}
                      href={"../profile?userId=" + row.userId}
                    >
                      <Image
                        src={row.avatar}
                        roundedCircle
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: 12,
                        }}
                      />
                      {row.user}
                    </Link>
                  )}
                  {type == "POST" && (
                    <Link
                      style={{ textDecoration: "none" }}
                      href={"../post?postId=" + row.id}
                    >
                      {row.title}
                    </Link>
                  )}
                </TableCell>
                <TableCell align="center">{row.bookmarksCount}</TableCell>
                <TableCell style={{ fontSize: 16 }} align="center">
                  {row.commentCount}
                </TableCell>
                <TableCell style={{ fontSize: 16 }} align="center">
                  {row.voteCount}
                </TableCell>
                <TableCell
                  style={{
                    fontSize: 16,
                    display: type == "POST" ? "none" : "table-cell",
                  }}
                  align="center"
                >
                  {row.followCount}
                </TableCell>
                <TableCell style={{ fontSize: 16 }} align="center">
                  {row.totalInteract}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
