const connexion = window.httpVueLoader('./components/connexion.vue')
const register = window.httpVueLoader('./components/Register.vue')


const routes = [

    { path: '/connexion', component: connexion },
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

