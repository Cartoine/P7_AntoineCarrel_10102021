<template>
    <div id="all-users">
        <div class="alert">
            <h1 class="title">Gestion des utilisateurs</h1>
            <p>Vous pouvez modifier la permission des utilisateurs en changeant le false à true puis en mettant à jour.</p>
            <p>Attention ! Une fois mis à jour vous n’aurez plus accès à l’utilisateur car il sera admin à son tour.</p>
            <p>Vous pouvez aussi supprimer un utilisateur.</p> 
        </div>
        <div class="all-user-items">
            <UserItem v-for="user in allUsers" :photo="user.photo" :firstName="user.firstName" :lastName="user.lastName" :email="user.email"
            v-on:user-deleted="deleteUser(user.id)" v-on:user-updated="updateUser(user.id, user)" :key="user.id">
            <template v-slot:Permission>
                <select name="permission" id="permission-select" v-model.number="user.permission">
                    <option v-for="option in options" v-bind:key="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </template>
            </UserItem>
        </div>
    </div>
</template>



<script>
import UserItem from '@/components/UserItem.vue'
import axios from 'axios'
export default {
    name: 'allUsersAdmin',
    components: {
        UserItem
    },
    data() {
        return {
            cookie: this.$cookies.get("token"),
            allUsers: [],
            user: {
                firstName: 'Victor',
                lastName: 'Deweerdt',
                photo: '',
                email: '',
                permission: false,
            },
            options: [
                { text: 'false', value: '0' },
                { text: 'true', value: '1' }
            ],
        }
    },
    created() {
        axios
            .get('http://localhost:3000/api/admin/users', {
                headers: { Authorization: "Bearer " + this.cookie }
            })
            .then(response => {
                console.log("users", response.data);
                this.allUsers = response.data;
                })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        deleteUser(id) {
            this.$confirm(
                {
                    message: `Êtes-vous sur de vouloir supprimer ce compte ?`,
                    button: {
                        no: 'No',
                        yes: 'Yes'
                    },
                    callback: confirm => {
                        if (confirm) {
                            axios
                                .delete('http://localhost:3000/api/admin/users/' + id, {
                                    headers: { Authorization: "Bearer " + this.cookie }
                                })
                                .then(() => console.log({message : 'Utilisateur supprimé !'}))
                                .catch(error => console.log(error))
                            this.$router.go();
                        }
                    }
                }
            )
        },
        updateUser(id, user) {
            this.$confirm(
                {
                    message: `Attention ! Si vous modifiez la permission de cet utilisateur, vous ne pourrez plus y accéder. Les admins n'ont accès qu'aux non-admins. Continuer ?`,
                    button: {
                        no: 'No',
                        yes: 'Yes'
                    },
                    callback: confirm => {
                        if (confirm) {
                            console.log(user);
                                axios
                                    .put('http://localhost:3000/api/admin/users/' + id, user, {
                                        headers: { 
                                            Authorization: "Bearer " + this.cookie }
                                    })
                                    .then(() => console.log({message : 'Utilisateur modifié !'}))
                                    .catch(error => console.log(error))
                                this.$router.go();
                            }
                    }
                }
            )
        }
    }
}
</script>

<style>
.alert {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #42b983;
    color: #fff;
    margin-top: 20px;
    margin-left: 100px;
    margin-right: 100px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: bold;
    text-transform: capitalize;
    border: 2px inset rgba(44,62,80,0.12);
    border-radius: 20px;
    padding: 5px;
}

#permission-select {
    width: 100px;
    height: 40px;
    margin-left: 10px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: bold;
    text-transform: capitalize;
    border: 2px inset rgba(44,62,80,0.12);
    border-radius: 20px;
    padding: 5px;
}
</style>