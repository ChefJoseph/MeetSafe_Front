import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function AddressUpdateForm() {
  const [formInput, setFormInput] = useState({
    address: "",
    state: "",
    zip_code: "",
  });

  function formControl(e) {
    const key = e.target.name;
    setFormInput((data) => ({ ...data, [key]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formInput.address || !formInput.state || !formInput.zip_code) {
      alert("Please fill all the address info.");
    } else {
      const address =
        formInput.address + " " + formInput.state + " " + formInput.zip_code;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address
          .split(" ")
          .join("+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("finding coordinates", data);
          fetch(`/users/{user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formInput,
              lat: data.results[0].geometry.location.lat,
              lng: data.results[0].geometry.location.lng,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              // TODO
              // update user context here
              console.log(data);
            });
        });
    }
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 1, maxWidth: "500px" }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        name="address"
        label="Address"
        type="text"
        id="address"
        autoComplete="address"
        autoFocus
        value={formInput.address}
        onChange={(e) => formControl(e)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="state"
        label="State"
        name="state"
        autoComplete="state"
        value={formInput.state}
        onChange={(e) => formControl(e)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="zip_code"
        label="Zip Code"
        type="number"
        id="zip_code"
        autoComplete="zip_code"
        value={formInput.zip_code}
        onChange={(e) => formControl(e)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update Address
      </Button>
    </Box>
  );
}

export default AddressUpdateForm;