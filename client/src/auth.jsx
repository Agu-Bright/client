import { Paper, Typography, Button, Stack } from "@mui/material";
import { Container } from "@mui/system";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState, useEffect } from "react";
import Input from "./components/input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./redux/actions/authAction";
const initialFormState = {
  email: "",
  password: "",
};

function Auth() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();
  useEffect(() => {
    if (error || !user) {
      navigate("/");
    }
  }, [error, navigate, user]);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    navigate("/getdetails");
  };
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "100px" }}>
      <Paper
        elevation={3}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* <Avatar>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <Stack container spacing={2}>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              value={formData.email}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              value={formData.password}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Stack>
          <Stack spacing={2} align="center" sx={{ margin: "10px" }}>
            <Button type="sumbit" variant="contained" fullWidth color="primary">
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
