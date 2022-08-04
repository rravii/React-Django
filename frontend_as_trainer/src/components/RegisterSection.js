import React from 'react'
import styled from 'styled-components';
import RegisterForm from './RegisterForm';
import SectionTitle from './SectionTitle';

const LoginSectionStyle = styled.div`
    padding: 10rem 0;
    .contactSection__wrapper{
        display: flex;
        gap: 5rem;
        margin-top: 7rem;
        justify-content: space-between;
        position: relative;
        width: -webkit-fill-available;
    }
    .container {
        max-width: 1200px;
        width: 90%;
        margin: 0 auto;
      }
    .contactSection__wrapper::after{
        position: absolute;
        content: '';
        width: 2px;
        height: 50%;
        background-color: var(--gray-1);
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%);
    }
    .left{
        width: 100%;
        max-width: 500px;
        display: flex;
    }
    .right{
        width: 100%;
        max-width: 500px;
    }
    @media only screen and (max-width: 768px){
        .contactSection__wrapper {
            flex-direction: column;
        }
        .contactSection__wrapper::after{
            display: none;
        }
        .left,.right{
            max-width: 100%;
        }
        .right{
            padding: 4rem 2rem 2rem 2rem;
        }
    }
`;

export default function RegisterSection() {
  return (
    <LoginSectionStyle>
        <SectionTitle heading="Register" subheading="Welcome !!"></SectionTitle>
        <div className='container'>
            <div className='contactSection__wrapper'>
                <div className='left'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                    in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className='right'>
                    <RegisterForm></RegisterForm>
                </div>
            </div>
        </div>
    </LoginSectionStyle>
  )
}
