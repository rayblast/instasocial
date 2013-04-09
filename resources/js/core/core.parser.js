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
                    var text = (data.message !== undefined) ? data.message : '';
                    var likes_count = (data.likes !== undefined) ? data.likes.count : 0;
                    var comments_count = (data.comments !== undefined) ? data.comments.count : 0;
                    var created_time = core.parser.helper.getDateTime(data.created_time);
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
                    var postsData = data.data;
                    var posts = [];
                    for(var i in postsData){
                        posts.push(core.parser.networks.vk.newsfeed.post(postsData[i]));
                    }
                    return posts;
                },
                post: function(data){
                    
                }
            }
        }
    },
    helper: {
        getDateTime: function(str){
            var d = new Date(str);
            var date = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            var full_date = date + "." + month + " " + hours + ":" + minutes;
        }
    }
};