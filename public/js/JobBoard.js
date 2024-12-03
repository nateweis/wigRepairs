export const jb = ['$http', '$window', function($http, $window){
    const ctrl = this;
    this.selectedJob = {};
    this.newJobList= [];
    let index;

    // ================================== //
    //             Nav Bar                //
    // ================================== //

    this.includePath = 'partials/Home.html';
    this.navItems = [
        {label: 'Home', page: 'Home'},
        {label: 'Add Job', page: 'NewJob'}
     ]
    this.updateNav = nav => ctrl.includePath = 'partials/' + nav +'.html';

    // ================================== //
    //          Get Inital Jobs           //
    // ================================== //

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

    // ================================== //
    //          Select a Job              //
    // ================================== //

    this.showDetail = (job,i) =>{
        ctrl.selectedJob = job; 
        ctrl.includePath = 'partials/DetailDisplay.html';
        index = i;
    }

    // ================================== //
    //             New Job                //
    // ================================== //

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
                    ctrl.jobList.unshift(...d);
                    ctrl.newJobList = [];
                    ctrl.includePath = 'partials/Home.html';
                }

            })
            .catch(err => {console.log(err); window.alert("There was an error submitting new jobs")})
        }
    }

    // ================================== //
    //          Update Job                //
    // ================================== //

    this.submitJobUpdate = () => { 
        if(ctrl.jobList[ctrl.index].status != 'Complete' && ctrl.selectedJob.status == 'Complete') ctrl.selectedJob.completion_date = Date.now()
        $http({method: 'PUT', url: '/jobs', data: ctrl.selectedJob})
        .then(data => {
            if(data.status == 500) window.alert(data.msg);
            else{
                const d = data.data.data;
                ctrl.jobList[ctrl.index] = d;
                ctrl.selectedJob = {};
                ctrl.includePath = 'partials/Home.html';
            }

        })
        .catch(err => {console.log(err); window.alert("There was an error updating your job")})
     }

}]