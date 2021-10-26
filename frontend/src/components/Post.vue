<template>
<div id="post" class="post">
    <div>
        <div class="userInfo">
            <div class="userTitle">
                <img :src="userPhoto">
                <h1> {{ firstName }} {{ lastName }} </h1>
            </div> 
            <div class="date">
                <p>{{ createdAt | moment("MM/DD/YYYY") }}</p>
            </div>
        </div>
        <div class="content">
            <img :src="postPhoto || 'http://localhost:3000/images/noImage.jpg' " class="imagePost">
            <div class="likeContainer">
                <p @click="likes+=1" class="like">like 👍 <span> {{likes}}</span></p>
                <p @click="dislikes+=1">dislike 🖕 <span>{{ dislikes }}</span></p>
            </div>
            <p> {{ content }}</p>
        </div>
        <slot name="Comments"></slot>
        <h2>Poster un commentaire</h2>
        <slot name="lastCommentZone"></slot>
    </div>
</div>
</template>

<script>
// import VueLikeDislikeButtons from "vue-like-dislike-buttons";

export default {
    name: 'Post',
    // components : {
    //     VueLikeDislikeButtons
    // },
    data() {
        return {

            likes: 0,
            dislikes: 0,
        }
    },
    mounted() {

        if(localStorage.likes)
        this.likes = parseInt(localStorage.getItem('likes')) + 0;
        
        if(localStorage.dislikes)
        this.dislikes = parseInt(localStorage.getItem('dislikes')) + 0
    },
    watch:{
        likes(newLikes) {
            localStorage.likes = newLikes;
        },
        dislikes(newDislikes) {
            localStorage.dislikes = newDislikes;
        }
    },

    props: {
        subject: {
            default: 'Like'
        },
        firstName: {
            type: String,
            default: ""
        },
        lastName: {
            type: String,
            default: ""
        },
        userPhoto: {
            type: String,
            default: ""
        },
        createdAt: {
            type: String,
            default: "2 heures"
        },
        content: {
            type: String,
            default: "This is my first message !"
        },
        myUserPhoto: {
            type: String,
            default:""
        },
        postId: {
            type: String
        },
        postPhoto: {
            type: String,
        },
        newCommentContent: {
            type: String
        }
        
    },
}
</script>

<style>
.post{
    margin: 10px;
    /* width: 90%; */
    display: flex;
    justify-content: center;
    border-radius: 15px;
    background-color: #fff;
    padding: 20px;
}

.userInfo{
    display: flex;
    justify-content: space-between;
}
.userTitle {
    display: flex;
    align-items: center;
    width: 100%;
}
.userTitle h1 {
    font-size: 16px;
    margin-left: 20px;
}

.userInfo img {
    border-radius: 50px;
    max-width: 40px;
    max-height: 40px;
    height: 40px;
    width: 40px;
}

.imagePost {
    max-width: 500px;
    max-height: 500px;
    width: 500px;
    height: 350px;
    object-fit: cover;
}

.imagePost {
    object-fit: cover;
     width: 500px;
    height: 350px;
    border-radius: 20px;
    /* object-fit: contain; */
}

.content p {
    padding: 10px;
    border: 2px inset rgba(44,62,80,0.12);
    border-radius: 20px;
}


.like-dislike-buttons svg {
    color: #000;

}

.like-dislike-buttons small {
    font-size: 28px;
    color: #000;
    
}

.is-checked {
    text-decoration: none;
    margin: 20px;
}

.like-dislike-buttons__icon {
    padding: 10px;
}

.likeContainer {
    display: flex;
    justify-content: end;
    align-items: center;
    align-content: center;
}
.like {
    margin-right: 20px;
}

@media screen and (max-width: 875px){
    
    .imagePost {
        max-width: 100%;
        width: 100%;
    }
    .post{
        margin: 10px;
        max-width: 100%;
        display: block;
        justify-content: center;
        border-radius: 15px;
        background-color: #fff;
        padding: 20px;
    }
    
}
/* .likeContainer p{
    width: 40%;
    text-align: center;
    text-transform: uppercase;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 24px;
} */


    /* .user h1 {
        padding: 10px 15px 0 15px;
        font-size: 1.5rem;
    }
    .date {
        text-align: end;
        margin-right: 10px;
    }
    .content {
        margin-top: 30px;
        text-align: center;
    }
    .content p {
        font-size: 1.3rem;
        margin-bottom: 20px;
        overflow-wrap: break-word;
    }
    .content img {
        box-shadow: 5px 5px 5px rgb(212, 212, 212);
        max-width: 500px;
        max-height: 500px;
        width: 100%;
        height: 100%;
    }
    @media screen and (max-width: 568px) {
        #post {
            margin: 0 15px 30px 15px;
            padding: 0;
            width: 90%;
        }
        .user h1 {
            font-size: 1rem;
            padding: 0;
        }
        .user img {
            width: 40px;
            height: 40px;
            margin: 0 10px 0 20px;
        }
        .user {
            padding-top: 10px;
            align-items: center;

        }
        .content {
            margin: 0;
        }
    } */
</style>