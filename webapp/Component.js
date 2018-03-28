/**
 * Created by Varzinov on 08.12.2017.
 */

sap.ui.define([
    'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel',
    'sap/ui/Device'
], function (UIComponent, JSONModel, Device) {
    'use strict';

    var isAuthorized = true;
    var requestedTarget;

    return UIComponent.extend('com.thecompany.theproject.Component', {

        metadata : {
            manifest: 'json'
        },

        init : function () {
            UIComponent.prototype.init.apply(this, arguments);

            // This is how third party libraries may be included. Whereas the most preferable way is through manifest.json
            //sap.ui.getCore().loadLibrary("openui5.simplecharts", "./openui5-simplecharts/src/openui5/simplecharts/");
            //jQuery.sap.registerModulePath('bower_component', './openui5-simplecharts/bower_components');

            this.getRouter().attachRouteMatched(function(evt){
                requestedTarget = evt.getParameter('name');
                if (!isAuthorized) {
                    this.getTargets().display('login');
                }
                /*}).attachBypassed(function(evt){
                 var hash = evt.getParameter("hash");
                 //jQuery.sap.log.info('ROUTE_NAME: ' + routeName);
                 console.info('HASH: ' + hash);*/
            }, this).initialize();

            // Set the device model. View usage example: visible="{device>/support/touch}" showRefreshButton="{= !${device>/support/touch} }"
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode('OneWay');
            this.setModel(oDeviceModel, 'device');

            // Set default data model
            var oData = {};
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            // Read configs and save to model
            var oConfigModel = new JSONModel(jQuery.sap.getModulePath('com.thecompany.theproject.config', '/config.json'));
            oConfigModel.setDefaultBindingMode('OneWay');
            oConfigModel.attachRequestCompleted(function(evt) {
                // Possible config manipulation
                //var config = oConfigModel.getProperty('/');
                this.setModel(oConfigModel, 'config');
            });
        },

        setAuthorized: function(newVal) {
            isAuthorized = !!newVal;
            //this.getTargets().display(this.getMetadata().getRootView().viewName);
            this.getTargets().display(isAuthorized ? requestedTarget : 'login');
        }
    });

});
