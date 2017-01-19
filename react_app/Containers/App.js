import TopNavigation from '../Components/Navigation/TopNavigation';

export default React.createClass({

    displayName: 'App',

    render: function () {
        return (
            <div>
                <TopNavigation/>
                <section>
                    {this.props.children}
                </section>
            </div>
        );
    }
});
