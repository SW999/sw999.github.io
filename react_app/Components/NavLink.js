import { Link } from 'react-router';

module.exports = React.createClass({

    displayName: 'NavLink',

    render: function() {
        return (
            <Link {...this.props} activeClassName='active'/>
        );
    }
});
