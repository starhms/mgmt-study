import React from 'react';
import { post } from 'axios';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      }
    }
  }));

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
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => { 
                console.log(response.data);
            })
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
        return (
            <from onSubmit={this.handleFormSubmit}>
                <h1> 로그소스 추가 </h1>
                <TextField
                    required
                    id="device_name"
                    label="장비명"
                    type="Required"
                    variant="outlined"
                    size="small"
                    />
                <TextField
                    required
                    id="product"
                    label="제품군"
                    type="Required"
                    variant="outlined"
                    size="small"
                    />
                <TextField
                    required
                    id="device_name"
                    label="장비명"
                    type="Required"
                    variant="outlined"
                    size="small"
                    />
                <TextField
                    required
                    id="user_id"
                    label="접속계정"
                    type="Required"
                    variant="outlined"
                    size="small"
                    />
                <TextField
                    required
                    id="passowrd"
                    label="패스워드"
                    type="password"
                    variant="outlined"
                    size="small"
                    />
                <TextField
                    required
                    id="ip_address"
                    label="IP ADDRESS"
                    type="Required"
                    variant="outlined"
                    size="small"
                    />
                <TextField
                    required
                    id="policy_id"
                    label="정책번호(명)"
                    type="Required"
                    variant="outlined"
                    size="small"
                    />
                <TextField
                    id="password2"
                    label="패스워드(Cisco 전용)"
                    variant="outlined"
                    size="small"
                    />
                <TextField
                    id="cisco_group"
                    label="그룹명(Cisco 전용)"
                    variant="outlined"
                    size="small"
                    />
                <br/>
                <br/>
                <br/>
                <button type="submit"> 추가하기 </button>
                <br/>
                <br/>
                <br/>
            </from>
        )
    }
}

export default CustomerAdd;