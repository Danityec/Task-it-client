import React from 'react';
import './Login.css'
import { GoogleLogin } from 'react-google-login'

const Login = (props) => {
     return (
        <div className={'login-page'}>
          <GoogleLogin className={'login-btn'}
            clientId={'198399782561-j1p0mljmh170ufum7em3qvm4cfvbqnsu.apps.googleusercontent.com'}
            onSuccess={(response)=>console.log(response)}
            onFailure={()=>console.log('failure')}
          />
        </div>
     )
}

export default Login