sap.ui.define([
    'com/thecompany/theproject/controller/App.controller'
], function(Controller){
    'use strict';

    var enterLoginPrompt, enterPasswPrompt, wrongLoginPasswPrompt;

    return Controller.extend('com.thecompany.theproject.controller.Login', {
        onInit: function(){
            this.getRouter().getTarget('login').attachDisplay(function(oEvent) {
                console.log('Authentication required');
                //this.getOwnerComponent().setAuthorized(true);
                //this.getView().rerender();
            }, this);

            setTimeout((function(){
                var oBundle = this.getView().getModel('i18n').getResourceBundle();
                enterLoginPrompt = oBundle.getText('enterLogin');
                enterPasswPrompt = oBundle.getText('enterPassw');
                wrongLoginPasswPrompt = oBundle.getText('wrongLoginPassw');
            }).bind(this));
        },

        setStatusText: function(text) {
            var messageStrip = this.getView().byId('auth-form-status');
            messageStrip.setVisible(!!text);
            setTimeout(function(){
                messageStrip.setText(text);
            });
        },

        clearStatus: function() {
            this.setStatusText();
        },

        checkCredentials: function(evt){
            var sourceElement = evt.getSource();

            var userField = this.getView().byId('auth-form-lgn');
            var user = userField.getValue();

            var pswdField = this.getView().byId('auth-form-psw');
            var pswd = pswdField.getValue();

            // Передаем фокус на пароль
            if(sourceElement === userField && user) {
                // Передаем фокус на ввод пароля
                var nextFocusElement = sourceElement.$().next().firstFocusableDomRef();
                this.setSelectionRange(nextFocusElement, 0, nextFocusElement.value.length);
                nextFocusElement.focus();
                return;
            }

            if (!user) {
                this.setStatusText(enterLoginPrompt);
                return;
            }
            if (!pswd) {
                this.setStatusText(enterPasswPrompt);
                return;
            }

            if(sourceElement === pswdField)
            {
                var pswdElement = sourceElement.$().firstFocusableDomRef();
                this.setSelectionRange(pswdElement, pswdElement.value.length, pswdElement.value.length);
            }

            // Передаем фокус на кнопку
            /*var nextFocusElement = sourceElement.$().parent().next().firstFocusableDomRef();
             if (nextFocusElement) {
             nextFocusElement.focus();
             }*/

            var authForm = this.getView().byId('auth-form');
            var busyIndicator = this.getView().byId('auth-form-bi');
            //sap.m.MessageToast.show(user + ' ' + pswd);

            // Отправка данных формы
            this.enableChildren(authForm, false);
            this.setStatusText();
            busyIndicator.setVisible(true);

            var thisController = this;
            setTimeout(function() {
                if (userField.getValue() == 'admin' && pswdField.getValue() == 'admin') {
                    thisController.getOwnerComponent().setAuthorized(true);
                } else {
                    thisController.setStatusText(wrongLoginPasswPrompt);
                }
                busyIndicator.setVisible(false);
                thisController.enableChildren(authForm, true);
                if (userField.getValue() != 'admin' || pswdField.getValue() != 'admin') {
                    setTimeout(function() {
                        var pswdElement = pswdField.$().firstFocusableDomRef();
                        thisController.setSelectionRange(pswdElement, 0, pswdElement.value.length);
                        pswdElement.focus();
                    });
                }
            }, 1500);
        }

    });
});