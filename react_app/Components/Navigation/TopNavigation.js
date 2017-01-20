import NavLink from './NavLink';

export default React.createClass({

    displayName: 'TopNavigation',

    render: function () {
        return (
            <header className="top-header">
                <nav>
                    <ul className='top-navigation'>
                        <li><NavLink onlyActiveOnIndex={true} to='/'>Home</NavLink></li>
                        <li><NavLink to='/articles' activeClassName='active'>Articles</NavLink></li>
                    </ul>
                </nav>
            </header>
        );
    }
});
