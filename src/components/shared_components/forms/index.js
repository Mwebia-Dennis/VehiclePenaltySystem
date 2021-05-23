
import { Divider, Typography } from '@material-ui/core';
import React from 'react';
import { formTypes } from '../../../utils/constants'
import NewVehicleForm from './new_vehicle'
import NewUserForm from './new_user'
import NewPenaltyForm from './new_penalty'
import LoginForm from './loginForm'
import SignUpForm from './signupForm'
import ForgotPasswordForm from './forgotPassword'
import NewPasswordForm from './forgotPassword/new_password'




export default (props) => {

    const {formType} = props;
    const formToRender = ()=> {

      if(formType == formTypes.newVehicle) {
        //new vehicle form

        return <NewVehicleForm />
        
      }else if(formType == formTypes.newUser) {
        //new User form

        return <NewUserForm />
        
      }
      else if(formType == formTypes.newPenalty) {
        //new User form

        return <NewPenaltyForm />
        
      }
      else if(formType == formTypes.login) {
        //new User form

        return <LoginForm />
        
      }
      else if(formType == formTypes.signUp) {
        //new User form

        return <SignUpForm />
        
      }
      
      else if(formType == formTypes.forgotPassword) {
        //new User form

        return <ForgotPasswordForm />
        
      }
      
      else if(formType == formTypes.newPassword) {
        //new User form

        return <NewPasswordForm />
        
      }
    }
  
    return (
      <div>

      
        {formToRender()}

      </div>
    )
  

}

