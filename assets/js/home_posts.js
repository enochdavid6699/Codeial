{
    //Methode to submit form using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button' , newPost));
                    new Noty({
                        theme: 'relax',
                        text: "Post Created",
                        type: 'success',
                        layout:'topRight',
                        timeout: 2000
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                    new Noty({
                        theme: 'relax',
                        text: "Cannot be Posted",
                        type: 'error',
                        layout:'topRight',
                        timeout: 2000
                    }).show();
                }
            })
        });
    }

    //Methode to create a post in DOM
    let newPostDom = function(post){
    return $(`<li id="post-${post._id}">
                    <p>
                        ${post.content}
                        <br>
                        <small>
                        - ${post.user.name}
                        </small>
                
                        
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>                                         
                
                        <div class="post-comments">
                        
                            <form action="/comments/create" method="post">
                                <input type="text" name="content" placeholder="Type here to add comment..."  required>
                                <input type="hidden" name="post" value="${ post._id }">
                                <input type="submit" value="Add Comment">
                            </form>
                            
                        </div>

                        <div class="post-comments-list">  
                            <ul id="post-comments-${ post._id }">
                            </ul>
                        </div>
                        
                    </p>
                </li>`);
    }

    //Methode to Delete a Post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'), //This is how you get the value of href 
                // success: function(){
                //     $(`#post-${data.post_id}`).remove();
                // },
                success: function(){
                    $(deleteLink).closest('li').remove(); // Removes the parent <li> element of the delete link
                    // Optionally, provide feedback to the user
                    console.log("Post deleted successfully.");
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout:'topRight',
                        timeout: 2000
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                    new Noty({
                        theme: 'relax',
                        text: "Cannot be Posted",
                        type: 'error',
                        layout:'topRight',
                        timeout: 2000
                    }).show();
                }
            })
        })
    } 

    let convertPostAllPostsToAjax = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this)
            deletePost($( '.delete-post-button' , self))
        })

        // get the post's id by splitting the id attribute
        // let postId = self.prop('id').split("-")[1]
        // new PostComments(postId);
    }
    
    convertPostAllPostsToAjax();
    createPost();
}

