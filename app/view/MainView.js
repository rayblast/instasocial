Ext.define("InstaSocial.view.MainView", {
    extend: 'Ext.ux.slidenavigation.View',
    
    requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.event.publisher.Dom'
    ],
    
    config: {
        fullscreen: true,
         
        /**
         *  Any component within the container with an 'x-toolbar' class
         *  will be draggable.  To disable draggin all together, set this
         *  to false.
         */
        slideSelector: 'x-toolbar',

        /**
         *  Container must be dragged 10 pixels horizontally before allowing
         *  the underlying container to actually be dragged.
         *
         *  @since 0.2.2
         */
        containerSlideDelay: -1,
        
        /**
         *  Time in milliseconds to animate the closing of the container
         *  after an item has been clicked on in the list.
         */
        selectSlideDuration: 200,

        /**
         *  Enable content masking when container is open.
         *
         *  @since 0.2.0
         */
        itemMask: true,

        /**
         *  Define the default slide button config.  Any item that has
         *  a `slideButton` value that is either `true` or a button config
         *  will use these values at the default.
         */
        slideButtonDefaults: {
            selector: 'toolbar'
        },
         
        /**
         *  This allows us to configure how the actual list container
         *  looks.  Here we've added a custom search field and have
         *  modified the width.
         */
        list: {
            maxDrag: 400,
            width: 200,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',                    
                title: {
                    title: labels.lblMenu,
                    centered: false,
                    width: 200,
                    left: 0
                }
                
                /**
                 *  Here's an example of how to add a different type of
                 *  component into the toolbar of the list.
                 */
                /*
                items: [{
                    docked: 'top',
                    xtype: 'searchfield',
                    placeHolder: 'search',
                    width: 180
                }]
                */
            }]
            
        },
        
        /**
         *  Change this to 'right' to dock the navigation list to the right.
         */
        listPosition: 'left',

        /**
         *  Example of how to re-order the groups.
         */
        groups: {

        },
        
        /**
         *  These are the default values to apply to the items within the
         *  container.
         */
        defaults: {
            style: 'background: #fff',
            xtype: 'container'
        },
        
        items: [{
            title: labels.lblNewsFeed,
            group: labels.lblNews,

            // Enable the slide button using the defaults defined above in
            // `slideButtonDefaults`.
            slideButton: {
                selector: 'toolbar',
                iconMask: true,
                iconCls: 'home'
            },
            items: [{
                xtype: 'toolbar',
                title: labels.lblNewsFeed,
                docked: 'top'
            },{
                xtype: 'newsFeedContainer',
                html: '',//<img src="resources/images/guide.jpg" width="100%" />',

                // Mask this item when the container is opened
                maskOnOpen: true
            }]
        },{
            title: labels.lblOther,
            group: labels.lblNewsFeed,
            /**
             *  Here's an example of how an item can simply execute a
             *  function, rather than display a new component.
             */
            handler: function() {
                Ext.Msg.alert(labels.lblOther, '');
            }
        },{
            title: labels.lblNetworks,
            group: labels.lblSettings,
            slideButton: {
                selector: 'toolbar',
                iconMask: true,
                iconCls: 'home'
            },
            items: [{
                xtype: 'toolbar',
                title: labels.lblManageNetworks,
                docked: 'top'
            },{
                //styleHtmlContent: true,
                xtype: 'networkListContainer'
                //layout: 'card',
                //html: '<h2>Item 4</h2><p>The toolbar for this item is at the bottom, which has a slideButton and uses a different icon.</p>'
            }]
        }]
    }
});
