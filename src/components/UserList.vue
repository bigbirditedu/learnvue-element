<template>
  <div>
    <el-table
      :height="300"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="用户id"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="年龄"
        width="180"
        prop="age">
      </el-table-column>

      <el-table-column
        label="邮箱"
        width="180"
        prop="email">
      </el-table-column>

      <el-table-column
        label="性别"
        width="180"
        prop="sex">
      </el-table-column>

      <el-table-column
        label="生日"
        width="180"
        prop="birthday">
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入姓名关键字过滤"/>
        </template>

        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-row>
      <el-col :span="12" :offset="6">
        <el-pagination style="margin: 20px 0px;"
                       layout="prev, pager, next, jumper, ->, total,sizes"
                       background
                       :page-size="pageSize"
                       :current-page="pageNow"
                       :page-sizes="[1,2,5,10,50,100]"
                       @current-change="pageChange"
                       @size-change="sizeChange"
                       :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <el-button style="margin: 10px 0px;" type="success" size="mini" @click="addUser">新增</el-button>

    <!--表单组件-->
    <transition name="el-fade-in-linear">
      <div v-show="show" class="transition-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                 label-suffix=":">
          <el-form-item label="姓名" prop="name">
            <el-col :span="10">
              <el-input v-model="ruleForm.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-col :span="10">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="10">
              <el-form-item prop="birthday">
                <el-date-picker type="date" placeholder="选择生日" v-model="ruleForm.birthday"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-col :span="10">
              <el-input v-model="ruleForm.email"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-col :span="10">
              <el-input v-model="ruleForm.address"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {id: 1, name: '王哥', age: 88, email: 'zpca@123.com', birthday: '2011-11-22', address: '南京市栖霞区'},
          {id: 1, name: '鸟哥', age: 11, email: 'hahha@123.com', birthday: '2011-12-01', address: '南京市浦口区'}
        ],
        search: '',
        show: false,
        ruleForm: {
          name: '',
          age: '',
          sex: '',
          birthday: '',
          email: '',
          address: ''
        },
        total: 0,
        pageSize: 5,
        pageNow: 1,
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          birthday: [
            {required: true, message: '请选择正确的日期', trigger: 'blur'}
          ],
          age: [
            {required: true, message: '请输入年龄', trigger: 'blur'},
            { type: 'number', message: '年龄必须为数字值'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
        },
      };
    },
    methods: {
      addUser() {
        this.show = true;
        this.ruleForm = {sex: '男'};
      },
      handleEdit(index, row) {
        console.log(row);
        this.show = true;
        this.ruleForm = row;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get("http://127.0.0.1:8888/user/delete?id=" + row.id).then(res => {
            if (res.data.success) {
              this.$message({
                message: res.data.retMsg,
                type: 'success'
              });
              this.findAll();//刷新数据
            } else {
              this.$message.error(res.data.retMsg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post("http://127.0.0.1:8888/user/addOrUpdate", this.ruleForm).then(res => {
              console.log(res.data);
              if (res.data.success) {
                this.$message({
                  message: res.data.retMsg,
                  type: 'success'
                });
                this.ruleForm = {sex: '男'};
                this.show = false;
                this.findAll();
              } else {
                this.$message.error(res.data.retMsg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.ruleForm = {sex: '男'};
      },

      findAll(page, size) {
        page = page ? page : this.pageNow, size = size ? size : this.pageSize;
        this.$http.get("http://127.0.0.1:8888/user/findAllByPage?pageNo=" + this.pageNow + "&pageSize=" + this.pageSize).then(res => {
          this.tableData = res.data.users;
          this.total = res.data.total;
        });
      },

      pageChange(page) {
        this.pageNow = page;
        this.findAll(page, this.pageSize);
      },

      sizeChange(size) {
        this.pageSize = size;
        this.findAll(this.pageNow, size);
      }
    },

    created() {
      this.findAll();
    }
  }
</script>


<style>
  .transition-box {
    margin-bottom: 10px;
    width: 100%;
    height: 600px;
    border-radius: 4px;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
