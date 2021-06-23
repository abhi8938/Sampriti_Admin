/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Overview from "../views/Overview";
import Products from "../views/Products";
import Users from "../views/Users";
import Orders from "../views/Orders";
import Stores from "../views/Stores";
import Category from "../views/Category";
import Advertisement from "../views/Advertisement";

const dashboardRoutes = [
    {
        path: "/overview",
        name: "Overview",
        icon: "pe-7s-graph",
        component: Overview,
        layout: "/admin",
    },
    {
        path: "/category",
        name: "Category",
        icon: "pe-7s-helm",
        component: Category,
        layout: "/admin",
    },
    {
        path: "/users",
        name: "Users",
        icon: "pe-7s-user",
        component: Users,
        layout: "/admin",
    },

    {
        path: "/products",
        name: "Products",
        icon: "pe-7s-help2",
        component: Products,
        layout: "/admin",
    },
    {
        path: "/orders",
        name: "Orders",
        icon: "pe-7s-ribbon",
        component: Orders,
        layout: "/admin",
    },
    {
        path: "/advertisement",
        name: "Advertisement",
        icon: "pe-7s-photo",
        component: Advertisement,
        layout: "/admin",
    },
    {
        path: "/stores",
        name: "Stores",
        icon: "pe-7s-shopbag",
        component: Stores,
        layout: "/admin",
    },


];

export default dashboardRoutes;
