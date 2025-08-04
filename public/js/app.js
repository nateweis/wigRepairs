import {jb} from './Controllers/JobBoard.js'
import {nav} from './Controllers/Nav.js'
import {people} from './Controllers/People.js'

import {search} from './Filters/filterJobs.js'
import {share} from './Service/Global.js'

const app = angular.module('Jobsapp', []);

app.filter('searchBar', search)

app.controller('NavController',  nav);
app.controller('Jobscontroller',  jb);
app.controller('PPLcontroller',  people);

app.service('GlobalShare', share)


app.directive('fileChange', function() {
    return {
     restrict: 'A',
     scope: {
       handler: '&'
     },
     link: function (scope, element) {
      element.on('change', function (event) {
        scope.$apply(function(){
          scope.handler({files: event.target.files});
        });
      });
     }
    };
});

