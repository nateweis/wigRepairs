export const share = function($rootScope){
    const ctrl = this;

    /////////////////////////////////
    // Update Nav Across Controlers
    /////////////////////////////////
    this.navPath = '';
    this.setNavPath = (s) => {
        ctrl.navPath = s;
        $rootScope.$emit('globalNavUpdate')
    }

    /////////////////////////////////
    // Send Person to Job
    /////////////////////////////////
    this.currentPerson = {};
    this.setCurrentPerson = p =>{
        ctrl.currentPerson = p;
        if(p.person_type == 'Staff') $rootScope.$emit('incomingStaff'); else $rootScope.$emit('incomingCustomer');
    }
}