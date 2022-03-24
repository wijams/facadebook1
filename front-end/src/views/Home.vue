<template>
    <div class="home">
        <h1>Home</h1>
        <div class="post">
            <div class="form">
                <h3 class="label">Write a Post</h3>
                <input class="title" v-model="title" placeholder="Post title" />
                <p></p>
                <input class="fileSelect" type="file" name="photo" @change="fileChanged" />
                <br />
                <textarea v-model="text" placeholder="Share your thoughts..." />
                <button @click="upload">Post</button>
            </div>
        </div>
        <div class="form">
            <div class="edit">
                <h3 class="label">Edit a Post</h3>
                <div class="upload" v-if="findItem">
                    <img :src="findItem.path" />
                    <p>{{findItem.text}}</p>
                    <input v-model="findItem.title">
                    <p></p>
                    <textarea v-model="findItem.text" />
                </div>
                <div class="actions" v-if="findItem">
                    <button @click="editItem(findItem)">Edit</button>
                    <button @click="deleteItem(findItem)">Delete</button>
                </div>
                <hr />
                <input class="search" v-model="findTitle" placeholder="Search">
                <div class="suggestions" v-if="suggestions.length > 0">
                    <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">
                        {{s.title}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'HomeView',
        data() {
            return {
                title: "",
                file: null,
                text: "",
                addItem: null,
                items: [],
                findTitle: "",
                findItem: null,
            }
        },
        computed: {
            suggestions() {
                let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
                return items.sort((a, b) => a.title > b.title);
            }
        },
        created() {
            this.getItems();
        },
        methods: {
            fileChanged(event) {
                this.file = event.target.files[0]
            },
            async upload() {
                try {
                    const formData = new FormData();
                    formData.append('photo', this.file, this.file.name)
                    let r1 = await axios.post('/api/photos', formData);
                    let r2 = await axios.post('/api/items', {
                        title: this.title,
                        text: this.text,
                        path: r1.data.path
                    });
                    this.addItem = r2.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async getItems() {
                try {
                    let response = await axios.get("/api/items");
                    this.items = response.data;
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            selectItem(item) {
                this.findTitle = "";
                this.findItem = item;
            },
            async deleteItem(item) {
                try {
                    await axios.delete("/api/items/" + item._id);
                    this.findItem = null;
                    this.getItems();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async editItem(item) {
                try {
                    await axios.put("/api/items/" + item._id, {
                        title: this.findItem.title,
                        text: this.findItem.text,
                    });
                    this.findItem = null;
                    this.getItems();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
        }
}
</script>

<style scoped>

    p {
        margin: 10px;
    }

    img {
        margin-top: 20px;
        width: 150px;
    }

    textarea {
        width: 90%;
        height: 25%;
    }

    button {
        margin: 10px;
    }

    .title {
        margin: 0;
        margin-top: 10px;
    }

    .fileSelect {
        margin-top: 25px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 30px;
    }

    .shortEntry {
        margin-top: 5px;
    }

    .search {
        margin-top: 10px;
    }

    .form {
        text-align: center;
        margin: 10px;
        height: auto;
        border: 0.5px solid black;
        border-radius: 20px;
        margin-bottom: 20px;
    }

    .label {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom: 0.5px solid black;
        background-color: #e1d9ec;
        padding: 20px;
        margin: 0;
    }

    .pictureLabel {
        margin: 0;
        margin-top: 25px;
        margin-bottom: 5px;
    }

    .suggestions {
        margin-left: 40px;
        margin-right: 40px;
        border: 1px solid #ccc;
    }

    .suggestion {
        min-height: 20px;
    }

        .suggestion:hover {
            background-color: #5BDEFF;
            color: #fff;
        }

    .edit {
        margin-bottom: 10px;
    }

    @media (min-width: 48em) {
        .form {
            margin-right: 500px;
            margin-left: 500px;
        }

        .suggestions {
            margin-left: 182px;
            margin-right: 182px;
        }
    }
</style>