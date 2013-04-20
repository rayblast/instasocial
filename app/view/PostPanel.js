/*
 * File: app/view/PostPanel.js
 *
 * This file was generated by Sencha Architect version 2.2.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('InstaSocial.view.PostPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.postPanel',

    config: {
        id: 'postPanel',
        itemId: 'postPanel',
        minHeight: '200pt',
        minWidth: '90%',
        hideOnMaskTap: true,
        modal: true,
        scrollable: false,
        items: [
            {
                xtype: 'fieldset',
                id: 'fsNewPost',
                itemId: 'fsNewPost',
                minHeight: '80%',
                items: [
                    {
                        xtype: 'textareafield',
                        id: 'taInputPostMessage',
                        itemId: 'taInputPostMessage'
                    }
                ]
            },
            {
                xtype: 'button',
                id: 'btSendPost',
                itemId: 'btSendPost',
                ui: 'action-round'
            }
        ]
    },

    initialize: function() {
        this.callParent();
        Ext.getCmp('fsNewPost').setTitle(labels.lblNewPost);
        Ext.getCmp('taInputPostMessage').setPlaceHolder(labels.lblTypeYourMessageHere);
        Ext.getCmp('btSendPost').setText(labels.lblSend);
    }

});