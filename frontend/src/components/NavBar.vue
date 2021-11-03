<template>
    <nav id="nav">
        <div class="logo">
            <router-link to="/"><img src="../assets/icon-left-font-monochrome-white.svg" id="logo-groupomania" alt="logo de la boite"></router-link>
        </div>
        <div id="nav-info">
            <div v-if="$route.path==='/login' || $route.path==='/signup' ? false : true" v-bind="account">
                <div role="link" aria-label="Accès aux informations utilisateurs" class="navbar-user">
                    <ul id="navLink">
                        <li><router-link to="/account" class="menu">Mon compte</router-link></li>
                        <li v-if="admin == 1"><router-link to="/allusersadmin" class="menu">Tous les utilisateurs</router-link></li>
                        <li><a href="#" class="logOut menu" @click="logOut()">Se déconnecter</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';
export default {
    name: 'NavBar',
    data() {
        return {
          cookie: this.$cookies.get("token"),
          userPhoto: '',
          admin: '',
          account: ''
        }
    },
    created() {
        if (this.cookie == null) {
            return false;
        } else {
            axios
                .get('http://localhost:3000/api/users/me', {
                    headers: { 
                    Authorization: "Bearer " + this.cookie }
                })
                .then(response => {
                    this.userPhoto = response.data.user.photo;
                    this.admin = response.data.user.permission;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    methods: {
        logOut() {
          this.$confirm(
            {
                message: `Êtes-vous sûr de vous déconnecter ?`,
                button: {
                    no: 'No',
                    yes: 'Yes'
                },
                callback: confirm => {
                    if (confirm) {
                      this.$cookies.remove("token");
                      this.$router.go();
                    }
                }
            })
        },
        loadUser() {
            if (this.$cookies.isKey("token")) {
                axios
                    .get('http://localhost:3000/api/users/me', {
                        headers: { 
                        Authorization: "Bearer " + this.cookie }
                    })
                    .then(response => {
                        this.userPhoto = response.data.user.photo;
                        this.admin = response.data.user.permission;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                return false;
            }
        }
    },
    watch: {
        '$route' () {
            this.cookie = this.$cookies.get("token");
            this.loadUser();
        }
    }
}
</script>

<style>
#nav {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: -10px;
    margin-right: -10px;
    margin-top: -10px;
    padding: 10px;
}

#navLink {
    display: flex;
    justify-content: end;
    flex-direction: row;
    list-style: none;
}

#navLink a {
    text-decoration: none;
    color: #2c3e50;
    font-weight: bold;
    margin-left: 20px;
    margin-right: 20px;
}

#navLink a:hover {
    text-decoration: none;
    font-weight: 200;
}

.logo{
    flex-grow: 0;
}
#nav-info {
    flex-grow: 1;
}
  
    @media screen and (max-width: 875px){
        .logo{
            width: 30%;
        }
        #logo-groupomania {
            width: 100%;
        }
        #navLink a {
            margin-left: 10px;
            margin-right: 10px;
}
    }
</style>