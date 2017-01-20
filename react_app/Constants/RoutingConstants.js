module.exports = {
    API_URL: 'http://localhost:2992/api/',
    HEADER_OPTIONS: {
        method: 'GET',
        cache: 'no-cache',
        mode: 'cors',
        headers: {
            "Accept": 'application/json',
            'Origin': 'http://localhost:3000'
        }
    }
};
