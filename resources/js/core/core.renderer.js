core.renderer = {
        networks:{
            vk: {
                audio: function(id){
                    if(document.getElementById('audioPlayer_' + id) !== null)
                        return;
                    
                    core.helper.removeElementsByClass('.audioPlayer');
                    
                    var url = 'audio.getById';
                    var params = {
                        audios: id
                    };
                    
                    VK.api(url, params, function(data) {
                        var audioDiv = document.getElementById('audio_' + id);
                        var audio_url = data.response[0].url;
                        var player = '';
                        player += '<audio controls class="audioPlayer" id="audioPlayer_' + id + '">';
                        player += '<source src="' + audio_url + '" type="audio/mpeg" codecs="mp3">';
                        player += '</audio>';
                        audioDiv.innerHTML += player;
                    });
                },
                video: function(id){
                    if(document.getElementById('videoPlayer_' + id) !== null)
                        return;
                    
                    core.helper.removeElementsByClass('.videoPlayer');
                    core.helper.setElemetsStyleByClass('.videoPhoto', 'display', 'block');
                    
                    var url = 'video.get';
                    var params = {
                        videos: id,
                        width: 320
                    };
                    
                    VK.api(url, params, function(data) {
                        if(data.response.length < 2){
                            Ext.Msg.alert(labels.lblError,labels.msgCantPlayMedia);
                            return;
                        }
                        var videoDiv = document.getElementById('videoPlayerContainer_' + id);
                        var videoPhoto = document.getElementById('videoPhoto_' + id);
                        var video_url = data.response[1].player;
                        var player = '';
                        player += '<iframe class="videoPlayer" id="videoPlayer_' + id + '" src="' + video_url + '" frameborder="0">';
                        player += '</iframe>';
                        videoPhoto.style.display = 'none';
                        videoDiv.innerHTML += player;
                    });
                }
            }
        },
        repost: function(parent_user, parent_created_time){
            if(parent_user !== null && parent_user !== undefined){
                var output = '';
                output += '<div class="repost">';
                output += '<div class="repost_icon">';
                output += '<img src="' + parent_user.photo + '" style="height:100%;"/>';
                output += '</div>';
                output += '<div class="repost_pic">';
                output += '</div>';
                output += '<div class="repost_name">';
                output += parent_user.full_name;
                output += '</div>';
                if(parent_created_time > 0){
                    output += '<div class="repost_date">';
                    output += core.helper.getDateTimeFromUnix(parent_created_time);
                    output += '</div>';
                }
                output += '</div>';
                return output;
            }
        },
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
                    case 'link':
                        output += core.renderer.link(attachment.Link);
                        break;
                    case 'audio':
                        output += core.renderer.audio(attachment.Audio);
                        break;
                    case 'video':
                        output += core.renderer.video(attachment.Video);
                        break;
                }
                output += '</div>';
            }
            output += '</div>';
            return output;
        },
        photo: function(photo){
            var output = '';
            
            var src = '';
            if(photo.src_big !== undefined){
                src = photo.src_big;
            }
            else{
                src = photo.src;
            }
            
            if(src === undefined || src === null || src === '')
                return output;
            
                
            var divStyle = '';
           // divStyle += (photo.height !== undefined)?('min-height: 310px;'):'min-height: 100px;';
            
            output += '<div class="photo" style="' + divStyle + '">';

            var style = '';
            style = 'style="max-width: 90%;';
            //style += (photo.height !== undefined)?('max-height: 310px;'):'';
            style += '"';

            
            output += '<img ' + style + ' src="' + src + '"/>';
            if(photo.text !== undefined)
                output += '<div class="text">' + core.renderer.urlify(photo.text) + '</div>';
            output += '</div>';
            return output;
        },
        link: function(link){
            var output = '';
            output += '<div class="link">';
            
            if(link.image_src !== undefined){
                output += '<div class="photo">';
                output += '<img src="' + link.image_src + '" style="max-height:100%;"/>';
                output += '</div>';
            }
            
            output += '<div class="title">';
            output += core.renderer.textToUrl(link.title, link.url);
            output += '</div>';
            
            output += '<div class="description">';
            output += link.description;
            output += '</div>';
            
            output += '<div class="url">';
            output += core.renderer.urlify(link.url);
            output += '</div>';
            
            output += '</div>';
            return output;
        },
        audio: function(audio){
            var output = '';
            var audio_id = audio.owner_id + '_' + audio.aid;
            output += '<div class="audio" id="audio_' + audio_id + '" onclick="core.renderer.networks.vk.audio(\'' + audio_id + '\');">';
            output += '<div class="controls">';
            output += '</div>';
            output += '<div class="title">';
            output += '<b>' + audio.performer + '</b>' +  ' - ' + audio.title;
            output += '</div>';
            output += '<div class="duration">';
            output += core.helper.getTimeFromSeconds(audio.duration);
            output += '</div>';
            output += '</div>';
            return output;
        },
        video: function(video){
            var output = '';
            var video_id = video.owner_id + '_' + video.vid;
            var image = '';
            if(video.image_big !== undefined){
                image = video.image_big;
            }else{
                image = video.image;
            }
            output += '<div class="video" id="video_' + video_id + '">';
            output += '<div class="videoPlayerContainer" id="videoPlayerContainer_' + video_id + '">';
            output += '<div class="videoPhoto" id="videoPhoto_' + video_id + '" onclick="core.renderer.networks.vk.video(\'' + video_id + '\');">';
            output += '<div class="videoPlayIcon">';
            output += '</div>';
            output += '<img src="' + image + '" style="max-width:90%; height:160px;"/>';
            output += '</div>';
            output += '</div>';
            output += '<div class="title">';
            output += '<b>' + video.title + '</b>' +  ' (' + core.helper.getTimeFromSeconds(video.duration) + ')';
            output += '</div>';
            output += '</div>';
            
            return output;
        },
        textToUrl: function(text, url) {
            return '<a href="' + url + '" target="_blank">' + text + '</a>';
        },
        urlify: function(text) {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
        }
};