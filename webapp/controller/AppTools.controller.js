sap.ui.define([
    'com/thecompany/theproject/controller/App.controller',
    'sap/m/MessageToast'
], function(Controller, MessageToast){
    'use strict';

    return Controller.extend('com.thecompany.theproject.controller.AppTools', {
        onInit: function(){
            console.log('APPTOOLS_INIT');
        },

        onAfterRendering: function(){
            console.log('APPTOOLS_AFTER_RENDERING');
            var toolPage = this.getView().byId('toolPage');
            toolPage.$().find('.sapTntToolPageContentWrapper').on('click', function(){
                toolPage.setSideExpanded(false);
            });
        },

        onSideNavButtonPress: function(){
            if (!sap.ui.Device.system.phone) {
                return;
            }
            var toolPage = this.getView().byId('toolPage');
            setTimeout((function(){
                toolPage.setSideExpanded(!toolPage.getSideExpanded());
            }));
        },

        onSideNavItemSelect: function(oEvent) {
            var item = oEvent.getParameter('item'); // returns tnt:NavigationListItem
            var routeName = item.data('params');
            if (!routeName || routeName.indexOf('start') < 0) {
                this.getView().byId('toolPage').setSideExpanded(false);
                MessageToast.show('Раздел "' + item.getText() + '" временно недоступен');
                return;
            }

            setTimeout((function(){
                this.getView().byId('toolPage').setSideExpanded(false);
            }).bind(this), 300);

            this.getRouter().navTo(routeName);
        }
    });
});
