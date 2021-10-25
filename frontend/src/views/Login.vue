<template>
    <div id="conteneur">
    <div id="login">
        <div >
            <div >
                <div id="title">
                    <h3>Connexion</h3>
                </div>
                <div id="lien">
                    <router-link to="/signup">Inscription</router-link>
                </div>
            </div>
        </div>
        <div >
            <div id="connect">
                <input type="email" id="email" placeholder="mail@example.com" aria-label="email d'un utilisateur" v-model="dataUser.email"/>
                <input type="password" id="password-input" placeholder="Mot de passe" aria-label="Mot de passe d'un utilisateur" v-model="dataUser.password" 
                v-on:keyup.enter="submitLogin"/>
                <button type="submit" class="btn" aria-label="Connexion d'un utilisateur" @click.prevent="submitLogin" v-on:keyup.enter="submitLogin">Se connecter</button>
            </div>
            <p id="errorMessage">merci de remplire les champs</p>
        </div>
    </div>
</div>
</template>


<script>
import axios from "axios";
export default {
    name: 'login',
    data() {
        return {
            dataUser: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        submitLogin() {
            if (this.email !== null || this.password !== null) {
                axios
                    .post("http://localhost:3000/api/users/login",
                        this.dataUser,

                    )
                    .then(response => {
                        localStorage.setItem("token", response.data.token);
                        this.$cookies.set("token", response.data.token, '1d');
                        this.$router.push("/");
                    })
                    .catch(error => {
                        console.log(error.response)
                        // console.log(error.response.status)
                        let notFound = error.response.status
                        console.log(notFound)
                        
                        if (notFound == 404) {
                            
                            console.log('utilisateur non trouver')
                            const showError = document.getElementById('errorMessage')
                            showError.style.display = 'block'
                            const errorText = error.response.data.error
                            showError.textContent = errorText

                        } else if ( notFound == 400) {

                            const showError = document.getElementById('errorMessage')
                            showError.style.display = 'block'
                            const errorText = error.response.data.error
                            showError.textContent = errorText
                        }

                    })
                    
            }
        }
    },   
}
</script>

<style>

#errorMessage{
    color: red;
    display: none;
    font-size: 24px;
    margin-top: 20px;
}
    body, * {
        margin: 0;
        padding: 0;
    }
    #conteneur {
        display: flex;
        justify-content: center;
    }
    #title h3 {
        color: #fff;
        font-size: 3rem;
    }
    #lien a {
        font-weight: 500;
        font-size: 1.5em;
        text-decoration: none;
        color: #fff;
    }
    #lien a:hover{
        color: #42b983;
    }
    #login {
      text-align: center;
    }
    #connect{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 40px;
    }
    #connect input {
        margin-bottom: 30px;
        background-color: transparent;
        font-size: 20px;
        border: 3px solid #fff;
        color: #fff;
        border-radius: 15px;
        height: 50px;
        padding: 5px;
    }
    ::placeholder{
        color: #fff;
        font-size: 15px;
        padding: 5px;
    }
    .btn {
        /* width: 50%; */
        padding: 10px;
        border-radius: 15px;
        font-size: 1.2rem;
        margin-top: 0px;
        background-color: transparent;
        border: 3px solid #fff;
        color: #fff;
        /* background-image: linear-gradient(to top left,rgba(0, 0, 0, .2),rgba(0, 0, 0, .2) 30%,rgba(0, 0, 0, 0));        */
    }
    .btn:hover {
        background-color: #42b983;
        border: 3px solid #42b983;
    }
     /* @media screen and (max-width: 568px){
        #conteneur {
            display: flex;
            flex-direction: column;
            margin: 10px 0 0 0;
            width: 100%;
        }
        #accueil {
            padding: 0;
            align-items: center;
            background-size: 160px;
        }
        #accueil div p {
            font-size: 0.9rem;
            margin-bottom: 10px;
        }
        #accueil div i {
            padding: 0 0 0 10px;
            font-size: 25px;
        }
        #accueil div {
            padding: 0;
            width: 100%;
        }
        #login {
            padding: 0;
            margin: 0;
        }
        #connect {
            padding: 25px 0 0 0;
        }
        #connect input {
            margin-bottom: 20px;
            font-size: 20px;
        }
        .btn {
            margin-top: 0;
        }
        #title h3 {
            font-size: 2rem;
            padding: 40px 0 15px 0;
        }
    } */
</style>