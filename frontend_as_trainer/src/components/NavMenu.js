import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const NavMenuStyles = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem 0;
    background: var(--dark-bg);
    ul{
        max_width: 1200px;
        margin: 0 auto;
        width: 90%;
        text-align: center;
        li{
            display: inline-block;
            border-radius: 8px;
            transition: .3s ease background-color;
            &:hover{
                background-color: var(--deep-dark);
            }
        }
        a{
            display:inline-block;
            font-family: 'RobotoMono Regular';
            padding: 1rem 2rem;
            font-size: 2rem;
            color: var(--gray-1);
            outline: none;
        }
        .active {
            color: var(--white);
        }
    }
`;

export default function NavMenu(){

    return(
        <NavMenuStyles>
            <ul>
                <li>
                    <NavLink to="/" exact>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/contact_us">Contact Us</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
            </ul>
        </NavMenuStyles>
    );
}