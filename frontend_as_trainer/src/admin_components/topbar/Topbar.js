import React from 'react'
import "./Topbar.css"
import {NotificationsNone, Settings} from '@material-ui/icons';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
    let navigate = useNavigate();
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topleft">
                <span className="logo">Welcome</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone/>
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings/>
                </div>
                <div onClick={()=>{
                    localStorage.clear()
                    navigate('/login', {replace: true})
                }} className="topbarIconContainer">
                    <LogoutIcon/>
                </div>
                {/* <img src="https://static.remove.bg/remove-bg-web/bf3af3e882eb04971b4492a1015ef7e77df29362/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png" alt="" className="topAvatar" /> */}
            </div>
        </div>

    </div>
  )
}
