import { Link } from 'react-router';

module.exports = React.createClass({

  displayName: 'App',

  render: function() {
    return (
      <div className='container'>
        <ul className='nav nav-pills'>
          <li><Link onlyActiveOnIndex={true} to='/' activeClassName='active'>Главная</Link></li>
          <li><Link to='/articles' activeClassName='active'>Статьи</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
});
