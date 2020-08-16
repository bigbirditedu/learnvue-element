<template>
  <div>
    <h1>美女欣赏</h1>
    <div class="block">
      <span class="demonstration"></span>
      <el-carousel trigger="click" height="800px">
        <el-carousel-item v-for="url in imgs" :key="item">
          <el-image :src="url" fit="contain">
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>

  import mn1 from "../assets/mn1.jpg";
  import mn2 from "../assets/mn2.jpg";
  import mn3 from "../assets/mn3.jpg";
  import mn4 from "../assets/mn4.jpg";
  import mn5 from "../assets/mn5.jpg";
  import mn6 from "../assets/mn6.jpg";
  import mn7 from "../assets/mn7.jpg";

  export default {
    data() {
      return {
        imgs: [mn1, mn2, mn3, mn4, mn5, mn6, mn7]
      }
    }
  }
</script>


<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
