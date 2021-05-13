import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';


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
                    <TableCell>{this.props.createDate}</TableCell>
                    <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>

                </TableRow>
        )
    }
}




export default Customer;

