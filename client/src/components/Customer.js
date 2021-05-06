import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class Customer extends React.Component {

    render() {
        return(
                <TableRow>
                    <TableCell>{this.props.id}</TableCell>
                    <TableCell>{this.props.ip}</TableCell>
                    <TableCell>{this.props.name}</TableCell>
                    <TableCell>{this.props.mgr_ip}</TableCell>
                    <TableCell>{this.props.type}</TableCell>
                    <TableCell>{this.props.user_id}</TableCell>
                    <TableCell>{this.props.reg_time}</TableCell>
                    <TableCell>{this.props.disconnect_time}</TableCell>
                </TableRow>
        )
    }
}




export default Customer;

