export const jb = ['$http', '$window', function($http, $window){
    const ctrl = this;
    this.includePath = 'partials/Home.html';
    this.navItems = [
        {label: 'Home', page: 'Home'},
        {label: 'Add Job', page: 'NewJob'}
     ]
    this.selectedJob = {};

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


    this.updateNav = nav => ctrl.includePath = 'partials/' + nav +'.html';

    this.showDetail = job =>{
        ctrl.selectedJob = job; 
        ctrl.includePath = 'partials/DetailDisplay.html';
    }

}]