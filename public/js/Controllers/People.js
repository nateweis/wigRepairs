export const people = ['$http', '$window', function($http, $window){
    const ctrl = this;
    this.newCustomerList = [];

    // ================================== //
    //         Get Inital People          //
    // ================================== //

    const getMembers = () => { 
        $http({
            method: 'GET',
            url: '/people' 
        })
        .then(res => {
            ctrl.allPeople = res.data.data;
        })
        .catch(err => console.log(err))
     }

     getMembers();

   
    // ================================== //
    //             New Person             //
    // ================================== //
    const uniqueNewPerson = ()=>{
        let res = true;
        ctrl.newCustomerList.forEach(nc => {
            if(nc.name === ctrl.newCustomer.name && nc.email === ctrl.newCustomer.email) res = false;
        });

        return res;
    }
    const resetNewPerson = () => ctrl.newCustomer = {name:'',email:'',phone_number:'',street:'',city:'',state:'',zip:'',part_of_company:false,title:'',pay_amount:0.0,pay_rate:'',admin:false }
    resetNewPerson();

    this.addNewPerson = () =>{
        ctrl.newCustomer.part_of_company ? ctrl.newCustomer.person_type = 'Staff' : ctrl.newCustomer.person_type = 'Customer';
console.log(uniqueNewPerson())
        if( !ctrl.newCustomer.name ) window.alert("New people require names");
        else if (!uniqueNewPerson()) window.alert("This person was already added");
        else if (ctrl.newCustomer.part_of_company && (!ctrl.newCustomer.title || ctrl.newCustomer.pay_amount < 1 || !ctrl.newCustomer.pay_rate)) window.alert("Please fill in all the staff info");
        else{
            // const nj = {name: ctrl.newJob.Job, price: ctrl.newJob.Price, description: ctrl.newJob.Customer + ' - ' + ctrl.newJob.Job, status :"Not Started"};
            ctrl.newCustomerList.push(ctrl.newCustomer);
            resetNewPerson();
        }
    }

    this.submitNewPeople = ()=>{
        if(ctrl.newCustomerList.length > 0){
            $http({method: 'POST', url: '/people', data: ctrl.newCustomerList})
            .then(data => {
                if(data.status == 500) window.alert(data.msg);
                else{
                    // const d = data.data.data;
                    // ctrl.jobList.unshift(...d);
                    // ctrl.newJobList = [];
                    // GlobalShare.setNavPath('Home'); 
                    // // ctrl.includePath = 'partials/Home.html';
                    console.log(data)
                }

            })
            .catch(err => {console.log(err); window.alert("There was an error submitting the new people list to the backend")})
        }
    }
}]