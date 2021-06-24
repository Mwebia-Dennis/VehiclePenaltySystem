import React, { useState, useEffect } from 'react';
import { Button, DialogActions,
    Dialog,DialogContent, DialogTitle, IconButton, MenuItem, Typography, Card, CardContent, CardActions, Avatar, Grid
} from '@material-ui/core';
import { Close, CloudDownload, Folder } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { downloadFile, getAllFiles, setExcelFiles } from '../../../store/reducers/excel_files/excelFiles.actions';
import ProgressLoader from '../ProgressBarSpinner'
import { useSnackbar } from 'notistack';
import { CLEAR_EXCEL_FILE_ERROR, CLEAR_EXCEL_FILE_MESSAGE } from '../../../store/reducers/excel_files/excelFiles.types';
import Alert from '@material-ui/lab/Alert';
import excel from '../../../images/excel.png'
import axios from 'axios';
import fileDownload from 'js-file-download';


export default function ExcelFileModal(props){

    const { excelFileType } = props
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const excelFileReducer = useSelector((state) => state.excelFileReducer)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = ()=>{
        setOpen(false)
    };


    useEffect(() => {

        dispatch(getAllFiles(excelFileType))

    }, [open])

    const handleDownloadFile = (url)=> {
        //file_id
        // dispatch(downloadFile(file_id))
        const fileName = url.split("/storage/excel/")
        axios.get(url, {
            responseType: 'blob',
          }).then(res => {
            fileDownload(res.data, fileName["1"]);
          });
    }

    if(excelFileReducer.message) {
        showSnackBar(excelFileReducer.message, 'success');
        dispatch({ type: CLEAR_EXCEL_FILE_MESSAGE})
    }

    if(excelFileReducer.error) {
        if("errors" in excelFileReducer.error) {
            for (const key in excelFileReducer.error.errors) {

                showSnackBar(excelFileReducer.error.errors[key]["0"], 'error');
                
            }
        }else if("error" in excelFileReducer.error) {

            showSnackBar(excelFileReducer.error.error, 'error');
        }
         dispatch({ type: CLEAR_EXCEL_FILE_ERROR})
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


    return (<div>

        <MenuItem 
            onClick={handleClickOpen}
        >
            
            <IconButton variant="contained" 
                >
                <Folder />
            </IconButton>
            <p>All Excel Files</p>

        </MenuItem>
        <Dialog maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">

                Excel Documents
                
            </DialogTitle>
            <DialogContent>

                {
                    excelFileReducer.loading?
                        <ProgressLoader />
                    :

                        ("data" in excelFileReducer.data)?

                            <Grid container spacing={1}>
                                {
                                    excelFileReducer.data.data.map((item)=>(

                                        <Grid item xs={6} md={5}>
                                            <Grid container   
                                                direction="column"
                                                alignItems="center"
                                                justify="center">

                                                <Grid item xs={12} md={12}>

                                                    <Card>
                                                        <CardContent>
                                                            <Avatar alt="Remy Sharp" variant="square" src={excel} style={{width: '100px', height: '100px'}}/>
                                                            <Typography variant="h6" style={{fontSize: '13px', fontWeight: 'bold'}}>{item.created_at}</Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button startIcon={<CloudDownload />} color="secondary" variant="outlined" onClick={()=>handleDownloadFile(item.file_url)}>
                                                                İndir
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>


                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        :
                        <Alert severity="info">0 sonuç bulundu</Alert>


                }

            </DialogContent>
            
            <DialogActions>
                    <Button startIcon={<Close />} color="primary" variant="contained" onClick={handleClose}>
                        close
                    </Button>
            </DialogActions> 
        </Dialog>
    </div>)


  }
