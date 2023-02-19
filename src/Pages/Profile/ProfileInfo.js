import React, { useEffect } from "react";
import { Box } from "@mui/material";
import AddressUpdateForm from "./AddressUpdateForm";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from "@mui/material/Button";


function ProfileInfo({currentUser,edit}) {

  function handleChangeDetails(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch("/users",{method:"PATCH",body:data}).then(resp=>resp.json())
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      { !edit ?
      <>
      <h1>Profile</h1>
      <h4>{currentUser?.username}</h4>
      <h4>{currentUser?.email}</h4>
      <h4>{currentUser?.phone}</h4>
      <h4>{currentUser?.address} {currentUser?.state} {currentUser?.zipcode}</h4>
      <AddressUpdateForm />
      </>
        :
      <Box component="form">
      <TextField
                defaultValue = {currentUser?.username}
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                autoComplete="username"
                autoFocus
              />
       <TextField
              defaultValue = {currentUser?.email}
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="text"
                id="email"
                autoComplete="email"
                autoFocus
              />
       <TextField
                defaultValue = {currentUser?.phone}
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="phone"
                id="phone"
                autoComplete="phone"
                autoFocus
              />
       <TextField
                defaultValue = {currentUser?.address}
                margin="normal"
                required
                fullWidth
                name="address"
                label="Address"
                type="text"
                id="address"
                autoComplete="address"
                autoFocus
              />
        <Button type="submit"
                fullWidth
                variant="contained" 
                onSubmit={handleChangeDetails}>
                Change
        </Button>

      </Box>
      }

    </Box>
  );
}

export default ProfileInfo;
