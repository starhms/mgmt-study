import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';



// const styles = theme => ({
//     hidden: {
//         display: 'none'
//     }
// });

class CustomerAdd extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            device_name: '',
            product:'',
            user_id: '',
            password: '',
            password2: '',
            ip_address: '',
            policy_id: '',
            cisco_group: '',
            open: false
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
//        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            id: '',
            device_name: '',
            product:'',
            user_id: '',
            password: '',
            password2: '',
            ip_address: '',
            policy_id: '',
            cisco_group: '',
            open: false
        });
    }


    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
        .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        })            
        this.setState({
            device_name : '',
            product : '',
            user_id : '',
            password : '',
            ip_address  : '',
            policy_id  : '',
            password2  : '',
            cisco_group  : '',
            open: false
        });

    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('device_name', this.state.device_name);
        formData.append('product', this.state.product);
        formData.append('user_id', this.state.user_id);
        formData.append('password', this.state.password);
        formData.append('ip_address', this.state.ip_address);
        formData.append('policy_id', this.state.policy_id);
        formData.append('password2', this.state.password2);
        formData.append('cisco_group', this.state.cisco_group);
        const config  = {
            headers: {
                'content-type' : 'multipart/from-data'
            }
        }
        return post(url, formData, config);
    }

    render() {
    //    const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    장비 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle> 장비 추가 </DialogTitle>
                    <DialogContent>
                    <TextField label="장비명" type="text" name="device_name" value={this.state.device_name} onChange={this.handleValueChange} /><br/>
                    <TextField label="제품종류" type="text" name="product" value={this.state.product} onChange={this.handleValueChange} /><br/>
                    <TextField label="로그인명" type="text" name="user_id" value={this.state.user_id} onChange={this.handleValueChange} /><br/>
                    <TextField label="패스워드" type="text" name="password" value={this.state.password} onChange={this.handleValueChange} /><br/>
                    <TextField label="ID" type="text" name="ip_address" value={this.state.ip_address} onChange={this.handleValueChange} /><br/>
                    <TextField label="정책번호" type="text" name="policy_id" value={this.state.policy_id} onChange={this.handleValueChange} /><br/>
                    <TextField label="2차 패스워드(Cisco 전용)" type="text" name="password2" value={this.state.password2} onChange={this.handleValueChange} /><br/>
                    <TextField label="그룹명(Cisco 전용)" type="text" name="cisco_group" value={this.state.cisco_group} onChange={this.handleValueChange} /><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}> 추가 </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}> 닫기 </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
        
        }
}

// export default withStyles(styles)(CustomerAdd);
export default CustomerAdd;