export const jb = ['$http', '$window', function($http, $window){
    const ctrl = this;
    this.selectedJob = {};
    this.newJobList= [];
    let index;
    let selectedStatus;

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
        const newObj = {
            id: job.id,
            // customer_id:
            name: job.name,
            price: job.price,
            description: job.description,
            time_spent: job.time_spent,
            status: job.status,
            // parent_job_id:
            // date_created: 
            // date_update: 
            priorty_level: job.priorty_level,
            due_date: job.due_date,
            // staff_id:
            received_payment: job.received_payment,
            completion_date: job.completion_date
            // last_altered_by:
        }
        ctrl.selectedJob = newObj; 
        ctrl.includePath = 'partials/DetailDisplay.html';
        index = i;
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
        if( selectedStatus != 'Complete' && ctrl.selectedJob.status == 'Complete' ) ctrl.selectedJob.completion_date = new Date()
        $http({method: 'PUT', url: '/jobs', data: ctrl.selectedJob})
        .then(data => {
            if(data.status == 500) window.alert(data.msg);
            else{
                const d = data.data.data;
                ctrl.jobList[index] = d;
                ctrl.selectedJob = {};
                ctrl.includePath = 'partials/Home.html';
            }

        })
        .catch(err => {console.log(err); window.alert("There was an error updating your job")})   
     }

}]