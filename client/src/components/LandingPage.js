import React from 'react'
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  return (
    <div className='main-container'>

      <div className='grid-x landing-container'>
        <div className='cell small-6'>
          <h4 className='subheader'>welcome to</h4>
          <h1 className='subheader'>
            myMapp
        </h1>
          <img className='landing-img' src="https://i.imgur.com/TfvQM2t.png" />
        </div>

        <div className='cell small-6 button-div text-center'>
          <h4 className='subheader landing-signup-phrase'>sign in or create an account</h4>
          <Link to="/user-sessions/new" id='btn-sign'>
            Sign In
          </Link>
          <Link to="/users/new" className="button" id='btn-sign'>
            Sign Up
          </Link>
          <h5 className='subheader landing-phrases'>show the world where you've gone</h5>
        </div>
      </div>
    </div>
  )
}

export default LandingPage