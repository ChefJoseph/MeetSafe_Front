import React, { useEffect } from "react";
import { Box } from "@mui/material";
import AddressUpdateForm from "./AddressUpdateForm";
import { useState } from 'react';


function ProfileInfo({currentUser}) {

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h1>Profile</h1>
      <h4>{currentUser?.username}</h4>
      <h4>{currentUser?.email}</h4>
      <h4>{currentUser?.username}</h4>
      <h4>{currentUser?.address} {currentUser?.state} {currentUser?.zipcode}</h4>
      <AddressUpdateForm />
    </Box>
  );
}

export default ProfileInfo;
