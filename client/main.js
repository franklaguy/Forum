import angular from 'angular';
import angularMeteor from 'angular-meteor';
import comments from '../imports/components/forum/forum';
import '../imports/start/accounts-config.js';

// dependencies
angular.module('verja-forum', [ angularMeteor, comments.name, 'accounts.ui' ]);

// Bootstrap ng-app to run on document ready
function onReady() { angular.bootstrap(document, ['verja-forum']); }

//Mobile
if (Meteor.isCordova) { angular.element(document).on('deviceready', onReady); } 
// Desktop
else { angular.element(document).ready(onReady); }
