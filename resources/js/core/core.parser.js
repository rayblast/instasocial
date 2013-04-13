core.parser = {
    networks:{
        fb:{
            newsfeed:{
                posts: function(data){
                    var postsData = data.data;
                    var posts = [];
                    for(var i in postsData){
                        posts.push(core.parser.networks.fb.newsfeed.post(postsData[i]));
                    }
                    return posts;
                },
                post: function(data){
                    var post_id = (data.id !== undefined) ? data.id : 0;
                    var user_id = (data.from !== undefined) ? data.from.id : 0;
                    var full_name = (data.from !== undefined) ? data.from.name : '';
                    var photo = 'http://graph.facebook.com/' + user_id + '/picture';
                    var text = (data.message !== undefined) ? core.renderer.urlify(data.message) : '';
                    var likes_count = (data.likes !== undefined) ? data.likes.count : 0;
                    var comments_count = (data.comments !== undefined) ? data.comments.count : 0;
                    var created_time = core.parser.helper.getDateTimeFromString(data.created_time);
                    var post_photo = (data.picture !== undefined) ? data.picture : '';
                    var post = {
                        "post_id": post_id,
                        "user": {
                            "user_id": user_id,
                            "full_name": full_name,
                            "photo": photo,
                            "network_id": "fb"
                        },
                        "text": text,
                        "likes_count": likes_count,
                        "comments_count": comments_count,
                        "created_time": created_time,
                        "attachments": [
                            {
                                "type": "photo",
                                "photo": {
                                    "src": post_photo
                                }
                            }
                        ],
                        "type": "post",
                        "network_id": "fb"
                    };
                    return post;
                }
            }
        },
        vk:{
            newsfeed: {
                posts: function(data){
                    var postsData = data.response.items;
                    var profilesData = data.response.profiles;
                    var groupsData = data.response.groups;
                    var posts = [];
                    for(var i in postsData){
                        if(postsData[i].type == "wall_photo")
                            continue;
                        posts.push(core.parser.networks.vk.newsfeed.post(postsData[i], profilesData, groupsData));
                    }
                    return posts;
                },
                post: function(data, profilesData, groupsData){
                    var post_id = (data.post_id !== undefined) ? data.post_id : 0;
                    var user_id = (data.source_id !== undefined) ? data.source_id : 0;
                    var user = (user_id >= 0) ? 
                        core.parser.networks.vk.helper.getUserFromProfilesArrayById(Math.abs(user_id), profilesData) : 
                        core.parser.networks.vk.helper.getUserFromGroupsArrayById(Math.abs(user_id), groupsData);

                    var text = (data.text !== undefined) ? core.renderer.urlify(data.text) : '';
                    var likes_count = (data.likes !== undefined) ? data.likes.count : 0;
                    var comments_count = (data.comments !== undefined) ? data.comments.count : 0;
                    var created_time = core.parser.helper.getDateTimeFromUnixTime(data.date);
                    var attachments; 
                    
                    var post;
                    if(data.type == "post"){        
                        attachments = data.attachments;
                    }else if (data.type == "photo"){
                        attachments = [];
                        var photos = data.photos;
                        for(var i = 0; i < photos.length; i++){
                            if(photos[i].src !== undefined){
                                attachments.push(
                                    {
                                        "type": "photo",
                                        "photo": photos[i]
                                    }
                                );
                            }
                        }
                    }
                    
                    post = {
                            "post_id": post_id,
                            "user": user,
                            "text": text,
                            "likes_count": likes_count,
                            "comments_count": comments_count,
                            "created_time": created_time,
                            "attachments": attachments,
                            "type": "post",
                            "network_id": "vk"
                    };
                    return post;
                }
            },
            helper: {
                getUserFromProfilesArrayById: function(id, profilesData){
                    for(var i = 0; i < profilesData.length; i++){
                        var profile = profilesData[i];
                        if(profile.uid == id){
                            var user = {
                                "user_id": profile.uid,
                                "full_name": profile.first_name + " " + profile.last_name,
                                "photo": profile.photo,
                                "network_id": "vk"
                            };
                            return user;
                        }
                    }
                },
                getUserFromGroupsArrayById: function(id, groupsData){
                    for(var i = 0; i < groupsData.length; i++){
                        var group = groupsData[i];
                        if(group.gid == id){
                            var user = {
                                "user_id": group.gid,
                                "full_name": group.name,
                                "photo": group.photo,
                                "network_id": "vk"
                            };
                            return user;
                        }
                    }
                }
            }
        }
    },
    helper: {
        getDateTimeFromString: function(str){
            var d = new Date(str);
            var date = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            var full_date = date + "." + month + "." + year +" " + hours + ":" + (minutes <= 9 ? '0' + minutes : minutes);
            return full_date;
        },
        getDateTimeFromUnixTime: function(time){
            return core.parser.helper.getDateTimeFromString(time * 1000);
        }
    }
};