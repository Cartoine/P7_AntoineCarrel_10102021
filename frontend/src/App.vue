<template>
    <div id="app">
        <vue-confirm-dialog></vue-confirm-dialog>
        <NavBar/>
        <router-view />
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
    name: "app",
    components: {
        NavBar,
    }
};
</script>

<style>
#app {
     font-family: Avenir, Helvetica, Arial, sans-serif;

}
body{
  background-color:#2c3e50;
}

</style>