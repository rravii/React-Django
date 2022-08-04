import React from 'react'
import NavMenu from '../components/NavMenu'
import GlobalStyles from '../styles/GlobalStyle'

export default function CommonWrapper(props) {
  return (
    <div>
        <GlobalStyles />
        <NavMenu/>
        {props.children}
    </div>
  )
}
