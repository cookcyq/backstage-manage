<template>
  <div class="complete">
    <el-table :data="data" style="width: 100%" stripe empty-text=" ">
      <el-table-column prop="date" label="时间" width="180"></el-table-column>
      <el-table-column prop="name" label="作者" width="180"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="id" label="编号"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
  data() {
    return {
      data: []
    }
  },
  created: function() {
    this.complete()
  },
  methods: {
    complete: function() {
      request('/a')
        .then(res => {
          this.data = res.data.data
        })
        .catch(err => {
          console.log('响应报错了 + ' + err)
        })
    }
  }
}
</script>