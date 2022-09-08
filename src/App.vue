<template>
  <v-app>
    <v-main>
      <loginForm />
      <popUp />
    </v-main>
  </v-app>
</template>

<script>
//  import loginForm from './components/loginForm.vue'
  import popUp from './components/popUp.vue';
  export default{ 
    name : 'App',
    components:{popUp}
  }
</script>

