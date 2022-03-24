<template>
    <div id="app">
        <div class="header">
            <router-link to="/">
                <div class="logo">
                    <img src="masks.png">
                </div>
            </router-link>
            <div class="title">
                <h1>Facade Book</h1>
            </div>
        </div>
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/profile">Profile</router-link>
        </nav>
        <router-view />
        <div class="footer">
            <hr />
            <h3>Git Hub</h3>
            <a href="https://github.com/wijams/facadebook">Git Repo</a>
        </div>
    </div>
</template>

<style>

    * {
        margin: 0;
        box-sizing: border-box;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .header {
        display: flex;
        background-color: #7a52aa;
        width: 100%;
        color: white;
    }

    .logo img {
        width: 100px;
        height: auto;
        padding: 10px;
        margin: 10px;
    }

    .title {
        margin-top: 20px;
    }

        .title h1 {
            margin-left: 10px;
            font-size: 30px;
        }

    nav {
        padding: 30px;
    }

        nav a {
            font-weight: bold;
            color: #2c3e50;
        }

            nav a.router-link-exact-active {
                color: #42b983;
            }
</style>