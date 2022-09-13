import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";

function Input({ half, name, handleChange, label, type, handleShowPassword }) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {/* {type === "password" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )} */}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : ""
        }
      />
    </Grid>
  );
}

export default Input;
