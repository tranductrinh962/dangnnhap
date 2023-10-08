<template>
  <div id="home">
    <div id="login-form">
      <!-- ... -->
      <div class="login-butto" @click="logout">
        Đăng xuất
      </div>
      <p class="footer">
        Xin chào {{ username }}, id của bạn là {{ userId }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      username: "",
      userId: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    const isAuthenticated = localStorage.getItem("username") !== null;
    if (!isAuthenticated) {
      next("/login"); // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
    } else {
      next(); // Tiếp tục hiển thị trang Home nếu đã đăng nhập
    }
  },
  created() {
    // Kiểm tra trạng thái đăng nhập và lấy thông tin người dùng nếu đã đăng nhập
    this.checkLoginStatus();
  },
  methods: {
    async checkLoginStatus() {
      const isAuthenticated = localStorage.getItem("username") !== null;
      if (isAuthenticated) {
        // Lấy thông tin đăng nhập từ Local Storage
        this.username = localStorage.getItem("username");
        this.userId = localStorage.getItem("userId");
      }
    },
    logout() {
      // Xóa thông tin đăng nhập từ Local Storage và chuyển hướng đến trang đăng nhập
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Đảm bảo trang Home chiếm toàn bộ chiều cao của viewport */
}

#login-form {
  /* ... */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-butto {
  
  margin-top: 20px; /* Khoảng cách giữa nút đăng xuất và phần hiển thị */
  background-color: var(--Green, #00bf6f);
  color: var(--light-text-active, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  padding: 15px 30px;
  border-radius: 40px;
  cursor: pointer;
}

.login-butto:hover {
  background-color: #009e58; /* Màu khi hover */
}

</style>