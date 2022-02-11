import React from 'react';
import { Link, withRouter } from 'react-router-dom'



class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleRegistr(this.state.password, this.state.email);
  }

  render() {
    return (
      <div className="login">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <input id="email" name="email" value={this.state.email} onChange={this.handleChange} className="login__input" type="text" placeholder="Email" required />
          <input id="password" name="password" value={this.state.password} onChange={this.handleChange} className="login__input" type="password" placeholder="Пароль" required />
          <button className="login__button" type="submit">Зарегистрироваться</button>
        </form>
        <h3 className="login__text">Уже зарегистрированы? <Link className='login__link' to="sign-in">Войти</Link></h3>
      </div>
    )
  }
}
export default withRouter(Register);
