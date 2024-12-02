export const jb = ['$http', '$window', function($http, $window){
    const ctrl = this;
    this.includePath = 'partials/Home.html';
    this.navItems = [
        {label: 'Home', page: 'Home'},
        {label: 'Add Job', page: 'NewJob'}
     ]
    this.selectedJob = {};
    this.newJobList= []

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

    this.addNewJob = () =>{
        if(ctrl.newJob.Customer == null || ctrl.newJob.Job == null || ctrl.newJob.Price == null ) window.alert("To add a job all fields are required");
        else{
            const nj = {name: ctrl.newJob.Job, price: ctrl.newJob.Price, description: ctrl.newJob.Customer + ' - ' + ctrl.newJob.Job, status :"Not Started"};
            ctrl.newJobList.push(nj);
            ctrl.newJob = null;
        }
    }

    this.submitNewJobs = ()=>{
        if(ctrl.newJobList.length > 0){
            $http({method: 'POST', url: '/jobs', data: ctrl.newJobList})
            .then(data => {
                if(data.status == 500) window.alert(data.msg);
                else{
                    const d = data.data.data;
                    ctrl.jobList.push(...d);
                    ctrl.newJobList = [];
                    ctrl.includePath = 'partials/Home.html';

                }

            })
            .catch(err => {console.log(err); window.alert("There was an error submitting new jobs")})
        }
    }

}]