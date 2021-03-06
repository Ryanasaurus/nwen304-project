import React, {Component} from 'react';

import {resetPw} from '../../redux/actions/remote';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const {Group, Label, Control} = Form;


class ResetSubmit extends Component {

  constructor(props) {
    super(props);
    const {match} = this.props;
    let {email, code} = match.params;
    email = email || '';
    code = code || '';
    this.state = {
      email,
      code,
      password: '',
      password_conf: ''
    };
  }

  update = k => ({target}) => this.setState({[k]: target.value});

  submit = () => {
    let {password, password_conf, code, email} = this.state;
    if (password !== password_conf) {
      alert('Passwords do not match!')
      return;
    }
    if (code === '' || email === '') {
      alert('Email and Token must be filled out')
      return;
    }

    resetPw(email, code, password);
  }

  render() {
    const {email, code, password, password_conf} = this.state;
    return <Container>
      <Group>
        <Label> Email Being Reset:</Label>
        <Control type='email' value={email} onChange={this.update('email')} />
      </Group>
      <Group>
        <Label>Password Reset Token:</Label>
        <Control type='text' value={code} onChange={this.update('code')} />
      </Group>
      <Group>
        <Label>New Password:</Label>
        <Control type='password' value={password} onChange={this.update('password')} />
      </Group>
      <Group>
        <Label>Confirm New Password:</Label>
        <Control type='password' value={password_conf} onChange={this.update('password_conf')} />
      </Group>
      <Button onClick={this.submit}> Reset! </Button>
    </Container>
  }
}

export default ResetSubmit;
