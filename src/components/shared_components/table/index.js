import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow,useStyles } from './style';




export default function CustomizedTables(props) {
  const classes = useStyles();
  const { rows, tableHeader } = props;

  return (
    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>

              {
                  tableHeader.map((item, index)=> {

                    const align = (index == 0)?'':"center";
                    return <StyledTableCell align={align} >{item}</StyledTableCell>
                  })
              }
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item, index) => {

                const cellsData = [];
                for (const key in item) {
                    cellsData.push(<StyledTableCell align="center">{item[key]}</StyledTableCell>)
                }
                return (
                    <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                            {index + 1}
                        </StyledTableCell>


                        { cellsData }
                    </StyledTableRow>
                );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
