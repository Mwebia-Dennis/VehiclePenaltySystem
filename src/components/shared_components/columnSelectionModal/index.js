import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ReactExport from "react-export-excel";
import { pageType } from '../../../utils/constants'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

    const { open, handleClose,dataSetHeaders,dataSet} = props;
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const dataSetHeadersIds = [];
    for (const __data in dataSet["0"]) {
        dataSetHeadersIds.push(__data);
    }

    // removing unwanted cols
    if(dataSetHeadersIds.includes('#')) {
        const index = dataSetHeadersIds.indexOf('#');
        if (index > -1) {
            dataSetHeadersIds.splice(index, 1);
        }
    }
    if(dataSetHeadersIds.includes('pdf')) {
        const index = dataSetHeadersIds.indexOf('pdf');
        if (index > -1) {
            dataSetHeadersIds.splice(index, 1);
        }
    }
    if(dataSetHeadersIds.includes('profile')) {
        const index = dataSetHeadersIds.indexOf('profile');
        if (index > -1) {
            dataSetHeadersIds.splice(index, 1);
        }
    }
    if(dataSetHeadersIds.includes('action')) {
        const index = dataSetHeadersIds.indexOf('action');
        if (index > -1) {
            dataSetHeadersIds.splice(index, 1);
        }
    }

    const [selectedData, setSelectedData] = useState(dataSetHeadersIds.join())

    const handleChange = (event) => {
        const selectedDataSetHeadersIds = selectedData.split(',');
        if(selectedDataSetHeadersIds.includes(event.target.value)){
            const i = selectedDataSetHeadersIds.indexOf(event.target.value);
            if (i > -1) {
                selectedDataSetHeadersIds.splice(i, 1);
            }
        }else {
            selectedDataSetHeadersIds.push(event.target.value);
        }
        console.log(selectedDataSetHeadersIds)
        setSelectedData(selectedDataSetHeadersIds.join())
    }    
    

    
    const ExportToExcelBtn = () => {
        
        return (
            <ExcelFile
                filename={"report"}
                element={
                    <Button variant="contained" color="primary" onClick={handleClose}> Export to Excel</Button>
                    }
                >
                <ExcelSheet data={dataSet} name="Employees">

                    {
                        selectedData.split(',').map((item, index) => (

                            <ExcelColumn label={item} value={selectedData[index]} key={index} />
                        ))
                    }
                </ExcelSheet>
            </ExcelFile>
        );
    }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Choose columns to be added to document</DialogTitle>
        <DialogContent>


            <FormGroup>
                {
                    dataSetHeadersIds.map((item,index)=>(

                        <FormControlLabel
                            control={<Checkbox onChange={handleChange} checked={selectedData.includes(item)} name={"checked"+index} value={item} />}
                            label={item}
                        />
                    ))
                }
            </FormGroup>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Close
          </Button>
          <ExportToExcelBtn />
        </DialogActions>
      </Dialog>
    </div>
  );
}
