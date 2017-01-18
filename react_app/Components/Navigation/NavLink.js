import { Link } from 'react-router';

export default React.createClass({

    displayName: 'NavLink',

    render: function() {
        return (
            <Link {...this.props} activeClassName='active'/>
        );
    }
});
