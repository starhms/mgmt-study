import React from 'react';
import { post } from 'axios';

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

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
//        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
    }
    handleClickOpen() {
        this.setState({
            open : true
        });
    }

    handleClickClose() {
        this.setState({
            id: '',
            device_name: '',
            product:'',
            user_id: '',
            password: '',
            password2: '',
            ip_address: '',
            policy_id: '',
            cisco_group: ''
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
            cisco_group  : ''
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

        return (
        
        <form onSubmit={this.handleFormSubmit}>
        
        <h1>장비 추가</h1>
        
        장비명: <input type="text" name="device_name" value={this.state.device_name} onChange={this.handleValueChange} /><br/>
        제품종류: <input type="text" name="product" value={this.state.product} onChange={this.handleValueChange} /><br/>
        로그인명: <input type="text" name="user_id" value={this.state.user_id} onChange={this.handleValueChange} /><br/>
        패스워드: <input type="text" name="password" value={this.state.password} onChange={this.handleValueChange} /><br/>
        ip: <input type="text" name="ip_address" value={this.state.ip_address} onChange={this.handleValueChange} /><br/>
        정책번호: <input type="text" name="policy_id" value={this.state.policy_id} onChange={this.handleValueChange} /><br/>
        2차 패스워드(Cisco 전용): <input type="text" name="password2" value={this.state.password2} onChange={this.handleValueChange} /><br/>
        그룹명(Cisco 전용): <input type="text" name="cisco_group" value={this.state.cisco_group} onChange={this.handleValueChange} /><br/>
        
        <button type="submit">추가하기</button>
        
        </form>
        
        )
        
        }
}

export default CustomerAdd;