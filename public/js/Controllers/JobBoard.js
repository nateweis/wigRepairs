export const jb = ['$http', '$window', 'GlobalShare', function($http, $window, GlobalShare){
    const ctrl = this;
    this.selectedJob = {};
    this.newJobList = [];
    this.jobList = [];
    this.searchType = 'none';
    this.orderDesc = true;
    this.orderJobs = 'id';

    let index;
    let selectedStatus;


    this.resetSearch = ()=> ctrl.searchText ="";

    // ================================== //
    //             Nav Bar                //
    // ================================== //


    // this.includePath = 'partials/Home.html';
    // this.navItems = [
    //     {label: 'Home', page: 'Home', active: true},
    //     {label: 'Add Job', page: 'NewJob', active: false},
    //     {label: 'Add Person', page: 'AddPerson', active: false}
    //  ]
    // this.updateNav = nav => {
    //     ctrl.includePath = 'partials/' + nav +'.html';
    //     ctrl.navItems.forEach(n => {
    //         n.page == nav? n.active = true : n.active = false; 
    //     });
    //     ctrl.pageHide = false;
    // }


    // ================================== //
    //          Get Inital Jobs           //
    // ================================== //

    $window.onload = () => { 
        $http({
            method: 'GET',
            url: '/jobs' 
        })
        .then(res => {
            for (let i = 0; i < res.data.data.length; i++) {
                const j = res.data.data[i];
                j.index = i;
                ctrl.jobList.push(j)
            }
        })
        .catch(err => console.log(err))
     }

     

    // ================================== //
    //          Select a Job              //
    // ================================== //

    this.showDetail = (job) =>{
        //  made newObj instead of directly assigning selectedJob to job so they dont share the same memory spcace
        const newObj = {};
        for (const key in job) {
            newObj[key] = job[key]
        }
        ctrl.selectedJob = newObj;
        GlobalShare.setNavPath('DetailDisplay'); 
        // ctrl.includePath = 'partials/DetailDisplay.html';
        index = job.index;
        selectedStatus = job.status;
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
                    GlobalShare.setNavPath('Home'); 
                    // ctrl.includePath = 'partials/Home.html';
                }

            })
            .catch(err => {console.log(err); window.alert("There was an error submitting new jobs")})
        }
    }

    // ================================== //
    //          Update Job                //
    // ================================== //

    this.submitJobUpdate = () => { 
        if( selectedStatus != 'Complete' && ctrl.selectedJob.status == 'Complete' ) ctrl.selectedJob.completion_date = new Date()
        $http({method: 'PUT', url: '/jobs', data: ctrl.selectedJob})
        .then(data => {
            if(data.status == 500) window.alert(data.msg);
            else{
                const d = data.data.data;
                ctrl.jobList[index] = d;
                ctrl.selectedJob = {};
                GlobalShare.setNavPath('Home'); 
                // ctrl.includePath = 'partials/Home.html';
            }

        })
        .catch(err => {console.log(err); window.alert("There was an error updating your job")})   
     }

}]