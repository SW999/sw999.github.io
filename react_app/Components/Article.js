import {Link} from 'react-router';
import RoutingConstants from '../Constants/RoutingConstants';

export default React.createClass({

    displayName: 'Article',

    propTypes: {
        params: React.PropTypes.shape({
            alias: React.PropTypes.string
        })
    },

    getDefaultProps: function() {
        return {
            params: {
                alias: ''
            }
        };
    },

    getInitialState: function () {
        return {
            articles: null
        };
    },

    componentDidMount: function () {
        let alias = this.props.params.alias;

        this.fetchData(alias, this._parseArticle);
    },

    componentWillReceiveProps: function (nextProps) {
        let alias = nextProps.params.alias;
        this.fetchData(alias, this._parseArticle)
    },

    render: function () {
        let data = this.state.article;

        if (!!data) {
            return (
                <article>
                    <h3>{data.title}</h3>
                    <span>Author: {data.author}, date: <em>{data.modified}</em></span><br/>
                    <img src={data.url}/>
                    <p>{data.content}</p>
                    <Link to='articles'>Back to articles</Link>
                </article>
            );
        } else {
            return null;
        }
    },

    _parseArticle: function (data) {
        var article = JSON.parse(data.data);

        this.setState({article: article});
    },

    fetchData: function (alias, callback) {
        fetch(RoutingConstants.API_URL + alias, RoutingConstants.HEADER_OPTIONS)
            .then(response => {
                return response.json()
            })
            .then(json => {
                callback(json);
            })
            .catch(error => {
                console.warn(`Oh no: ${error}!`);
            });
    }
});
