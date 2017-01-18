import TopNavigation from '../Components/Navigation/TopNavigation';

export default React.createClass({

  displayName: 'App',

    render: function () {
        return (
            <div className="container">
                <TopNavigation/>
                {this.props.children}
            </div>
        );
    }
});
