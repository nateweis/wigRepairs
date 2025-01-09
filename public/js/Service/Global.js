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
        $rootScope.$emit('incomingCustomer');
    }
}