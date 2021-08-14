import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {getURI} from '@lib';

export default function withAuth(ProtectedComponent) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        error: null
      }
    }

    componentDidMount() {
      fetch(`${getURI()}/api/checkToken`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(json => {
          if (json.status) {
            this.setState({ loading: false });
          } else {
            this.setState({
              loading: false, redirect: json.redirect, error: json.error
            });
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: '/login', error: err.message });
        });
    }

    render() {
      const {loading, redirect, error} = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect
          to={{
            pathname: redirect,
            state: {error}
          }}
        />;
      }
      return <ProtectedComponent {...this.props} />;
    }
  }
}