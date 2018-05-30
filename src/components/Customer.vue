<template>
  <div>
    <h3>Add User</h3>
    <div class="card users_add-user">
      <div>
        <input v-model="addUserData.name" class="validate" placeholder="name">
      </div>
      <div>
        <input v-model="addUserData.email" class="validate" placeholder="email">
      </div>
      <div>
        <i @click="addUser" class="material-icons medium">add</i>
      </div>
    </div>
    <h3> I am a user</h3>
    <div v-for="user in users" :key="user.id" class="collection">
      <div class="collection-item users_list-item">
        <div> {{ user.name }} </div>
        <div> {{ user.email }}</div>
        <div>
          <i @click="deleteUser(user.id)" class="material-icons">delete</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase/init'
  export default {
    name: 'Customer',
    data() {
      return {
        users: [],
        addUserData: {
          name: '',
          email: ''
        }
      }
    },
    created() {
      this.getUsers()
      /*db.collection('Customers').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.users.push(doc.data())
        })
      })*/
    },
    methods: {
      deleteUser(id) {
        console.log(id)
        // delete doc from firestore
        db.collection('Customers').doc(id).delete()
          .then(() => {
            this.users = this.users.filter(user => {
              return user.id != id
            })
          }).catch(err => {
            console.log(err)
          })
      },
      addUser() {
        db.collection('Customers').add(this.addUserData).then(this.getUsers)
        /*db.collection('Customers').add(this.addUserData).then(db.collection('Customers').get().then(querySnapshot => {
          const users = []
          querySnapshot.forEach(doc => {
            users.push(doc.data())
          })
          this.users = users
        }))*/
      },
      getUsers() {
        db.collection('Customers').get().then(querySnapshot => {
          const users = []
          querySnapshot.forEach(doc => {
            users.push(doc.data())
          })
          this.users = users
        })
      }
    }
  }



  /* created() { db.collection('Customers').get().then( querySnapshot => { querySnapshot.forEach(doc => { this.users.push(doc.data())
}) }) } 
getUsers() { db.collection('Customers').get().then( querySnapshot => { querySnapshot.forEach(doc => { this.users.push(doc.data())
}) }) }, addUser() { db.collection("Customers").add(this.addUserData).then(this.getUsers) } 
getUsers() { db.collection('Customers').get().then(querySnapshot
=> { querySnapshot.forEach(doc => { //console.log(doc.data()) const users = [] this.users.push(doc.data()) }) this.users
= users }) }, addUser() { //db.collection("Customers").add(this.addUserData).then(this.getUsers) } /*deleteUser(user_id)
{ db.collection('Customers').where('user_id', '==', 'user_id').get().then(querySnapshot => { querySnapshot.forEach(doc =>
{ doc.ref.delete().then(this.getUsers()) }) })*/

</script>

<style>
  .users_list-item {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .users_add-user {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .material-icons {
    cursor: pointer;
  }
</style>