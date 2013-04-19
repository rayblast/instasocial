core.renderer = {
        attachments: function(attachments){
            var output = '';
            output += '<div class="attachments">';
            for(var i = 0; i < attachments.length; i++){
                var attachment = attachments[i];
                output += '<div class="attachment">';
                switch(attachment.type){
                    case 'photo':
                        output += core.renderer.photo(attachment.Photo);
                        break;
                }
                output += '</div>';
            }
            output += '</div>';
            return output;
        },
        photo: function(photo){
            var output = '';
            output += '<div class="photo">';
            var src = '';
            if(photo.src_big !== undefined){
                src = photo.src_big;
            }
            else{
                src = photo.src;
            }
            
            var style = '';
            style = 'style="max-width: 90%"';

            
            output += '<img ' + style + ' src="' + src + '"/>';
            if(photo.text !== undefined)
                output += '<div class="text">' + photo.text + '</div>';
            output += '</div>';
            return output;
        },
        urlify: function(text) {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
        }
};