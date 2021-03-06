/*
 * File: app/view/NetworkPanel.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
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

Ext.define('InstaSocial.view.NetworkPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.networkPanel',

    config: {
        docked: 'top',
        height: '75pt',
        id: 'networkPanel',
        width: '220pt',
        hideOnMaskTap: true,
        modal: true,
        scrollable: false,
        tpl: [
            '<img id="network-logo-panel" class="network-logo-panel" src="{image}"/>'
        ],
        items: [
            {
                xtype: 'textfield',
                id: 'lblNetworkName',
                itemId: 'lblNetworkName',
                label: '    ',
                name: 'name',
                readOnly: true
            },
            {
                xtype: 'button',
                id: 'btLogout',
                itemId: 'btLogout',
                styleHtmlContent: true,
                ui: 'decline'
            },
            {
                xtype: 'button',
                id: 'btLogin',
                itemId: 'btLogin',
                styleHtmlContent: true,
                ui: 'confirm'
            }
        ]
    },

    initialize: function() {
        this.callParent();
        this.getComponent('btLogin').setText(labels.lblLogin);
        this.getComponent('btLogout').setText(labels.lblLogout);
    }

});