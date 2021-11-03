<template>
    <div class="last-comments">
        <div class="comment-bloc">
            <img class="user-photo-comment userInfo" :src="commentUserPhoto" @error="replaceByDefault" alt="Iser pictiure">
            <p class="user-name">{{ commentFirstName }} {{ commentLastName }}</p>
            <div class="comment-area">
                <p aria-label="Zone de texte d'un commentaire">{{ commentContent }}</p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
     methods: {
        replaceByDefault(e) {
        const img = 'http://localhost:3000/images/noImage.jpg'
      e.target.src = img
    }
  },
    name: 'Comment',
    props: {
        commentFirstName: {
            type: String,
            default: "patrik"
        },
        commentLastName: {
            type: String,
            default: "chirak"
        },
        commentUserPhoto: {
            type: String,
            default: "http://localhost:3000/images/avatar.png"
        },
        commentContent: {
            type: String,
            default: "Voici mon commentaire."
        }
    }
}
</script>

<style>

</style>