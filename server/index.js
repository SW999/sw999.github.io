var express= require('express'),
    compression = require('compression'),
    path = require('path'),
    cors = require('cors'),
    app = express(),
    static_path = path.join(__dirname, './../public');

app.enable('trust proxy');

app.use(compression());

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.options('/api/currentTime', cors());
app.get('/api/currentTime', cors(), function(req, res) {
  res.send({ time: new Date() });
});

app.route('/').get(function(req, res) {
    res.sendFile('index.html', {
        root: static_path
    });
});

app.use('/', express.static(static_path, {
    maxage: 31557600
}));

const server = app.listen(process.env.PORT || 3000, function () {

  let host = server.address().address,
      port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
