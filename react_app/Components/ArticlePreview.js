import { Link } from 'react-router';

export default React.createClass({

    displayName: 'ArticlePreview',

    propTypes: {
        data: React.PropTypes.object.isRequired
    },

    render: function () {
        let data = this.props.data;

        return (
            <article>
                <h3>{data.title}</h3>
                <span>Author: {data.author}, date: <em>{data.modified}</em></span><br/>
                <img src={data.url}/>
                <p>{data.description}</p>
                <Link to={'/articles/' + data.alias}>Read more...</Link>
            </article>
        );
    }
});
