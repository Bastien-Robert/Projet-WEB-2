const Home = window.httpVueLoader('./components/Home.vue')
const Connexion = window.httpVueLoader('./components/connexion.vue')
const Register = window.httpVueLoader('./components/Register.vue')


const routes = [
  { path: '/', component: Home },
  { path: '/connexion', component: Connexion },
  { path: '/Register', component: Register },
]

const router = new VueRouter({
  routes
})

var app= new Vue({

    router,
    el: '#app',


    methods:{
        async save(email, password){
          const res = await axios.post('/api/Register',{email:email, password:password})
          window.location.href="#/"
        },
    
        async logUser(email, password){
          try {
            const res = await axios.post('/api/connexion',{email:email, password:password})
            window.location.href="#/"
    
          } catch (error) {
            alert("identifiants incorrects")
          }      
        }
    }
})

