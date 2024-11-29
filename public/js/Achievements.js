export const achiev = ['$http', '$window', function($http, $window){
    const ctrl = this;
    let user_id = 1

    this.includePath = 'partials/MainDisplay.html';
    this.total = {total: 0}
    this.dueDate = new Date(2024, 5, 22);
    this.newItem = {pg: 0, priority: 0, max_progress: 0};
    

    this.taskList = [{}];
    // ================================== //
    //          Get Inital Tasks          //
    // ================================== //

    $window.onload = () => { 
        $http({
            method: 'GET',
            url: '/tasks/' + user_id
        })
        .then(res => {
            console.log(res)
            const d = res.data
            ctrl.taskList = d.tasks
            ctrl.total = d.totals[0]

            if(this.dueDate < Date.now()) {
                const d = new Date();
                this.dueDate = new Date(d.getFullYear(), d.getMonth(), 1)
            }
        })
        .catch(err => console.log(err))
     }

     

    // ================================== //
    //            Contole Nav             //
    // ================================== // 

    this.navItems = [
        {item: 'Main Display', path: 'MainDisplay', display: false},
        {item: 'Add Task', path: 'AddTask', display: true},
        {item: 'EditTask', path: 'EditTask', display: true}
    ]

    this.updateNav = i => {
        ctrl.includePath = `partials/${ctrl.navItems[i].path}.html`;
        for (let j = 0; j < ctrl.navItems.length; j++) {
            j == i ? ctrl.navItems[j].display = false : ctrl.navItems[j].display = true;
        }
    }

    // ================================== //
    //         Update Total Btns          //
    // ================================== // 

    this.addToTotal = (i) => {
        const currentTask = ctrl.taskList[i]
        ctrl.total.total = ctrl.total.total + currentTask.pg
        ctrl.taskList[i].count++

        updateTotal({total: ctrl.total, task: ctrl.taskList[i]})
    }

    this.removeFromTotal = (i) => { 
        const currentTask = ctrl.taskList[i]
        ctrl.total.total = ctrl.total.total - currentTask.pg
        ctrl.taskList[i].count--

        updateTotal({total: ctrl.total, task: ctrl.taskList[i]})
     }

    // ================================== //
    //          Add to Task List          //
    // ================================== // 

    this.addToTaskList = () => { 
        const nTask = ctrl.newItem

        nTask.count = 0;
        nTask.current_progress = 0;
        nTask.type = 'general';
        nTask.status = 'ongoing';
        nTask.date_created = Date.now();
        nTask.date_updated = Date.now();
        nTask.user_id = user_id;

        ctrl.taskList.push(nTask);
        sendTaskToBackend(nTask)

        ctrl.newItem = {pg: 0, priority: 0, max_progress: 0};
     }

    // ================================== //
    //      Remove from Task List         //
    // ================================== // 

     this.removeTask = (i) => { 
        deleteTask(ctrl.taskList[i].id)
        ctrl.taskList.splice(1, i);
      }

    // ================================== //
    //        Send Task to Backend        //
    // ================================== //
    const sendTaskToBackend = function(task){
        $http({method: 'POST', url: '/tasks', data: task})
        .then(data => {
             console.log(data.data)
             ctrl.taskList[ctrl.taskList.length - 1].id = data.data.data.id
             console.log(ctrl.taskList)

        })
        .catch(err => console.log(err))
    }

    const updateTotal = function(data){
        $http({method: 'PUT', url: '/tasks/total', data})
        .then(data => {console.log(data.data)})
        .catch(err => console.log(err))
    }

    this.sendUpdateToBackend = function(task){
        $http({method: 'PUT', url: '/tasks', data: task})
        .then(data => {console.log(data.data)})
        .catch(err => console.log(err))
    }

    const deleteTask = (id) => { 
        $http({method: 'DELETE', url: '/tasks/' + id})
        .then(data => {console.log(data.data)})
        .catch(err => console.log(err))
     }


}]