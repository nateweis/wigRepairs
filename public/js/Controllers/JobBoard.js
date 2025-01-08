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
    const setIndex = () => {for (let i = 0; i < ctrl.jobList.length; i++) {ctrl.jobList[i].index = i}}



    // ================================== //
    //          Get Inital Jobs           //
    // ================================== //

    $window.onload = () => { 
        $http({
            method: 'GET',
            url: '/jobs' 
        })
        .then(res => {
            // for (let i = 0; i < res.data.data.length; i++) {
            //     const j = res.data.data[i];
            //     j.index = i;
            //     ctrl.jobList.push(j)
            // }
            ctrl.jobList = res.data.data;
            setIndex()
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

    const resetNewJob = () => {ctrl.newJob = {Customer:"",Job:"",Price:0}}
    resetNewJob();

    this.jobTemplates = [
        {Job: "Sold Headband", Price: 18},
        {Job: "Fill In", Price: 220},
        {Job: "Baby Hair", Price: 150},
        {Job: "Hatfall", Price: 100},
        {Job: "Lining", Price: 40},
        {Job: "Weft Removal", Price: 15},
        {Job: "Hair Sewn", Price: 200},
        {Job: "Velvet", Price: 20},
        {Job: "Elastics", Price: 40}
    ];

    this.selectTemplate = () => {
        const t = ctrl.template;
        ctrl.newJob.Job = ctrl.jobTemplates[t].Job; 
        ctrl.newJob.Price = ctrl.jobTemplates[t].Price;
    }

    this.addNewJob = () =>{
        if(ctrl.newJob.Customer == null || ctrl.newJob.Job == null || ctrl.newJob.Price == null ) window.alert("To add a job all fields are required");
        else{
            const nj = {name: ctrl.newJob.Job, price: ctrl.newJob.Price, description: ctrl.newJob.Customer + ' - ' + ctrl.newJob.Job, status :"Not Started"};
            ctrl.newJobList.push(nj);
            resetNewJob();
            ctrl.template = null;
        }
    }

    this.removeJobFromList = i => ctrl.newJobList.splice(i, 1);

    this.submitNewJobs = ()=>{
        if(ctrl.newJobList.length > 0){
            $http({method: 'POST', url: '/jobs', data: ctrl.newJobList})
            .then(data => {
                if(data.status == 500) window.alert(data.msg);
                else{
                    const d = data.data.data;
                    ctrl.jobList.unshift(...d);
                    ctrl.newJobList = [];
                    setIndex()
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
                setIndex()
                GlobalShare.setNavPath('Home'); 
                // ctrl.includePath = 'partials/Home.html';
            }

        })
        .catch(err => {console.log(err); window.alert("There was an error updating your job")})   
     }

}]