import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import UserList from "../components/UserList";
import Products from "../components/Products";


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    {path: '/users', component: UserList},
    {path: '/products', component: Products},
  ]
})
