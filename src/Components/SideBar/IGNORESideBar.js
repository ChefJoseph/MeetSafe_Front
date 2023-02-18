import React from 'react'
import './css/Sidebar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import {Avatar} from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
// import BuildIcon from '@mui/icons-material/Build';
// import { withStyles } from '@mui/material'
import { Typography } from '@mui/material';
import SidebarChannel from './IGNORESidebarChannel';
import { channelData } from './ChannelData'

function SideBar() {
    console.log(channelData, "SideBar")

    const handleAddChannel = () => {}

    const renderedChannels = channelData.map(( channel) => (
        <SidebarChannel key={channel.id} channel={channel}/>
    ))
    
  return (
    <div className="sidebar">
            <div className="sidebar__top">
                <h4>Discord</h4>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                        <div className="sidebar__header">
                                <ExpandMoreIcon />
                                <h4>Text Channels</h4>
                        </div>
                    

                        <AddCircleIcon onClick={handleAddChannel} className="sidebar__addChannel" />
            
                    
                </div>

                <div className="sidebar__channelsList">
                    {renderedChannels}
                </div>
            </div>

          <div className="sidebar__voice">
              <SignalCellularAltIcon className="sidebar__voiceIcon"
              fontSize="large"/>
              <div className="sidebar__voiceInfo">
                  <h3>Voice Connected</h3>
                  <p>Stream</p>
              </div>

                <div className="sidebar__voiceIcons">
                    <InfoIcon />
                    <CallIcon />
                </div>

          </div>

            <div className="sidebar__profile">

                        <>
                        <Typography color="inherit">Click Here To <b>{'LOGOUT'}</b></Typography>
                        </>

                    <Avatar style={{cursor: 'pointer'}}/>
    
                
                <div className="sidebar__profileInfo">
                    <h3>User Name</h3>
                </div>

                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>


        </div>
    
  )
}

export default SideBar