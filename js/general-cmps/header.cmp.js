'use strict'

export default {
    template: `
   
    <header>
    <div class="main-header">
    <h2 class="logo">APPSUS</h2>
    <button @click="toggleMenu" class="main-nav-btn">☰</button>
    <nav v-show="isMenu">
        <router-link to="/" class="main-nav-a" exact @click.native="toggleMenu">Home</router-link> 
        <router-link to="/email" class="main-nav-a" @click.native="toggleMenu">Email</router-link> 
        <router-link to="/notes" class="main-nav-a" @click.native="toggleMenu">Notes</router-link> 
        <router-link to="/book" class="main-nav-a" @click.native="toggleMenu">Books</router-link> 
        <router-link to="/about" class="main-nav-a" @click.native="toggleMenu">About</router-link> 
    </nav>
    </div>
    </header>
    `,
    data() {
        return {
            isMenu: false,
        }
    },
    methods: {
        toggleMenu() {
            if (window.innerWidth > 630) return
            this.isMenu = !this.isMenu

        }
    },
    created() {
        if (window.innerWidth > 630) this.isMenu = true
    },
}
