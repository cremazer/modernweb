<template>
  <v-layout justify-center row wrap>
    <!--<v-flex xs12 sm6>-->
      <!--<v-textarea v-model="getMd"></v-textarea>-->
      <!--<v-btn v-on:click="getReq">Confirm</v-btn>-->
    <!--</v-flex>-->
    <!--<v-flex xs12 sm6>-->
      <!--<v-textarea v-model="postMd"></v-textarea>-->
      <!--<v-btn v-on:click="postReq">Confirm</v-btn>-->
    <!--</v-flex>-->
    <!--<v-flex xs12 sm6>-->
      <!--<v-textarea v-model="putMd"></v-textarea>-->
      <!--<v-btn v-on:click="putReq">Confirm</v-btn>-->
    <!--</v-flex>-->
    <!--<v-flex xs12 sm6>-->
      <!--<v-textarea v-model="delMd"></v-textarea>-->
      <!--<v-btn v-on:click="delReq">Confirm</v-btn>-->
    <!--</v-flex>-->
    {{ users }}
    <v-flex xs12 sm6 md4 v-for="user in users" :key="user.id">
      <dl>
        <dt>{{ user.name }}</dt>
        <dd>{{ user.age }}</dd>
      </dl>
      <div>
        <v-btn flat color="orange" v-on:click="putDialog(user)">수정</v-btn>
        <v-btn flat color="error" v-on:click="delUser(user._id)">삭제</v-btn>
      </div>
    </v-flex>

    <v-btn
      fab
      color="pink accent-2"
      bottom
      right
      absolute
      @click="addData"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!--<v-btn slot="activator" color="primary" dark>Add Data</v-btn>-->
      <v-card>
        <v-card-title>
          <span class="headline">Users Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Legal first name*" v-model="userName" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="userAges"
                  label="Age*"
                  required
                  v-model="userAge"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="putUser">Put</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="postUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--<v-btn-->
      <!--block-->
      <!--color="primary"-->
      <!--dark-->
      <!--@click="snackbar = true"-->
    <!--&gt;-->
      <!--Show Snackbar-->
    <!--</v-btn>-->
    <v-snackbar
      v-model="snackbar"
      top
      right
      :timeout=2000
    >
      {{ sbMsg }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

  </v-layout>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      dialog: false,
      snackbar: false,
      users: [],
      userName: '',
      userAge: 0,
      userAges: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: '',
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
  //  시작될때
    for (let i = 10; i < 40; i++) this.userAges.push(i)
    this.getUsers()
  },
  methods: {
    getReq () {
      axios.get('http://localhost:3000/api/user', {
        user: 'get man'
      })
        .then((r) => {
          this.getMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    postReq () {
      axios.post('http://localhost:3000/api/user', {
        // user: 'post man'
        name: 'rkwjd', age: 77
      })
        .then((r) => {
          this.postMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    putReq () {
      axios.put('http://localhost:3000/api/user', {
        user: 'put man'
      })
        .then((r) => {
          this.putMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    delReq () {
      axios.delete('http://localhost:3000/api/user', {
        user: 'del man'
      })
        .then((r) => {
          this.delMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    addData () {
      this.userName = ''
      this.userAge = ''
      this.dialog = !this.dialog
    },
    postUser () {
      // console.log(this.userName, this.userAge)
      this.dialog = false
      // this.pop(this.userName)
      axios.post('http://localhost:3000/api/user', {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          this.pop('등록 완료!')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
          // console.error(e.message)
        })
    },
    getUsers () {
      axios.get('http://localhost:3000/api/user')
        .then((r) => {
          // console.log(r.data)
          this.users = r.data.users
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    putDialog (user) {
      this.putId = user._id
      this.dialog = true
      this.userName = user.name
      this.userAge = user.age
    },
    putUser (id) {
      this.dialog = false
      axios.put(`http://localhost:3000/api/user/${this.putId}`, {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          this.pop('수정 완료!')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    delUser (id) {
      axios.delete(`http://localhost:3000/api/user/${id}`)
        .then((r) => {
          this.pop('삭제 완료!')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}
</script>
