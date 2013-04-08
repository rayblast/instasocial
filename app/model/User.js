/*
 * File: app/model/User.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('InstaSocial.model.User', {
    extend: 'Ext.data.Model',
    alias: 'model.user',

    config: {
        fields: [
            {
                name: 'id'
            },
            {
                name: 'user_id'
            },
            {
                name: 'first_name'
            },
            {
                name: 'last_name'
            },
            {
                name: 'full_name'
            },
            {
                name: 'photo'
            },
            {
                name: 'sex'
            },
            {
                name: 'online'
            },
            {
                name: 'network_id'
            }
        ]
    }
});