export const jb = ['$http', '$window', function($http, $window){
    const ctrl = this;
    this.includePath = 'partials/Home.html';

    $window.onload = () => { 
        $http({
            method: 'GET',
            url: '/jobs' 
        })
        .then(res => {
            console.log(res)
            ctrl.jobList = res.data.data
        })
        .catch(err => console.log(err))
     }

}]