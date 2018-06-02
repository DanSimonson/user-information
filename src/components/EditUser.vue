<template>
    <div v-if='user' class="edit-user container">
        <!--<h2>Edit User {{ this.$route.params.user_id }}</h2>-->
        <h2>Edit User</h2>
        <form @submit.prevent="editUser">
            <div class="field title">
                <label for="name">User Name:</label>
                <input type="text" name="title" v-model="user.name">
            </div>
            <div class="field title">
                <label for="email">User Email:</label>
                <input type="text" name="email" v-model="user.email">
            </div>

            <div class=" field center-align ">
                <p v-if="feedback" class="red-text"> {{ feedback }} </p>
                <button class="btn green">Update User</button>
            </div>
        </form>

    </div>
</template>
<script>
    import db from '@/firebase/init'

    export default {
        name: 'EditUser',
        data() {
            return {
                user: null,
                another: '',
                feedback: ''
                /*user: [],
                id: '',
                name: '',
                email: ''*/

            }
        },
        created() {
            //console.log(this.$route.params.user_id)
            let ref = db.collection('Customers').where('id', '==', this.$route.params.user_id)
            ref.get().then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.data())
                    this.user = doc.data()
                    //console.log(this.user.id)
                })
            })
        },
        methods: {
            editUser() {
                //console.log(this.user.name, this.user.email)
                db.collection('Customers').doc(user.id).update({
                    name: this.user.name,
                    email: this.user.email,
                    id: this.user.id
                }).then(() => {
                    this.$router.push({ name: 'Customer' })
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }

</script>
<style>
    i {
        display: inline-block;
    }

    i:hover {
        cursor: pointer;
    }

    .edit-user {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .edit-user h2 {
        font-size: 2em;
        margin: 20px auto;
    }

    .edit-user .field {
        margin: 20px auto;
        position: relative;
    }
</style>