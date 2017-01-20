import { Link } from 'react-router';
import RoutingConstants from '../Constants/RoutingConstants';

export default React.createClass({

    displayName: 'Articles',

    getInitialState: function () {
        return {
            articles: null
        };
    },

    componentDidMount: function () {
        this._loadData(RoutingConstants.API_URL, RoutingConstants.HEADER_OPTIONS, this._parseArticles);
    },

    componentDidUpdate: function () {
        console.info('Updated!');
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.articles !== this.state.articles;
    },

    render: function () {
        let articles = !!this.state.articles
            ? this.state.articles.map(function (value, index) {
            return (<article key={index}>
                <h3>{value.title}</h3>
                <span>Author: {value.author}, date: <em>{value.modified}</em></span><br/>
                <img src={value.url}/>
                <p>{value.description}</p>
                <Link to={'/articles/' + value.alias}>Read more...</Link>
            </article>);
        })
            : null;

        return (
            <div>
                <h1>Articles</h1>
                {articles}
            </div>
        );
    },

    _loadData: function (requestUrl, options, callback) {
        fetch(requestUrl, options)
            .then(response => {
                return response.json()
            })
            .then(json => {
                callback(json);
            })
            .catch(error => {
                console.warn(`Oh no: ${error}!`);
            });
    },

    _parseArticles: function (data) {
        var articles = JSON.parse(data.data);

        this.setState({articles: articles});
    }
});
