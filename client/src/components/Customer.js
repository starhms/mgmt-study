import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class Customer extends React.Component {

    render() {
        return(
                <TableRow>
                    <TableCell>{this.props.id}</TableCell>
                    <TableCell>{this.props.device_name}</TableCell>
                    <TableCell>{this.props.product}</TableCell>
                    <TableCell>{this.props.user_id}</TableCell>
                    <TableCell>{this.props.password}</TableCell>
                    <TableCell>{this.props.ip_address}</TableCell>
                    <TableCell>{this.props.policy_id}</TableCell>
                    <TableCell>{this.props.password2}</TableCell>
                    <TableCell>{this.props.cisco_group}</TableCell>
                </TableRow>
        )
    }
}




export default Customer;

