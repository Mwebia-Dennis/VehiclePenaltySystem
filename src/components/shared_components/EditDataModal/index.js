import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from '../forms'
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

export default function EditDataModal(props) {

    const { editModalOpen, handleEditDataModalClose, formType, page_type } = props
    
    const title = (page_type)?page_type:''

  return (
    <div>
      <Dialog open={editModalOpen.open} onClose={handleEditDataModalClose} aria-labelledby="form-dialog-title">
        
      <DialogActions>
          <IconButton onClick={handleEditDataModalClose}>
            <Close />
          </IconButton>
        </DialogActions>
        <DialogContent>

            <Form formType={formType} title={title} isUpdate={true} data={editModalOpen.data}/>

        </DialogContent>
      </Dialog>
    </div>
  );
}
