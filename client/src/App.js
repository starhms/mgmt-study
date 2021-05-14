import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CirularProgress from '@material-ui/core/CircularProgress';
import { withStyles} from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})

     
class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      customers: '' ,
      completed:0
    }
    this.stateRefresh = this.stateRefresh.bind(this);
  }


  stateRefresh() {
    this.setState({
    customers: '',
    completed: 0
    });
  this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
}

  

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'applocation/json'
      }
    })
    const body = await response.json();
    return body;
    }
    
  progress = () => {
    const { completed } = this.state;
   this.setState ({ completed: completed >= 100 ? 0 : completed + 1});
  }

  render(){
  const { classes } = this.props;
  return (
    <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>순번</TableCell>
                  <TableCell>장비명</TableCell>
                  <TableCell>제품군</TableCell>
                  <TableCell>접속계정</TableCell>
                  <TableCell>패스워드</TableCell>
                  <TableCell>IP ADDRESS</TableCell>
                  <TableCell>정책명(번호)</TableCell>
                  <TableCell>패스워드(Cisco 전용)</TableCell>
                  <TableCell>그룹명(Cisco 전용)</TableCell>
                  <TableCell>등록일시</TableCell>
                  <TableCell>설정</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
                {this.state.customers ? this.state.customers.map(c => {
                  return(
                    <Customer stateRefresh={this.stateRefresh}
                    key={c.device_name}
                    id={c.id}
                    device_name={c.device_name}
                    user_id={c.user_id}
                    password={c.password}
                    password2={c.password2}
                    ip_address={c.ip_address}
                    policy_id={c.policy_id}
                    cisco_group={c.cisco_group}
                    product={c.product}
                    createDate={c.createDate}
                    />
                  )
              }) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CirularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
    </div>
  )
}
}

export default withStyles(styles) (App);
