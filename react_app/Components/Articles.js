export default React.createClass({

    displayName: 'Articles',

    componentDidMount: function () {
        var requestUrl = 'http://localhost:2992/api',
            options = {
                method: 'GET',
                cache: 'no-cache',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

        //this._request(requestUrl, options);

        fetch(requestUrl, options)
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
            .catch(error => {
                console.warn(`Oh no: ${error}!`);
            });
    },

    render: function () {
        return (
            <div>
                <h1>Articles</h1>
            </div>
        );
    },

    _parseJSON: function (response) {

        return new Promise((resolve) => {
            response.json()
            .then((json) => resolve({
                status: response.status,
                ok: response.ok,
                json
            }))});
    },

    _request: function (url, options) {
        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(this._parseJSON)
                .then((response) => {
                    if (response.ok) {
                        return resolve(response.json);
                    }
                    // extract the error from the server's json
                    return reject(response.json.meta.error);
                })
                .catch((error) => reject({
                    networkError: error.message,
                }));
        });
    }
});
