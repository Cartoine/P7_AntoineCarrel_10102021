<template>
    <div class="card">
        <div>
            <div class="userItem">
                <img id="imgProfile" :src="photo">
                <div class="userName">
                    <p>{{ firstName }} {{ lastName }}</p>
                    <p>{{ email }}</p>
                </div>
            </div>
            <div class="permission">
                <div class="adminContainer">
                <h3>Admin: </h3>
                <slot name="Permission"></slot>
                </div>
                <button class="updateUser" type="submit" aria-label="Modification de permission admin d'un utilisateur" v-on:click.prevent="updateUsers(user)">Mettre à jour
                </button>
            </div>
        </div>
        <div id="divDelete">
            <button class="userDelete" aria-label="Suppression d'un utilisateur" v-on:click.prevent="deleteUser(user)">Supprimer le compte</button>
        </div>
    </div>
</template>


<script>
export default {
    name: 'UserItem',
    props: {
        firstName: {
            type: String,
            default: 'Victor'
        },
        lastName: {
            type: String,
            default: 'Deweerdt'
        },
        photo: {
            type: String,
            default: 'http://localhost:3000/images/DSC04282.jpg1604754621573.jpg'
        },
        email: {
            type: String,
            default: 'vdeweerdt@groupomania.com'
        },
        user: {
            type: String
        }
    },
    methods: {
        deleteUser(user) {
            this.$emit('user-deleted', user);
        },
        updateUsers(user) {
            this.$emit('user-updated', user);
        }
    }
}
</script>

<style>
.card {
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px inset rgba(44,62,80,0.12);
    border-radius: 20px;
    font-weight: bold;
    font-size: 18px;
    margin-top: 10px;
    margin-left: 30%;
    margin-right: 30%;
}
.userItem {
     display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.userName {
    display: flex;
    /* background-color: red; */
}
.userName p {
    margin: 10px;
}

#imgProfile {
    width: 250px;
  border-radius: 10px;
  border: 4px inset rgba(44,62,80,0.12);
}

.permission {
    display: flex;
    flex-direction: column;
}
.adminContainer{
    display: flex;
    justify-content: center;
    align-items: center;
}
.updateUser {
     color: #fff;
  height: 50px;
  width: 350px;
  background-color: #42b983;
  border: 2px inset rgba(44,62,80,0.12);
  border-radius: 20px;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
}

.updateUser:hover {
    background-color: #2c3e50;
}
.userDelete {
    color: rgba(255, 0, 0, 0.644);
  height: 50px;
  width: 350px;
  background-color: #2c3e50;
  border: 2px inset rgba(44,62,80,0.12);
  border-radius: 20px;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
}

.userDelete:hover{
    color: red;
}
   @media screen and (max-width: 875px){
    .card {
    margin-left: 10%;
    margin-right: 10%;
    }
}
</style>