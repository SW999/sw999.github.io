import '../style/main.scss';

let app = () => {
    return {
        template: require('./app.html'),
        controller: 'AppCtrl',
        controllerAs: 'app'
    }
};

class AppCtrl {
    constructor($http) {
        this.url = 'https://github.com/preboot/angular-webpack';

        $http.get('http://localhost:2992/api/')
            .then((res) => {
                this.articles = JSON.parse(res.data.data);
            });
    }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
    .directive('app', app)
    .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
