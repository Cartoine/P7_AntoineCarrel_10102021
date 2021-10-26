<template>
  <div id="profile">
    <div class="userProfilContent">
      <div class="selectPicture">
         <img v-bind:src="dataUser.photo" class="userPicture">
         <label id="img-profile">
              <div role="button" aria-label="Téléchargement d'un fichier">
                  <span v-if="newUserData.photo">Fichier séléctionné : {{newUserData.photo.name}}</span>
                  <span class="ajout" v-else >Ajouter un fichier </span>
              </div>
              <input class="fichier" type="file" ref="photo" v-on:change="handleFileUpload()"/>
          </label>
      </div>
      <div class="userData">
        <div class="userInfo">
          <input  type="text" placeholder="First-name" aria-label="Prénom de l'utilisateur" v-model="dataUser.firstName"/>
          <input  type="text" placeholder="Last-name" aria-label="Nom de famille de l'utilisateur" v-model="dataUser.lastName"/>
          <input  type="email" aria-label="Email de l'utilisateur" placeholder="name@example.com" v-model="dataUser.email"/>
        </div>
          <div id="btnContainer">
              <div>
                  <button class="maj" type="submit" aria-label="Modifier les informations utilisateur" @click.prevent="updateUserInformations">Mettre à jour les informations</button>
              </div>
              <div>
                  <button class="sup" type="submit" aria-label="Supprimer l'utilisateur" @click.prevent="deleteUser">Supprimer le compte</button>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
    name: 'account',  
    data() {
        return {
          cookie: this.$cookies.get("token"),
          dataUser: {
              firstName: '',
              lastName: '',
              email: '',
              photo: ''
          },
          newUserData: {
            photo: null
          }
        };
    },
    created() {
      axios
        .get("http://localhost:3000/api/users/me", {
          headers: { Authorization: "Bearer " + this.cookie }
        })
        .then(response => {
          console.log(response.data);
          this.dataUser = response.data.user;
        })
    },
    methods: {
        updateUserInformations() {
          console.log(this.newUserData.photo);
          if (this.newUserData.photo !== null) {
            console.log('non null');
            let formData = new FormData();
            formData.append('email', this.dataUser.email);
            formData.append('firstName', this.dataUser.firstName);
            formData.append('lastName', this.dataUser.lastName);
            formData.append('photo', this.newUserData.photo, this.newUserData.photo.name);
            axios
              .put('http://localhost:3000/api/users/me',
                    formData,
                    {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: "Bearer " + this.cookie
                    },
                  }
                ).then(() => {
                  console.log('Image téléchargée !');
                  this.$router.go();
              })
              .catch(error =>
                console.log(error)
              );
            } else {
              console.log('null');
              let formData = new FormData();
              formData.append('email', this.dataUser.email);
              formData.append('firstName', this.dataUser.firstName);
              formData.append('lastName', this.dataUser.lastName);
              formData.append('photo', this.dataUser.photo);
              axios
                .put('http://localhost:3000/api/users/me',
                      formData,
                      {
                      headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: "Bearer " + this.cookie
                      },
                    }
                  ).then(() => {
                    console.log('Image téléchargée !');
                    this.$router.go();
                })
                .catch(error =>
                  console.log(error)
                );
            }
          },
        loadUser() {
          axios
            .get("http://localhost:3000/api/users/me", {
              headers: { Authorization: "Bearer " + this.cookie }
            })
            .then(response => {
              console.log(response.data);
              this.dataUser = response.data.user;
            })
        },
        handleFileUpload(){
          this.newUserData.photo = this.$refs.photo.files[0];
        },
        deleteUser() {
            this.$confirm(
                {
                    message: `Êtes-vous sur de vouloir supprimer votre compte ?`,
                    button: {
                        no: 'No',
                        yes: 'Yes'
                    },
                    callback: confirm => {
                        if (confirm) {
                        const id = this.dataUser.id;
                        axios
                            .delete('http://localhost:3000/api/users/' + id, {
                            headers: { Authorization: "Bearer " + this.cookie }
                            })
                            .then(response => {
                            console.log(response.data);
                            this.$cookies.remove("token");
                            this.$router.push("/signup");
                            })
                            .catch(error => console.log(error))
                        }
                    }
                }
            )
        },
    },
};
</script>

<style>
.userPicture {
  width: 250px;
  border-radius: 10px;
  border: 4px inset rgba(44,62,80,0.12);
}

.selectPicture{
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#profile {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.userProfilContent {
  width: 50%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  border: 4px inset rgba(44,62,80,0.12);
}

.userData {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.userInfo input {
  background-color: #2c3e50;
  border: 4px inset rgba(29, 41, 53, 0.644);
  border-radius: 20px;
  color: #fff;
  height: 40px;
  width: 30%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  padding-left: 10px;

}

#btnContainer{
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.maj{
  color: #fff;
  height: 50px;
  width: 350px;
  background-color: #2c3e50;
  border: 2px inset rgba(44,62,80,0.12);
  border-radius: 20px;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
}
.maj:hover {
  background-color: #42b983;
}

.sup {
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
.sup:hover{
  color: red;
}

@media screen and (max-width: 875px){
      .userPicture {
      width: 90%;
      
    }

      .userProfilContent {
      width: 100%;
      background-color: #fff;
      padding: 20px;
      margin: 30px;
      border-radius: 10px;
      border: 4px inset rgba(44,62,80,0.12);
    }

    .userInfo {
      margin-top: 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
        
    .userInfo input {
      margin: 10px;
      width: 50%;
    }

    #btnContainer {
      display: flex;
       flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }

</style>