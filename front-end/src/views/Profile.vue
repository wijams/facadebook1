<template>
    <div class="profile">
        <h1>Your Profile</h1>
        <div class="Personal Information">
            <div class="personalForm" v-if="profile.length===0">
                <h2 class="label">Tell Us About Yourself</h2>
                <div class="personalEntry">
                    <input class="shortEntry" v-model="name" placeholder="Name" />
                    <p></p>
                    <input class="shortEntry" v-model="city" placeholder="City" />
                    <p></p>
                    <input class="shortEntry" v-model="age" placeholder="Age" />
                    <p></p>
                </div>
                <p class="pictureLabel"><strong>Upload Your Picture</strong></p>
                <input class="fileSelect" type="file" name="photo" @change="fileChanged" />
                <button class="submit" @click="uploadInfo">Submit Personal Information</button>
            </div>
        </div>
        <div class="personalProfile" v-if="profile.length > 0">
            <img class="profilePic" :src="profile[0].photo" />
            <div class="personalInfo">
                <p>Name: {{profile[0].name}}</p>
                <p>City: {{profile[0].city}}</p>
                <p>Age: {{profile[0].age}}</p>
                <button @click="deleteProfile(profile)">Delete</button>
            </div>
        </div>
        <h1>Your Posts</h1>
        <section class="posts">
            <h3 class="empty" v-if="items.length === 0">You have no posts</h3>
            <div class="post" v-for="item in items" :key="item.id">
                <h2>{{item.title}}</h2>
                <img :src="item.path" />
                <p>{{item.text}}</p>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'ProfileView',
        data() {
            return {
                items: [],
                name: "",
                city: "",
                age: "",
                photo: null,
                addProfile: null,
                profile: [],
            }
        },
        created() {
            this.getItems();
            this.getInfo();
        },
        methods: {
            fileChanged(event) {
                this.file = event.target.files[0]
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
            async uploadInfo() {
                try {
                    const formData = new FormData();
                    formData.append('photo', this.file, this.file.name)
                    let r3 = await axios.post('/api/picture', formData);
                    let r4 = await axios.post('/api/profile', {
                        name: this.name,
                        city: this.city,
                        age: this.age,
                        photo: r3.data.photo
                    });
                    this.$forceUpdate();
                    this.addProfile = r4.data;
                    this.getInfo();
                } catch (error) {
                    console.log(error);
                }
            },
            async getInfo() {
                try {
                    let response = await axios.get("/api/profile");
                    this.profile = response.data;
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteProfile(profile) {
                try {
                    await axios.delete("/api/profile/" + profile[0]._id);
                    this.getInfo();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
        }
    }
</script>

<style scoped>
    img {
        margin-top: 20px;
        width: 150px;
        height: auto;
    }

    h2 {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom: 0.5px solid black;
        background-color: #e1d9ec;
        padding: 20px;
        margin: 0;
    }

    p {
        margin-top: 25px;
        margin-bottom: 20px;
    }

    button {
        margin-bottom: 20px;
    }

    .post, .personalForm {
        text-align: center;
        margin: 10px;
        height: auto;
        border: 0.5px solid black;
        border-radius: 20px;
        margin-bottom: 20px;
    }

    .personalProfile {
        text-align: center;
        margin: 12px;
        height: auto;
    }

    .personalInfo {
        margin-top: 0;
        margin-left: 50px;
        margin-right: 50px;
        border: 0.5px solid black;
        margin-bottom: 20px;
    }

    .personalEntry {
        margin-top: 10px;
    }

    .fileSelect {
        margin-top: 10px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 30px;
    }

    .submit {
        margin-bottom: 20px;
    }

    .profilePic {
        height: 150px;
        border: 5px solid #e1d9ec;
        margin-bottom: 0;
    }

    .empty {
        margin: 20px;
    }

    @media (min-width: 48em) {
        .post, .personalForm {
            margin-left: 500px;
            margin-right: 500px;
        }

        .personalInfo {
            margin-left: 673px;
            margin-right: 673px;
        }
    }
</style>