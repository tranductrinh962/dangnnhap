<script>
import { Post } from "../utils/api.js";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
  if (this.username && this.password) {
    const response = await Post("login", {
      username: this.username,
      password: this.password,
    });

    if (Array.isArray(response) && response.length > 0) {
      // Đăng nhập thành công, bạn có thể thực hiện các hành động sau, ví dụ: chuyển hướng đến trang chính
      localStorage.setItem("username", this.username);
      localStorage.setItem("userId", response[0].id); // Lưu ID người dùng (điều này giả định bạn có một ID trong phản hồi)
      alert("Đăng nhập thành công!");
      this.$router.push("/home"); // Chuyển hướng đến trang Home
    } else {
      // Đăng nhập thất bại, xử lý thông báo lỗi hoặc hiển thị lỗi cho người dùng
      alert("Sai tên đăng nhập hoặc mật khẩu.");
    }
  } else {
    alert("Vui lòng nhập tên đăng nhập và mật khẩu.");
  }
}
}
}


</script>


<template>
  <div id="home">
    <div id="login-form">
      <div class="login-form-header">
        <span class="title-header">Đăng nhập</span>
        <span style="position: absolute; top: 19px; right: 19px">X</span>
      </div>
      <div id="login-body">
        <div class="label-input">Tên đăng nhập</div>
        <input type="text" v-model="username" name="username"/>
        <div
          style="
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            width: 462px;
          "
        >
          <span class="label-input">Mật khẩu</span
          ><span
            ><a href="google.com" id="forgot-password">Quên mật khẩu?</a></span
          >
        </div>
        <input type="password" v-model="password" name="password" />
        <div class="login-button" @click="login()" 
          :style="this.username && this.password
                ? {}
          : { color: '#E5E6EC', background: '#BDBDBD' }">
            Đăng nhập
          </div>
        <p class="login-with">hoặc đăng nhập bằng</p>
        <div
          style="
            display: flex;
            justify-content: space-around;
            padding-top: 10px;">
          <span class="otherway" >
            <img src="../img/facebook.png"/>
            Facebook
          </span>
          <span class="otherway">
           <img src="../img/google.png" alt="">
           Google
          </span>
        </div>
        <p class="footer">
          Bạn chưa có tài khoản?
          <router-link to="/register">Đăng ký ngay!</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background: #f0f2f5;
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
  height: 100vh; /* Đảm bảo trang chiếm toàn bộ chiều cao của màn hình */
  margin: 0; /* Xóa margin mặc định của body */
}

#login-form {
  width: 600px;
  height: 589px;
  border-radius: 14px;
  background: var(--light-greyscale-greyscale-200, #fff);
  box-shadow: 0px 12px 40px 0px rgba(0, 0, 0, 0.16);
}


.login-form-header {
  position: relative;
  max-height: 58.264px;
  border-bottom: 1px solid #f7f7f7;
  padding: 16px 240px 18.26px 240px;
}

.title-header {
  padding-top: 16px;
  color: var(--light-greyscale-greyscale-900, #000);
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
  text-transform: uppercase;
}

#login-body {
  padding: 36.74px 80px 0px 80px;
}

.label-input {
  color: var(--light-greyscale-greyscale-900, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
}

#login-body input {
  display: flex;
  width: 440px;
  height: 22px;
  padding: 16px 15px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #f7f7f7;
  border: 0px;
}

#forgot-password {
  color: var(--dark-other-link-500, #2f80ed);
  text-align: right;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
}

.login-button {
  margin-top: 40px;
  display: flex;
  width: 440px;
  height: 20px;
  padding: 15px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 40px;
  background: var(--Green, #00bf6f);
  box-shadow: 0px 2px 10px 0px rgba(244, 103, 0, 0.05);

  color: var(--light-text-active, #fff);
  text-align: center;
  /* GG/16px/Med/Button Text */
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.login-button:hover {
  cursor: pointer;
}
.login-with {
  margin-top: 30px;
  color: var(--light-transparent-greyscale-65, rgba(0, 0, 0, 0.65));
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.192px;
}

.otherway {
  border-radius: 24px;
  background: var(--light-greyscale-greyscale-300, #e5e6ec);
  color: var(--light-greyscale-greyscale-900, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 13px 55px;
}


.footer {
  margin-top: 51px;
  text-align: center;
}

#forgot-password , .footer a  {
  text-decoration: none;
}
</style>
