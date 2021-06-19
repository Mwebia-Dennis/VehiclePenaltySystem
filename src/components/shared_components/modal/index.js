import React, { useState } from 'react';
import {  withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { styles, DialogContent,DialogActions } from './style'
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// import PDFFile from '../../../images/demo.pdf'
// import useMediaQuery from '@material-ui/core/useMediaQuery'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";



const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function CustomizedDialogs(props) {

  const { pdf, handleClose, open } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  
  function formatPdfLink(pdf){

    if(pdf) {
      const splitLink = pdf.split(':')

      if(splitLink["0"].trim().toLowerCase() === 'http') {
        splitLink["0"] = "https"
      }
      return splitLink.join(':')
    }

    return pdf
  }


  return (
    <div>
      <Dialog 
        // fullScreen={fullScreen} 
        onClose={handleClose}
        fullWidth="lg"
        aria-labelledby="customized-dialog-title" 
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Report PDF
        </DialogTitle>
        <DialogContent dividers>
            <Document
                file={formatPdfLink(pdf)}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>


        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
