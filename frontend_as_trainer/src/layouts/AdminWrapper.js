import React from 'react'
import Sidebar from '../admin_components/sidebar/Sidebar'
import Topbar from '../admin_components/topbar/Topbar'

export default function AdminWrapper(props) {
  return (
    <div>
        <Topbar/>
        <div className="container">
            <Sidebar/>

        {props.children}
        </div>
    </div>
  )
}
