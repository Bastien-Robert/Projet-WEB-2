const Home = window.httpVueLoader('./components/Home.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')
const Register = window.httpVueLoader('./components/Register.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/connexion', component: Connexion },
  { path: '/register', component: Register },
  { path: '/composants', component: Home},
  { path: '/boutique', component: Home },
  { path: '/avousdejouer', component: Home },
  { path: '/quisommesnous', component: Home },
]

const router = new VueRouter({
  routes
})

var app= new Vue({
    router,
    el: '#app',
    methods:{
        async save(email, password){
          const res = await axios.post('/api/register',{email:email, password:password})
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

