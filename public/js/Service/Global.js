export const share = function($rootScope){
    const ctrl = this;
    this.navPath = '';
    this.setNavPath = (s) => {
        ctrl.navPath = s;
        $rootScope.$emit('globalNavUpdate')
    }
}