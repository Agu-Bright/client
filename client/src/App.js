import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { getDetails } from "./redux/actions/numDetailActions";
import {
  Stack,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FileUpload from "./components/fileUpload";

const App = () => {
  const [state, setState] = useState("Get Details");
  const [isSubmit, setIsSubmit] = useState("UPLOAD");
  const [clear] = useState(false);
  const dispatch = useDispatch();
  const { loading, details } = useSelector((state) => state.details);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Choose File");
  const [lineType, setLineType] = useState("");

  const token = localStorage.getItem("token");
  const handleClearDatabase = async () => {
    await axios.delete("/api/delete");
  };
  const cookie = document.cookie;
  console.log(cookie);
  useEffect(() => {
    dispatch(getDetails(lineType));
  }, [dispatch, state, isSubmit, clear, lineType]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fisier", file);
    try {
      await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <>
      {!token ? (
        <Navigate to="/" />
      ) : (
        <Stack spacing={3} sx={{ margin: "2px" }}>
          <Alert severity="warning">
            <List>
              <ListItem>
                <Typography>
                  # Ensure that the file input is a csv file
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  # Click the get details button or refresh the page if there is
                  no ressult after upload
                </Typography>
              </ListItem>
              <ListItem>
                <Typography># Clear the database after each upload</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  # The first item from the csv file is always skipped
                </Typography>
              </ListItem>
            </List>
          </Alert>
          <Stack spacing={2}>
            <Paper
              sx={{
                backgroundColor: "gray",
                display: "flex",
                alignItems: "center",
                justifyContents: "center",
              }}
            >
              <FileUpload
                submit={onSubmit}
                onChange={onChange}
                name={fileName}
                isSubmit={isSubmit}
                setIsSubmit={setIsSubmit}
              />
            </Paper>

            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button variant="contained" onClick={() => setLineType("mobile")}>
                Mobile
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setLineType("landline")}
              >
                Landline
              </Button>
            </Stack>
          </Stack>
          {loading ? (
            <CircularProgress />
          ) : (
            details?.map((info) => (
              <Stack
                key={info._id}
                sx={{
                  margin: "10px",
                  padding: "8px",
                  borderRadius: "5px",
                  backgroundColor: "skyblue",
                }}
              >
                <Typography>valid : {info.valid}</Typography>
                <Divider />
                <Typography>Number : {info.number}</Typography>
                <Divider />
                <Typography>Local Format : {info.local_format}</Typography>
                <Divider />
                <Typography>
                  International Format : {info.international_format}
                </Typography>
                <Divider />
                <Typography>Country Prefix : {info.country_prefix}</Typography>
                <Divider />
                <Typography>Country Code : {info.country_code}</Typography>
                <Divider />
                <Typography>Country Name : {info.country_name}</Typography>
                <Divider />
                <Typography>Country location : {info.location}</Typography>
                <Divider />
                <Typography>Carrier : {info.carrier}</Typography>
                <Divider />
                <Typography>Line Type : {info.line_type}</Typography>
                {/* <Stack direction="row" spacing={2}>
              <Button>mobile</Button>
              <Button>land Line</Button>
            </Stack> */}
              </Stack>
            ))
          )}
          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            color="secondary"
            onClick={() => setState("Loading")}
          >
            {state}
          </Button>
          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            color="secondary"
            onClick={handleClearDatabase}
          >
            {clear ? "clearing" : "clear"}
          </Button>
        </Stack>
      )}
    </>
  );
};

export default App;
