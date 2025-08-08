export const people = ['$http', '$window', 'GlobalShare', function($http, $window, GlobalShare){
    const ctrl = this;
    this.allPeople = [];
    this.customerList = [];
    this.staffList = [];
    this.newCustomerList = [];

    // ================================== //
    //         Get Inital People          //
    // ================================== //

    const restPplLists = ()=>{
        ctrl.allPeople = [];
        ctrl.customerList = [];
        ctrl.staffList = [];
    }

    const getMembers = () => { 
        restPplLists();

        $http({
            method: 'GET',
            url: '/people' 
        })
        .then(res => {
            ctrl.allPeople = res.data.data;
            
            res.data.data.forEach(p => { 
                if(p.person_type == 'Customer') ctrl.customerList.push(p);
                else ctrl.staffList.push(p);
            });
        })
        .catch(err => console.log(err))
     }

     getMembers();

    // ================================== //
    //      Attach Person to Job        //
    // ================================== //

    this.selectCustomer = () => {
        const i = ctrl.customerIndex;
        GlobalShare.setCurrentPerson(ctrl.customerList[i]);
    }

    this.selectStaff = () => {
        const i = ctrl.staffIndex;
        GlobalShare.setCurrentPerson(ctrl.staffList[i]);
    }

   
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

        if( !ctrl.newCustomer.name ) window.alert("New people require names");
        else if (!uniqueNewPerson()) window.alert("This person was already added");
        else if (ctrl.newCustomer.part_of_company && (!ctrl.newCustomer.title || ctrl.newCustomer.pay_amount < 1 || !ctrl.newCustomer.pay_rate)) window.alert("Please fill in all the staff info");
        else{
            // const nj = {name: ctrl.newJob.Job, price: ctrl.newJob.Price, description: ctrl.newJob.Customer + ' - ' + ctrl.newJob.Job, status :"Not Started"};
            ctrl.newCustomerList.push(ctrl.newCustomer);
            resetNewPerson();
        }
    }

    this.removePersonFromList = i => ctrl.newCustomerList.splice(i, 1);

    this.submitNewPeople = ()=>{
        if(ctrl.newCustomerList.length > 0){
            $http({method: 'POST', url: '/people', data: ctrl.newCustomerList})
            .then(data => {
                if(data.status == 500) window.alert(data.msg);
                else{
                    getMembers();
                    ctrl.newCustomerList = [];
                }

            })
            .catch(err => {console.log(err); window.alert("There was an error submitting the new people list to the backend")})
        }
    }
}]