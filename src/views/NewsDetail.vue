<template>
  <div class="container">
    <h1 class="text-center">ข่าวสาร</h1>
    <div class="mx-auto" style="width: 575px;">
      <img :src="`data:image/png;base64, ${news.picture}`" alt="Phi Phi Islands" width="600" height="500">
    </div>

    <h4 class="text-center" style="margin: 30px;"><b>{{ news.topic }}</b></h4>

    <p class="text-center">{{ news.content }}</p>
  </div>
</template>
<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      news: {
        id: 0,
        topic: '',
        content: '',
        picture: '',
        createdAt: '',
      }
    }
  },
  async mounted() {
    await this.getNew();
  },
  methods: {
    async getNew() {
      try {
        const id = this.$route.params.newId;
        const { data } = await axios.post('http://localhost:8000/api/v1/news/getNewById', {
          newId: id,
        })
        this.news = data.result;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>