
import { Divider, Typography } from '@material-ui/core';
import React from 'react';
import { formTypes } from '../../../utils/constants'
import NewVehicleForm from './new_vehicle'
import NewUserForm from './new_user'
import NewPenaltyForm from './new_penalty'


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
    }
  
    return (
      <div>

      
        {formToRender()}

      </div>
    )
  

}

