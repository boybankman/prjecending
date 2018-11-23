import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class DocumentInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    //console.log(user.email)
    let messageNodes = this.props.rows.map((r) => {
        console.log("tesss")
        // if(user.email === r.UserId){
        // return (
            
        //     <tr key={r.no + r.name}>
        //          <th >{r.key}</th>
        //         <th >{r.name}</th>
        //         <th>{r.UserId} </th>   
                                    
        //     </tr>
        // )}
    });
    return (
        
        <div className="thbor">
       
                    {messageNodes}

        </div>
      );
}
}
export default DocumentInput;