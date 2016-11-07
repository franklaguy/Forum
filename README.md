# Verja-Forum

Verja Forum is a tool to collect thought data by inviting the community of Verja users to create topics and comment freely, giving our development team the ability to observe and respond conveniently. 

Verja is Business Insider's 1st open source project as well as an awesome validation API. 

The Forum stack is the current lastest Node v4.4.7, Angular (1.5.8), BootStrap 3 (SASS) v3.3.5_2,  Mongo DB 3, and Meteor 1.4.0.1. 

====================

###Set Up: clone

In your terminal, wherever you keep your projects, run:

```git clone git@github.com:businessinsider/Verja-Forum.git && cd Verja-Forum```

If you do not have git set up, follow [this guide](https://help.github.com/articles/set-up-git/). Use SSH not HTTPS, as it works better with 2 factor auth.

Then check to see if you have Node installed by running ```node -v```. If you don't, go to the [node website](https://nodejs.org/download/) and download the appropriate version, probably Universal Package for Mac. 
Rerun ```node -v``` to confirm installation and the version should display on your terminal. You might have to restart your terminal.

###Set Up: install

There are a list of packages needed and not needed to run Verja-Forum. To add/remove them, CD into you Verja-Forum directory and run this command:

* ```sh install.sh```

At this point in the terminal you should see browser commands spinning up. Once ready you should see a prompt that your app has started and is running at: ```http://localhost:3000```

###Run

To run the Verja-Forum normally simply run this command: 

* ```meteor```

If there are no errors and this is _the first time you've been to Verja-Forum the database will be empty_. You'll need to create an account to sign in, at which point you can create topics and reply as you like. Try logging in and out, turning topics from public to private, etc. 
**Hint:** Adding over 10 topics turns on pagination.

Other things to take note of are under the hood. Check out the **Scaffolding**, **ES6 javascript** and **Unit Tests**. All data goes straight into your own personal **MongoDB** database when using localhost. Kick the code around, take it for a spin and remember, you break it, you bought it. Just playing, but really you may want to create your own branches as each of us has some area of expertise that we may want to excercise for testing. 

