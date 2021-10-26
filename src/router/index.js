import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Generation from "../views/generation/_id.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/generation/:id",
    name: "Generation",
    component: Generation,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
