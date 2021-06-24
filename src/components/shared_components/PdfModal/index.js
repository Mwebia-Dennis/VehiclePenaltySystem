import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Paper, ListItem, IconButton, Card, CardContent, Avatar, Typography, CardActions } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import { Close, FileCopy, Search, Visibility } from '@material-ui/icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { StyledMenuItem } from '../AppBar1/drop_down_menu/style'
import ProgressLoader from '../ProgressBarSpinner'
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getAllPdfFiles, searchPdf, setPdfFiles } from '../../../store/reducers/pdf_files/pdf.actions';
import { CLEAR_PDF_FILE_ERROR, CLEAR_PDF_FILE_MESSAGE } from '../../../store/reducers/pdf_files/pdf.types.js';
import { Alert } from '@material-ui/lab';
import pdf_logo from '../../../images/pdf_logo.jpg'
import Modal from '../modal';
import axios from 'axios';

export default function PdfModal(props) {
  const { isNavBar } = props
  const [open, setOpen] = React.useState(false);  
  const [pdfOpen, setPdfOpen] = useState({
      open: false,
      pdf: null,
  });
  const [searchQueryValue, setSearchQueryValue] = useState('')
  const pdfFileReducer = useSelector((state) => state.pdfFileReducer)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const authReducer = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  useEffect(() => {

    dispatch(getAllPdfFiles())

}, [open])

  const handleSearchBarChange = (value)=> {
    setSearchQueryValue(value)
  }

  const handleSearchButtonClick = ()=> {
     dispatch(searchPdf(searchQueryValue))
  }

  const onChange = (event)=> {
    
    const formData = new FormData()
    for(const file of event.target.files){
        formData.append("files[]", file)
    }
    if("id" in authReducer.data){
      dispatch(setPdfFiles(formData,authReducer.data.id))
    }


  }


  function handleModalOpen(pdf){
    setPdfOpen({
        pdf: pdf,
        open : true,
    });
};
const handleModalClose = () => {
  setPdfOpen({
      ...pdfOpen,
      open: false
  });
};


  if(pdfFileReducer.message) {
    showSnackBar(pdfFileReducer.message, 'success');
    dispatch({ type: CLEAR_PDF_FILE_MESSAGE})
}

if(pdfFileReducer.error) {
    if("errors" in pdfFileReducer.error) {
        for (const key in pdfFileReducer.error.errors) {

            showSnackBar(pdfFileReducer.error.errors[key]["0"], 'error');
            
        }
    }else if("error" in pdfFileReducer.error) {

        showSnackBar(pdfFileReducer.error.error, 'error');
    }
    dispatch({ type: CLEAR_PDF_FILE_ERROR})
}

  function showSnackBar(msg, variant = 'info'){
    enqueueSnackbar(msg, {
        variant: variant,            
        action: (key) => (
            <IconButton style={{color: '#fff'}} size="small" onClick={() => closeSnackbar(key)}>
                <Close />
            </IconButton>
        ),
    })
}


  return (
    <div>


      {

        isNavBar?


          <StyledMenuItem onClick={handleClickOpen} >
            <ListItemIcon>
                <FileCopy />
            </ListItemIcon>
            <ListItemText primary={"PDF dosyaları"} />
          </StyledMenuItem>
        :

        <ListItem button onClick={handleClickOpen}>
            <ListItemIcon>
                    <FileCopy />
            </ListItemIcon>
            <ListItemText primary={"PDF dosyaları"} />
        </ListItem>

      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Tüm pdf verileri"}</DialogTitle>
        <DialogContent style={{padding: "20px 0"}}>

          
            <Grid container>

              <Grid item xs={12} >

                <Grid container>

                  <Grid item xs={9}>

                    <SearchBar
                        value={searchQueryValue}
                        onChange={(newValue) => handleSearchBarChange(newValue)}
                        onRequestSearch={handleSearchButtonClick}
                        placeholder={"Arama... "}
                        style={{margin: '10px'}}
                    />

                  </Grid>
                  <Grid item xs={3}>
                
                    <Button onClick={handleSearchButtonClick} style={{marginTop: '19px', padding: '20px auto'}} color="primary" variant="contained">
                        pdf ara
                    </Button>

                  </Grid>

                </Grid>

              </Grid>


                {
                      pdfFileReducer.loading?
                          <ProgressLoader />
                      :

                          ("data" in pdfFileReducer.data)?

                                  
                            pdfFileReducer.data.data.map((item)=>(

                                <Grid item xs={6} md={4}>
                                    <Grid container   
                                        direction="column"
                                        alignItems="center"
                                        justify="center">

                                        <Grid item xs={12} md={12}>

                                            <Card>
                                                <CardContent>
                                                    <Avatar alt="Remy Sharp" variant="square" src={pdf_logo} style={{width: '50px', height: '50px'}}/>
                                                    <Typography variant="h6" style={{fontSize: '13px', fontWeight: 'bold'}}>{item.created_at}</Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button onClick={()=>handleModalOpen(item.file_url)} startIcon={<Visibility />} color="secondary" variant="outlined">
                                                      Görünüm
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>


                                    </Grid>
                                </Grid>
                            ))
                :
                <Alert severity="info" style={{margin: '20px 10px'}}>0 sonuç bulundu</Alert>


              }
                  

            </Grid>
          


        </DialogContent>
        <DialogActions>

          <input
            accept="application/pdf"
            id="pdf_files"
            multiple
            type="file"
            style={{display: "none"}}
            onChange={onChange}
          />
          <label htmlFor="pdf_files">
            <Button color="primary" 
              component="span">
              Yeni PDF Ekle
            </Button>
          </label>
          
        </DialogActions>
      </Dialog>
      <Modal handleClose={handleModalClose} open={pdfOpen.open} pdf={pdfOpen.pdf} />
    </div>
  );
}
