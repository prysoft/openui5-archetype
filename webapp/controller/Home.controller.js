sap.ui.define([
    'com/thecompany/theproject/controller/App.controller'
], function(Controller){
    'use strict';

    return Controller.extend('com.thecompany.theproject.controller.Home', {
        onInit: function(){
            console.log('HOME_INIT');
        }
    });
});
