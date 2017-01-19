import ArticlePreview from './ArticlePreview';

export default React.createClass({

    displayName: 'Articles',

    getInitialState: function () {
        return {
            articles: null
        };
    },

    componentDidMount: function () {
        var self = this;
        const requestUrl = 'http://localhost:2992/api',
            options = {
                method: 'GET',
                cache: 'no-cache',
                mode: 'cors',
                headers: {
                    "Accept": 'application/json',
                    'Origin': 'http://localhost:3000'
                }
            };

        this._loadData(requestUrl, options, self._parseArticles);
    },

    componentDidUpdate: function () {
        console.info('Updated!');
    },

    render: function () {
        return (
            <div>
                <h1>Articles</h1>
                {!!this.state.articles && this._getArticles()}
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
    },

    _getArticles: function () {
        return this.state.articles.map(function (value, index) {
            return (<ArticlePreview key={index} data={value} />);
        });
    }
});
