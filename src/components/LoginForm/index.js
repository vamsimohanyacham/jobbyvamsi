import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {name: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({name: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {name, password} = this.state
    const userdetails = {name, password}
    const loginApiUrl = 'https://jobbyback.onrender.com/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdetails),
    }

    try {
      // First API call
      const response = await fetch(loginApiUrl, options)
      const data = await response.json()

      if (response.ok) {
        console.log('avidhi nayana')
        // Second API call only if the first one is successful
        const userDetails = {username: 'rahul', password: 'rahul@2021'}
        const apiUrl = 'https://apis.ccbp.in/login'
        const option = {
          method: 'POST',
          body: JSON.stringify(userDetails),
        }
        const res = await fetch(apiUrl, option)
        const datain = await res.json()

        if (res.ok) {
          this.onSubmitSuccess(datain.jwt_token)
        } else {
          this.onSubmitFailure(datain.error)
        }
      } else {
        this.onSubmitFailure(data.error)
      }
    } catch (error) {
      console.error('Error during login:', error)
      this.onSubmitFailure('Something went wrong. Please try again.')
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="rahul@2021"
        />
      </>
    )
  }

  renderUserNameField = () => {
    const {name} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          value={name}
          onChange={this.onChangeUsername}
          placeholder="rahul"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    const onsignup = () => {
      const {history} = this.props
      history.replace('/signup')
    }

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://th.bing.com/th/id/R.240f34355ff6a18800af9581f6b5eeab?rik=5HHG75UX2kjcBA&riu=http%3a%2f%2fbrand.opportunity.org%2fimages%2fmark3_2.png&ehk=i4aqQT2nMo9g66YxQUEoahQFMm7IIEvb7dDgNx91LA4%3d&risl=&pid=ImgRaw&r=0"
            className="website-logo"
            alt="website logo"
          />
          <h1 className="h">Login</h1>

          <div className="input-container">{this.renderUserNameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="final">
            <button className="logout-desktop-btn" type="submit">
              Login
            </button>
            <button
              type="button"
              onClick={onsignup}
              className="fe logout-desktop-btn"
            >
              Signup
            </button>
          </div>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
