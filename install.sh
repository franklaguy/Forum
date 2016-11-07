#!/bin/bash

sudo -H curl https://raw.githubusercontent.com/aldeed/meteorify/master/install | sh

if ! which meteor; then
	curl https://install.meteor.com/ | sh
fi

meteorify
meteor remove blaze-html-templates
meteor remove insecure
meteor remove autopublish
meteor add angular-templates
meteor npm install --save angular angular-meteor
meteor add accounts-password dotansimha:accounts-ui-angular
meteor add tmeasday:publish-counts
meteor add fourseven:scss
meteor add reywood:bootstrap3-sass
meteor npm install --save angular-utils-pagination
meteor add practicalmeteor:mocha
meteor npm install --save-dev angular-mocks
meteor