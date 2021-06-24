import React from 'react'




export default class ComponentToPrint extends React.PureComponent {

  render() {
    return (

      <div style={{width: '100%', padding: '20px 0'}}>
        <p style={{textAlign: 'center', fontSize: '24px'}}>birim-aktif-arac-list</p>
      <table className={["table, table-striped"].join()} style={{width: '100%'}}>

        <thead>
          
          {
            this.props.headers.map((item, index)=>
                <th style={{backgroundColor: '#0275d8', padding: '20px', color: '#fff'}} key={index} scope="col">{item}</th>)
          }
        </thead>
        <tbody>
            {
              this.props.data.map((item, index)=> (
                <tr key={index}>
                    {this.props.headers.map((header, index1)=>{
                      const scope = (index1 == 0)?"row":""
                      return <td scope={scope} key={index1}  style={{padding: '15px', fontSize: '18px'}}>{ item[header] }</td>
                    })}
                </tr>
              ))
            }
        </tbody>
      </table>

      </div>
    );
  }
}
