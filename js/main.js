


import theRouter from './routes.js'
import appHeader from './general-cmps/header.cmp.js'
import appFooter from './general-cmps/footer.cmp.js'






new Vue({
    router: theRouter,
    el: '#appsus',
    template: `
    <section class="home-page">
    <app-header></app-header>
        <router-view></router-view>
        <app-footer></app-footer>
    </section>
    `,
    components: {
        appHeader,
        appFooter
    }
})