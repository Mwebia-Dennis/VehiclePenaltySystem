import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ReactExport from "react-export-excel";
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

    const { open, handleClose,dataSet} = props;
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const dataSetHeadersIds = [];
    for (const __data in dataSet["0"]) {
        //get data keys 
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
    if(dataSetHeadersIds.includes('profile_img')) {
        const index = dataSetHeadersIds.indexOf('profile_img');
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
    if(dataSetHeadersIds.includes('AKSİYON')) {
        const index = dataSetHeadersIds.indexOf('AKSİYON');
        if (index > -1) {
            dataSetHeadersIds.splice(index, 1);
        }
    }
    if(dataSetHeadersIds.includes('select')) {
        const index = dataSetHeadersIds.indexOf('select');
        if (index > -1) {
            dataSetHeadersIds.splice(index, 1);
        }
    }
    if(dataSetHeadersIds.includes('seç')) {
        const index = dataSetHeadersIds.indexOf('seç');
        if (index > -1) {
            dataSetHeadersIds.splice(index, 1);
        }
    }

    const [selectedData, setSelectedData] = useState(dataSetHeadersIds.join())
    const handleSelectAll = ()=> {
        setSelectedData(dataSetHeadersIds.join())
    }
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
        setSelectedData(selectedDataSetHeadersIds.join())
    }    
    

    
    const ExportToExcelBtn = () => {
        
        const newDataSet = dataSet.map((data_item)=>{
            const __dataSet = {}
            let selected = selectedData.split(',')
            if(selected["0"] === "") {
                selected.splice(0,1)
            }
            selected.forEach((item) => {
                __dataSet[item] = data_item[item].toString()
            })
            return __dataSet
        })
        
        return (
            <ExcelFile
                filename={"report"}
                element={
                    <Button variant="contained" color="primary" 
                        disabled={(selectedData.split(',').length === 1 && selectedData.split(',')["0"] === "" )}
                        onClick={handleClose}
                    > Export to Excel</Button>
                    }
                >
                <ExcelSheet data={newDataSet} name="Report">

                    {
                        selectedData.split(',').map((item, index) => (

                            <ExcelColumn label={item} value={item} key={index} style={{font: {bold: true}}}/>
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
                    (dataSetHeadersIds.length > 0)?
                        dataSetHeadersIds.map((item,index)=>(
    
                            <FormControlLabel
                                control={<Checkbox onChange={handleChange} checked={selectedData.split(',').includes(item)} name={"checked"+index} value={item} />}
                                label={item}
                            />
                        ))
                    :
                    <Typography variant="small">0 results found</Typography>
                }
            </FormGroup>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleSelectAll} color="secondary" variant="contained">
            Select All
          </Button>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Close
          </Button>
          <ExportToExcelBtn />
        </DialogActions>
      </Dialog>
    </div>
  );
}
