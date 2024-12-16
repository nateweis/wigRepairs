import {jb} from './JobBoard.js'

import {search} from './filterJobs.js'

const app = angular.module('Jobsapp', []);

app.filter('searchBar', search)

app.controller('Jobscontroller',  jb);
