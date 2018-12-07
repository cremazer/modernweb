<template>
  <!--<v-layout justify-center row wrap>-->
    <!--<v-flex xs12 sm6 v-for="user in users" :key="user.id">-->
      <!--<v-card dark raised hover height="100%">-->
        <!--<v-img-->
          <!--src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"-->
          <!--aspect-ratio="2.75"-->
        <!--&gt;</v-img>-->

        <!--<v-card-title primary-title>-->
          <!--<div>-->
            <!--<h3 class="headline mb-0">Kangaroo Valley Safari</h3>-->
            <!--<div>{{ user.msg }}</div>-->
            <!--<dl>-->
              <!--<dt>Name : </dt>-->
              <!--<dd>{{ user.name }}</dd>-->
              <!--<dt>Age : </dt>-->
              <!--<dd>{{ user.age }}</dd>-->
            <!--</dl>-->
          <!--</div>-->
        <!--</v-card-title>-->

        <!--<v-card-actions>-->
          <!--<v-btn flat color="orange">Share</v-btn>-->
          <!--<v-btn flat color="orange">Explore</v-btn>-->
        <!--</v-card-actions>-->
      <!--</v-card>-->
    <!--</v-flex>-->

  <!--</v-layout>-->

  <v-layout justify-center row wrap>
    <v-flex xs12 sm6>
      <v-textarea v-model="getMd"></v-textarea>
      <v-btn v-on:click="getReq">Confirm</v-btn>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea v-model="postMd"></v-textarea>
      <v-btn v-on:click="postReq">Confirm</v-btn>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea v-model="putMd"></v-textarea>
      <v-btn v-on:click="putReq">Confirm</v-btn>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea v-model="delMd"></v-textarea>
      <v-btn v-on:click="delReq">Confirm</v-btn>
    </v-flex>
  </v-layout>

</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: ''
    }
  },
  mounted () {
  //  시작될때
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
        user: 'post man'
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
    }
  }
}
</script>
