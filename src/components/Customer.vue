<template>
  <div>
    <h3>Add User</h3>
    <div class="card users_add-user">
      <div>
        <input v-model="addUserData.id" class="validate" placeholder="id">
      </div>
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
    <div v-for="user in sortedUsers" :key="user.id" class="collection">

      <div v else class="collection-item users_list-item">
        <div> {{ user.id }}</div>
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
          id: '',
          name: '',
          email: ''
        },
        editId: '',
        editUserData: {
          id: '',
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
    computed: {
      sortedUsers() {
        return this.users.slice().sort((a, b) => {
          return a.id - b.id
        })
      }
    },
    methods: {
      deleteUser(id) {
        // delete doc from firestore
        db.collection('Customers').where('id', '==', id).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete().then(this.getUsers)
          })
        })
      },
      addUser() {
        db.collection('Customers').add(this.addUserData).then(this.getUsers)
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