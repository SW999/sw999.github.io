import NavLink from './NavLink';

export default React.createClass({

    displayName: 'TopNavigation',

    render: function () {
        return (
        <header className="top-header">
            <nav>
                <ul className='top-navigation'>
                    <li><NavLink onlyActiveOnIndex={true} to='/'>Главная</NavLink></li>
                    <li><NavLink to='/articles' activeClassName='active'>Статьи</NavLink></li>
                </ul>
            </nav>
        </header>
        );
    }
});
