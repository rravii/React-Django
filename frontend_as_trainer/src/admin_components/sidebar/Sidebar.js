import React from 'react'
import "./sidebar.css"
import { ContactMailOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">
                   Dashboard 
                </h3>
                <ul className="sidebarList">
                    {/* <li className="sidebarListItem active">
                        <LineStyle className='sidebarIcon'/>
                        Home
                    </li> */}
                    <Link to="/admin/contact" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <li className="sidebarListItem" active>
                        
                            <ContactMailOutlined className='sidebarIcon'/>
                             Contact
                        
                    </li>
                    </Link>
                </ul>
            </div>
        </div>
    </div>
  )
}
