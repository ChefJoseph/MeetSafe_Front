import React from 'react'
import "./css/SidebarChannel.css"
// import {setChannelInfo} from './features/appSlice';
// import {useDispatch} from 'react-redux';

const SidebarChannel = ({channel}) => {
    // const dispatch = useDispatch();
console.log(channel, "SBC")
    return (
        <div className="sidebarChannel" 
        // onClick={() => dispatch
        // (setChannelInfo({
        //     channelId: id, channelName: channelName,
        // }))}
        >
            <h4>
            {channel.channelName}
            </h4>
        </div>
    )
}

export default SidebarChannel;
