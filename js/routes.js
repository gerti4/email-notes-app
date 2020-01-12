'use strict'

import homePage from './general-cmps/home-page.cmp.js'
import aboutPage from './general-cmps/about-page.cmp.js'
import bookApp from './apps/miss-book/pages/book-app.cmp.js'
import bookDetails from './apps/miss-book/pages/book-details.cmp.js'
import emailApp from './apps/mister-email/pages/email-app.cmp.js'
import emailList from './apps/mister-email/cmps/emails-list.cmp.js'
import emailDetails from './apps/mister-email/pages/email-details.cmp.js'
import emailCompose from './apps/mister-email/pages/email-compose.cmp.js'



import keepApp from './apps/miss-keep/pages/keep-app.cmp.js'

const myRoutes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/email',
        component: emailApp,
        children: [
            {
                path: '/',
                component: emailList,
            },
            {
                path: 'draft',
                component: emailList
            },
            {
                path: 'starred',
                component: emailList
            },
            {
                path: 'compose/:id?',
                component: emailCompose,
                children: [
                    {
                        path: 'edit',
                        component: emailCompose
                    }

                ]

            },
            {
                path: ':id',
                component: emailDetails,
            },
        ]
    },
    {
        path: '/notes',
        component: keepApp,
    }


]
const myRouter = new VueRouter({ routes: myRoutes })

export default myRouter;