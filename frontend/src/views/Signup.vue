<template>
    <div id="conteneur">
        <div id="signup">
            <div >
                <div>
                    <div id="title">
                        <h3>Inscription</h3>
                    </div>
                    <div id="lien">
                        <router-link to="/login">Connexion</router-link>
                    </div>
                </div>
            </div>
            <div>
                <div id="register">
                    <div class="name">
                    <input type="text" id="firstName" placeholder="Prénom" aria-label="Prénom de l'utilisateur" v-model="dataUser.firstName"/>
                    <input type="text" id="lastName" placeholder="Nom" aria-label="Nom de famille de l'utilisateur" v-model="dataUser.lastName"/>
                    </div>
                    <div class="create">
                    <input type="email" id="email" placeholder="mail@exemple.com" v-model="dataUser.email"/>
                    <input type="password" id="password-input" placeholder="Votre mot de passe" aria-label="Mot de passe de l'utilisateur" v-model="dataUser.password" 
                    v-on:keyup.enter="submitSignup"/>
                        
                    </div>
                    <button type="submit" aria-label="Inscription de l'utilisateur" @click.prevent="submitSignup" class="btn">S'inscrire</button>
                </div>
                            <p id="errorMessage">merci de remplire les  </p>

            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";
export default {
    name: 'signup',  
    data() {
        return {
            dataUser: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        submitSignup() {
            const firstName = document.getElementById('firstName').value
            const lastName = document.getElementById('lastName').value
            const email = document.getElementById('email').value
            const password = document.getElementById('password-input').value;
            const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/; // Au moins une majuscule, un chiffre. Minimum 8 caractères.

            // const showError = document.getElementById('errorMessage');

            if(firstName == "") {
                const showError = document.getElementById('errorMessage');
                showError.style.display = 'block';
                 showError.textContent = "Merci de remplire le Prénom"

            }  else if (lastName == "") {
                const showError = document.getElementById('errorMessage');
                showError.style.display = 'block';
                showError.textContent = "Merci de remplire le nom"

            } else if (email == "" || !EMAIL_REGEX.test(email)) {
                const showError = document.getElementById('errorMessage');
                showError.style.display = 'block';
                showError.textContent = "Le champ mail doit contenir un @, pas de caractére spécial "

            } else if (!PASSWORD_REGEX.test(password)) {
                const showError = document.getElementById('errorMessage');
                showError.style.display = 'block';
                showError.textContent = "Le mot de passe doit contenir un caractere special, 1 majuscule et minimum 8 caractères"

            } else if (this.firstName !== "" || this.lastName !== "" || this.email !== "" || this.password !== "") {
                console.log("c'est good tous les champs sont remplie")
                axios
                    .post("http://localhost:3000/api/users/signup",
                        this.dataUser
                    )
                    .then(response => {
                        console.log(`la reponse du then ${response}`);
                        this.$router.push("/login");
                    })
                    .catch(error => {
                        let err = error
                        console.log(err.response)
                        const showError = document.getElementById('errorMessage');
                        let uniqueMailError = err.response.data.error.errors[0].type
                        console.log(err.response)
                        console.log(err.response.status)
                        console.log(err.response.data.error.errors[0].type)
                        console.log(uniqueMailError)

                        if (uniqueMailError == "unique violation") {
                            console.log('nique ta race')
                            showError.style.display = 'block';
                            const errorText = error.response.data.error.errors[0].value
                            showError.textContent = `${errorText} existe deja`
                        }

                        // CHOPER LES DIFFERENTES ERREURS DE MERDE !!!


                    //     // console.log(`la reponse de error ${error.response}`)
                    //     console.log(error.status)
                    //     let notFound = error.response.status
                    //     let noData = error.response.data.error
                    //     // console.log(noData)
                    //     // const erreurMail = error.response.data.value;
                    //     // console.log(erreurMail)
                    //     //erreur champs vide
                    //     if (error.response.data.value === 'Le mot de passe doit comprendre une majuscule et 1 chiffre et doit être de 8 caractères minimum.') {
                    //         showError.style.display = 'block';
                    //         //  const errorText = error.response.data.error.errors[0].value
                    //         showError.textContent = `mettre une adresse mail valude narvalo`
                    //     }
                    //     if (this.firstName == null || this.lastName == null || this.email == null || this.password == null || noData == noData || notFound == 400 && error.response.data.error.errors[0].value == error.response.data.error.errors[0].value)  {

                            
                    //         showError.style.display = 'block';
                    //          const errorText = error.response.data.error.errors[0].value
                    //         showError.textContent = `${errorText} existe deja`
                        
                    //     // erreur double user
                    //     } else if ( notFound == 400 && error.response.data.error.errors[0].value == error.response.data.error.errors[0].value) {
                            
                    //         // const showError = document.getElementById('errorMessage')
                    //         showError.style.display = 'block'
                    //         const errorText = error.response.data.error.errors[0].value
                    //         showError.textContent = `${errorText} existe deja`

                    //     } else if (notFound == 400) {
                    //         console.log(notFound)
                    //      }
                        
                    })
            }
        },
    },
};
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
    #signup {
      text-align: center;
      width: 100%;
    }
    #conteneur {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 40px;
    
    }
    #signup {
      text-align: center;
      width: 50%;
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
    .name{
          width: 80%;
        justify-content: space-around;
        display: flex;
    }
    .create{
        width: 80%;
        justify-content: space-around;
        display: flex;
    }
    #register{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 40px;

    }
    #register input {
        margin-bottom: 30px;
        background-color: transparent;
        font-size: 20px;
        border: 3px solid #fff;
        color: #fff;
        border-radius: 15px;
        height: 40px;
        padding: 5px;
        
    }
      ::placeholder{
        color: #fff;
        font-size: 15px;
        padding: 5px;
    }
    .btn {
        padding: 10px;
        border-radius: 15px;
        font-size: 1.2rem;
        margin-top: 0px;
        background-color: transparent;
        border: 3px solid #fff;
        color: #fff;
    }
    .btn:hover {
        background-color: #42b983;
        border: 3px solid #42b983;
    }
    
</style>