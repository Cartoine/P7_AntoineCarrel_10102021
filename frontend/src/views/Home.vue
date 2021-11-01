<template>
    <div id="posts-box" class="commentScroll">
        <div class="postContainer">
            <Post v-for="post in allPosts" :firstName="post.User.firstName" :lastName="post.User.lastName" :userPhoto="post.User.photo"
                :createdAt="post.createdAt" :content="post.content" :postPhoto="post.attachments" :key="post.id">
            <template v-slot:Comments v-if="post.Comments !== null" class="commentZone">
                <div class="delete-post" v-on:click="deletePost(post.id)" v-if="post.user_id == user.id || user.permission == 1">
                    <h2>supprimer la publication </h2>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/trash--v1.png"/>
                </div>
                    <h2>Tous les commentaires</h2>
                <div class="commentaire">
                    <button  v-on:click="showComments = showComments ? false : true">Voir tous les commentaires</button>
                </div>
                    <div id="last-comment" v-if="showComments">
                        <div class="last-comment" v-for="comment in post.Comments" v-bind:key="comment.id">
                            <div class="commentUser">
                                <img class="photo-user-comment" :src="comment.User.photo" @error="replaceByDefault">
                                <p class="name">{{ comment.User.firstName }} {{ comment.User.lastName }}</p>
                            </div>
                            <div class="user-comment">
                                <p class="comment-content">{{ comment.content }}</p>
                                <div class="btnDelet">
                                    <img class="delete" v-on:click="deleteComment(post.id, comment.id, user.id, comment.user_id)" v-if="comment.user_id == user.id || user.permission == 1" src="https://img.icons8.com/ios-glyphs/30/000000/trash--v1.png"/>
                                </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:lastCommentZone>
                <div>
                    <form class="comment">
                        <div class="comment-zone">
                            <img :src="user.photo" class="photo-user-comment" @error="replaceByDefault">
                            <textarea v-model="newComment.content" aria-label="Zone d'un commentaire" placeholder="Écrire votre commentaire ici" class="text-comment">
                            </textarea>
                        </div>
                        <div class="btn-comments">
                            <button v-on:click="submitComment(post.id)" type="submit" aria-label="Publication d'un commentaire" class="btn-post">Publier</button>
                        </div>
                    </form>
                </div>
            </template>
            </Post>
        </div>
        <CreatePost v-on:load-all-posts="onSubmit()" />
    </div>
</template>

<script>
import CreatePost from '@/components/CreatePost.vue'
import Post from '@/components/Post.vue'
import axios from 'axios'

export default {
    name: 'Home',
    components: {
        CreatePost,
        Post,
    },
    data() {
        return {
            cookie: this.$cookies.get("token"),
            allPosts: "",
            post: {
                user_id: "",
                createdAt: "",
                content: "",
                id: "",
                attachments: "",
                Comments: []
            },
            postContent: {
                content: null,
                attachments: null,
            },
            comment: {
                content: '',
                user_id: ''
            },
            newComment: {
                content: ''
            },
            user: {
                photo: ''
            },
            showComments: false
        }
    },
    created() {
        axios
            .get('http://localhost:3000/api/posts', {
                headers: { Authorization: "Bearer " + this.cookie }
            })
            .then((response) => {
                console.log("posts", response.data);
                this.allPosts = response.data;
                console.log(response.status)
            
            })
            .catch(error => {
                console.log(error);
                console.log('test')
            });
        axios
            .get('http://localhost:3000/api/users/me', {
                headers: { Authorization: "Bearer " + this.cookie }
            })
            .then(response => {
                this.user = response.data.user;
                console.log(this.user);
            })
            .catch(error => console.log(error))
    },
    methods: {
        deletePost(id) {
            this.$confirm(
                {
                    message: `Supprimer cette publication ?`,
                    button: {
                        no: 'Non',
                        yes: 'Oui'
                    },
                    callback: confirm => {
                        if (confirm) {
                            axios
                                .delete('http://localhost:3000/api/posts/' + id, {
                                    headers: { Authorization: "Bearer " + this.cookie }
                                })
                                .then(response => {
                                    console.log(response)
                                    this.loadPosts();
                                })
                                .catch(error => {
                                    window.alert(error);
                                })
                        }
                    }
                }
            )
        },
        loadPosts() {
            axios
                .get('http://localhost:3000/api/posts', {
                    headers: { Authorization: "Bearer " + this.cookie }
                })
                .then((response) => {
                    console.log("posts", response.data);
                    this.allPosts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        onSubmit() {
            let messageText = document.getElementById('post-area')._value;
            console.log(messageText);
            if (messageText !== null) {
                this.$router.go();
            } else {
                alert('Remplissez le champs texte de votre post !');
                return false;
            }
        },
        submitComment(postId) {
            const comment = this.newComment;
            console.log(comment);
            axios
                .post('http://localhost:3000/api/posts/' + postId + '/comments', 
                comment, {
                    headers: {
                        Authorization: "Bearer " + this.cookie }
                })
                .then(response => {
                    console.log(response);
                    this.$router.go();
                })
                .catch(error => console.log(error))
        },
        deleteComment(postId, commentId, user_id1, user_id2) {
            console.log(user_id1, user_id2)
            this.$confirm(
                {
                    message: `Supprimer ce commentaire ?`,
                    button: {
                        no: 'Non',
                        yes: 'Oui'
                    },
                    callback: confirm => {
                        if (confirm) {
                            axios
                                .delete('http://localhost:3000/api/posts/' + postId + '/comments/' + commentId, {
                                    headers: { Authorization: "Bearer " + this.cookie }
                                })
                                .then(response => {
                                    console.log(response)
                                    this.loadPosts();
                                })
                                .catch(error => {
                                    window.alert(error);
                                })
                        }
                    }
                }
            )
        },
        replaceByDefault(e) {
        const img = 'http://localhost:3000/images/noImage.jpg'
      e.target.src = img
    }
    }
}
</script>

<style>

.delete-post {
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding: 0px 10px 0px 10px;
    background-color: #b94266;
    border: 2px inset rgba(80, 44, 55, 0.12);
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    font-size: 12px;
}
.delete-post img {
    height: 20px;
}
.comment-zone img{
    width: 50px;
}
.commentScroll{
    /* width: 100%;
    max-width: 100%; */
    display: flex;
    /* background-color: crimson; */
}

.commentUser {
    display: flex;
}

.commentUser img {
    margin-right: 20px;
}
.postContainer{
    width: 100%;
}
.commentaire{
    display: flex;
    justify-content: center;
}

.user-comment {
    border: 2px inset rgba(44,62,80,0.12);
    border-radius: 20px;
    padding: 5px;
    margin-top: 0px;
    margin-bottom: 20px;
}

.comment-zone{
    display: flex;
    align-items: center;
    justify-content: space-between;
   
}
.comment-zone textarea{
    padding: 15px;
}

.photo-user-comment{
 border-radius: 50px;
    max-width: 40px;
    max-height: 40px;
    height: 40px;
    width: 40px;

}
.text-comment{
    /* background-color: firebrick; */
    width: 80%;
    max-width: 450px;
    border: 2px inset rgba(44,62,80,0.12);
    border-radius: 20px;
    height: 100px;
    display: flex;
}
.btn-comments {
    display: flex;
    justify-content: center;
}
.btn-comments button{
    margin-top: 20px;
    width: 450px;
    height: 50px;
    background-color: #42b983;
    border: 2px inset rgba(44,62,80,0.12);
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
}

.commentaire button {
     margin-top: 20px;
    width: 300px;
    height: 40px;
    background-color: #2c3e50;
     border: 2px inset rgba(44,62,80,0.12);
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
}

.delete{
    
    width: 35px;
    right: 1;
    left: 0;
}
.btnDelet {
    display: flex;
    justify-content: end;
}
@media screen and (max-width: 875px){
        .commentScroll{
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
            flex-direction: column-reverse;
        }        
    }
</style>