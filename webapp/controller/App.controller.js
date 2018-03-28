sap.ui.define([
    'com/thecompany/theproject/controller/AbstractBaseController'
], function (Controller) {
    'use strict';

    return Controller.extend('com.thecompany.theproject.controller.App', {
        onInit: function(){
            console.log('APP_INIT');
        },

        onExitPress: function() {
            //this.getOwnerComponent().setAuthorized(false);
        }
    });
});
