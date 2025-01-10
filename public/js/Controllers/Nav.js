export const nav = ['GlobalShare', '$rootScope', function (GlobalShare, $rootScope) {
    const ctrl = this;
    this.includePath = 'partials/Home.html';
    this.navItems = [
        {label: 'Home', page: 'Home', active: true},
        {label: 'Add Job', page: 'NewJob', active: false},
        {label: 'People', page: 'AddPerson', active: false}
     ]

     $rootScope.$on('globalNavUpdate', ()=> ctrl.includePath = 'partials/' + GlobalShare.navPath +'.html')

    this.updateNav = nav => {
        ctrl.includePath = 'partials/' + nav +'.html';
        ctrl.navItems.forEach(n => {
            n.page == nav? n.active = true : n.active = false; 
        });
        ctrl.pageHide = false;
    }
}]