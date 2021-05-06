import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
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

  state = {
    customers: "",
    completed: 0
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
    <Paper className={classes.root}>
      <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>로그소스번호</TableCell>
              <TableCell>로그소스IP</TableCell>
              <TableCell>로그소스명</TableCell>
              <TableCell>매니저IP</TableCell>
              <TableCell>로그소스타입</TableCell>
              <TableCell>등록자</TableCell>
              <TableCell>등록일시</TableCell>
              <TableCell>중단일시</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
            {this.state.customers ? this.state.customers.map(c => {
              return(
                <Customer
                key={c.id}
                id={c.id}
                ip={c.agent_ip}
                name={c.name}
                mgr_ip={c.mgr_ip}
                type={c.type}
                user_id={c.user_id}
                reg_time={c.reg_time}
                disconnect_time={c.disconnect_time}
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
  )
}
}

export default withStyles(styles) (App);
