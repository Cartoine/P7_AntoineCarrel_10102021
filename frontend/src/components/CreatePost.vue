<template>
    <div id="createPost" class="createPost">
        <div>
            <h1>Ecrire un post</h1>
        <div id="user">
            <img :src="user.photo">
            <div class="name">
                <p>{{ user.firstName }} {{ user.lastName }}</p>
            </div>
        </div>
        <form @submit.prevent="createPost" id="form">
            <div>
                <textarea aria-label="Contenu texte d'un post" v-model="postContent.content" placeholder="Que voulez-vous dire ?" class="text"></textarea>
                <p id="maxCarateres">⚠️ Max 255 caracteres ⚠️ </p>
            </div>
            <div>
                <label>
                    <div role="button" aria-label="Téléchargement d'un fichier">
                        <span v-if="postContent.attachments">Fichier séléctionné : {{postContent.attachments.name}}</span>
                        <span v-else>Ajouter un fichier</span>
                    </div>
                    <input class="upload" type="file" ref="photo" v-on:change="handleFileUpload()"/>
                </label>
                <div>
                    <input class="publish" type="submit" value="Publier" aria-label="Publication d'un post" v-on:click="loadAllPosts()"/>
                </div>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'NewPost',
    props: {
        submit: Function
    },
    data() {
        return {
            cookie: this.$cookies.get("token"),
            user: "",
            userPhoto: '',
            postContent: {
                content: null,
                attachments: null,
            }
        }
    },
    created() {
        axios
        .get('http://localhost:3000/api/users/me', {
            headers: { 
            Authorization: "Bearer " + this.cookie }
        })
        .then((response) => {
            this.user = response.data.user;
        })
        .catch(error => {
            console.log(error);
        })
    },
    methods: {
        createPost() {
            if (this.postContent.content !== null) {
                if (this.postContent.attachments !== null) {
                    let formData = new FormData();
                    formData.append('content', this.postContent.content);
                    formData.append('attachments', this.postContent.attachments, this.postContent.attachments.name);
                    axios
                        .post('http://localhost:3000/api/posts', 
                            formData , {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                            Authorization: "Bearer " + this.cookie }
                            }
                        )
                        .then(response => {
                            console.log(response);
                            this.$router.go('/')
                            })
                        .catch(error => {
                            console.log(error)
                            });
                } else {
                    let formData = new FormData();
                    formData.append('content', this.postContent.content);
                    axios
                        .post('http://localhost:3000/api/posts', 
                            formData , {
                            headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: "Bearer " + this.cookie }
                            }
                        )
                        .then(response => {
                            console.log(response);
                            this.$router.go('/')
                            })
                        .catch(error => {
                            console.log(error.response)
                            let codeStatus = error.response.status;
                            if (codeStatus == 400) {
                                const showError = document.getElementById('maxCarateres');
                                showError.style.display = "block"
                                
                                }
                            });
                }
            } else {
                return false;
            }
        },
        uploadImage() {
            console.log('Image Téléchargée !')
        },
        loadAllPosts() {
            this.$emit('load-all-posts');
        },
        handleFileUpload(){
        this.postContent.attachments = this.$refs.photo.files[0];
        },
    },
}
</script>

<style >

.createPost{
    background-color: #fff;
    width: 90%;
    height: 50%;
    margin-top: 10px;
    margin-right: 10px;
    padding: 15px;
    border-radius: 10px; 
}

#user{
    display: flex;
    font-size: 16px;

}

#user img {
    width: 60px;
    height: 60px; 
    border-radius: 50px; 
    margin-right: 20px;
}

.name{
    font-weight: bold;
}

.content p {
    padding: 10px;
    border: 2px inset rgba(44,62,80,0.12);
    border-radius: 20px;
}

.comment-zone{
    display: flex;
    align-items: center;
    justify-content: space-between;
   
}

textarea{
    margin-top: 20px;
    padding: 10px;
    border: 2px inset rgba(44,62,80,0.12);
    border-radius: 20px;
    max-width: 90%;
    width: 90%;
    height: 200px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
#maxCarateres {
    color: red;
    text-align: center;
    font-size: 24px;
    margin-top: 20px;
    font-weight: bold;
    display: none;
}
.publish{
    width: 450px;
    height: 50px;
    background-color: #42b983;
    border: 2px inset rgba(44,62,80,0.12);
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    margin-top: 10px;
}

.publish:hover{
    background-color: #2c3e50;
}


    /* #user {
        display: flex;
        justify-content: center;
        margin: 0 0 20px 0;
        }
    .nom {
        line-height: 60px;
        padding: 0 15px;
        font-size: 2rem;
    }
    #createPost {
        text-align: center;
        padding: 20px 0;
        background-color: #c7c7c7;
        border-radius: 10px;
        width: 600px;
        height: 200px;
        margin-left: 650px;
    }
    .text {
        width: 220px;
        height: 30px;
        padding-top: 3px;
        text-align: center;
        border-radius: 10px;
        margin: 25px 15px 0 50px;
    }
    #form {
        display: flex;
        justify-content: center;
    }
    .upload {
        margin-bottom: 20px;
        padding: 5px;
    }
    .publier {
        padding: 0 5px 3px 5px;
    }
    @media screen and (max-width: 568px) {
        #createPost {
            margin: 0 15px 30px 15px;
            padding: 0 0 15px 0;
            height: 100%;
            width: 90%;
            background-color: #c7c7c7;
            
        }
        .nom {
            font-size: 1rem;
        }
        #user {
            margin: 0;
        }
        #form {
            display: flex;
            flex-direction: column;
        }
        #user img {
            width: 40px;
            height: 40px;
            margin-top: 7px;
        }
        .text {
            margin: 0;
        }
        .upload {
            margin: 0;
        }
    } */
</style>