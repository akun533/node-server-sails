<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { User } from "@element-plus/icons-vue";
import { encryptPassword } from "@/utils/crypto";

defineOptions({
  name: "UserManagement"
});

// 用户数据类型
interface User {
  id: number;
  username: string;
  email: string;
  realName?: string;
  phone?: string;
  gender: number;
  role: string;
  avatar?: string;
  status: number;
  lastLoginAt?: number;
  lastLoginIp?: string;
  remark?: string;
  createdAt: number;
  updatedAt: number;
}

// 表格数据
const tableData = ref<User[]>([]);
const loading = ref(false);
const total = ref(0);

// 分页参数
const pagination = ref({
  page: 1,
  pageSize: 10
});

// 搜索表单
const searchForm = ref({
  username: "",
  email: "",
  status: undefined as number | undefined
});

// 抽屉
const drawerVisible = ref(false);
const drawerTitle = ref("添加用户");
const dialogForm = ref<Partial<User>>({
  username: "",
  email: "",
  password: "",
  realName: "",
  phone: "",
  gender: 0,
  role: "tenant",
  avatar: "",
  status: 1,
  remark: ""
});

// 表单验证规则
const formRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能少于6位", trigger: "blur" }
  ]
};

// 性别选项
const genderOptions = [
  { label: "未知", value: 0 },
  { label: "男", value: 1 },
  { label: "女", value: 2 }
];

// 状态选项
const statusOptions = [
  { label: "禁用", value: 0 },
  { label: "正常", value: 1 }
];

// 角色选项
const roleOptions = [
  { label: "管理员", value: "admin" },
  { label: "租户", value: "tenant" }
];

// 是否修改密码
const changePassword = ref(false);

// 头像上传相关
const avatarUrl = ref("");
const handleAvatarChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  // 验证文件类型
  if (!file.type.startsWith("image/")) {
    ElMessage.error("请上传图片文件");
    return;
  }

  // 验证文件大小（限制2MB）
  if (file.size > 2 * 1024 * 1024) {
    ElMessage.error("图片大小不能超过2MB");
    return;
  }

  // 读取文件并转换为base64
  const reader = new FileReader();
  reader.onload = e => {
    const base64 = e.target?.result as string;
    dialogForm.value.avatar = base64;
    avatarUrl.value = base64;
  };
  reader.readAsDataURL(file);
};

// 获取用户列表
const getUserList = async () => {
  loading.value = true;
  try {
    // 构建查询参数，过滤掉空值和undefined
    const params: any = {
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    };

    // 只添加有值的搜索条件
    if (searchForm.value.username) {
      params.username = searchForm.value.username;
    }
    if (searchForm.value.email) {
      params.email = searchForm.value.email;
    }
    if (
      searchForm.value.status !== undefined &&
      searchForm.value.status !== null
    ) {
      params.status = searchForm.value.status;
    }

    const response = await fetch(`/api/users?${new URLSearchParams(params)}`);
    const result = await response.json();

    if (result.success) {
      tableData.value = result.data.list;
      total.value = result.data.total;
    } else {
      ElMessage.error(result.message || "获取用户列表失败");
    }
  } catch (error) {
    ElMessage.error("获取用户列表失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// 搜索
const handleSearch = () => {
  pagination.value.page = 1;
  getUserList();
};

// 重置搜索
const handleReset = () => {
  searchForm.value = {
    username: "",
    email: "",
    status: undefined
  };
  handleSearch();
};

// 打开添加抽屉
const handleAdd = () => {
  drawerTitle.value = "添加用户";
  dialogForm.value = {
    username: "",
    email: "",
    password: "",
    realName: "",
    phone: "",
    gender: 0,
    role: "tenant",
    avatar: "",
    status: 1,
    remark: ""
  };
  avatarUrl.value = "";
  drawerVisible.value = true;
};

// 打开编辑抽屉
const handleEdit = (row: User) => {
  drawerTitle.value = "编辑用户";
  dialogForm.value = { ...row };
  delete dialogForm.value.password; // 编辑时不显示密码
  avatarUrl.value = row.avatar || ""; // 回显头像
  changePassword.value = false; // 重置修改密码状态
  drawerVisible.value = true;
};

// 保存用户
const handleSave = async () => {
  try {
    const url = dialogForm.value.id
      ? `/api/users/${dialogForm.value.id}`
      : "/api/users";
    const method = dialogForm.value.id ? "PUT" : "POST";

    // 构建请求数据，如果有密码则加密
    const requestData = { ...dialogForm.value };

    // 编辑时，如果不修改密码，则删除password字段
    if (dialogForm.value.id && !changePassword.value) {
      delete requestData.password;
    }

    // 如果有密码则加密
    if (requestData.password) {
      requestData.password = encryptPassword(requestData.password);
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });

    const result = await response.json();

    if (result.success) {
      ElMessage.success(result.message || "操作成功");
      drawerVisible.value = false;
      getUserList();
    } else {
      ElMessage.error(result.message || "操作失败");
    }
  } catch (error) {
    ElMessage.error("操作失败");
    console.error(error);
  }
};

// 删除用户
const handleDelete = async (row: User) => {
  try {
    await ElMessageBox.confirm("确定要删除该用户吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });

    const response = await fetch(`/api/users/${row.id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (result.success) {
      ElMessage.success(result.message || "删除成功");
      getUserList();
    } else {
      ElMessage.error(result.message || "删除失败");
    }
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
      console.error(error);
    }
  }
};

// 分页变化
const handlePageChange = (page: number) => {
  pagination.value.page = page;
  getUserList();
};

const handleSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.page = 1;
  getUserList();
};

// 格式化日期
const formatDate = (timestamp: number) => {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleString("zh-CN");
};

// 格式化性别
const formatGender = (gender: number) => {
  const option = genderOptions.find(item => item.value === gender);
  return option ? option.label : "未知";
};

// 格式化状态
const formatStatus = (status: number) => {
  return status === 1 ? "正常" : "禁用";
};

// 格式化角色
const formatRole = (role: string) => {
  return role === "admin" ? "管理员" : "租户";
};

// 初始化
onMounted(() => {
  getUserList();
});
</script>

<template>
  <div class="user-management">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="用户名">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="searchForm.email"
            placeholder="请输入邮箱"
            clearable
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="success" @click="handleAdd">添加用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格 -->
    <el-card class="table-card">
      <el-table v-loading="loading" :data="tableData" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="头像" width="80">
          <template #default="{ row }">
            <el-avatar v-if="row.avatar" :src="row.avatar" :size="40" />
            <el-avatar v-else :size="40">
              <el-icon><User /></el-icon>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="realName" label="真实姓名" width="120" />
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column label="性别" width="80">
          <template #default="{ row }">
            {{ formatGender(row.gender) }}
          </template>
        </el-table-column>
        <el-table-column label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'warning' : 'info'">
              {{ formatRole(row.role) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ formatStatus(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.lastLoginAt) }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button link type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 20px"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </el-card>

    <!-- 添加/编辑抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      :title="drawerTitle"
      direction="rtl"
      size="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="dialogForm" :rules="formRules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dialogForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialogForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <!-- 新增用户时显示密码输入 -->
        <el-form-item v-if="!dialogForm.id" label="密码" prop="password">
          <el-input
            v-model="dialogForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <!-- 编辑用户时显示修改密码选项 -->
        <template v-if="dialogForm.id">
          <el-form-item label="修改密码">
            <el-switch v-model="changePassword" />
          </el-form-item>
          <el-form-item v-if="changePassword" label="新密码" prop="password">
            <el-input
              v-model="dialogForm.password"
              type="password"
              placeholder="请输入新密码"
            />
          </el-form-item>
        </template>
        <el-form-item label="真实姓名">
          <el-input
            v-model="dialogForm.realName"
            placeholder="请输入真实姓名"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="dialogForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="dialogForm.gender" placeholder="请选择性别">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="dialogForm.role" placeholder="请选择角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <div class="avatar-upload">
            <el-avatar
              v-if="avatarUrl"
              :src="avatarUrl"
              :size="100"
              style="margin-bottom: 10px"
            />
            <el-avatar v-else :size="100" style="margin-bottom: 10px">
              <el-icon><User /></el-icon>
            </el-avatar>
            <input
              type="file"
              style="display: block; margin-top: 10px"
              @change="handleAvatarChange"
            />
            <div class="avatar-tip">支持jpg/png，大小不超过2MB</div>
          </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="dialogForm.status" placeholder="请选择状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="dialogForm.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="display: flex; gap: 10px; justify-content: flex-end">
          <el-button @click="drawerVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.user-management {
  padding: 20px;

  .search-card {
    margin-bottom: 20px;
  }

  .table-card {
    :deep(.el-pagination) {
      display: flex;
    }
  }

  .avatar-upload {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .avatar-tip {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
