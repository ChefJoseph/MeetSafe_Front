import React from 'react'
import { Box } from '@mui/material'

function ProfileInfo() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h1>Profile</h1>
      <h4>Username</h4>
      <h4>E-mail</h4>
      <h4>Default Address</h4>
    </Box>
  )
}

export default ProfileInfo