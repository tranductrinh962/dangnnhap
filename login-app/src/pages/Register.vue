<script>
import { Post } from "../utils/api.js";

export default {
  name: "Register",
  data() {
    return {
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      agree: false,
    };
  },
  methods: {
    isRegisterValid() {
      // Kiểm tra xem tất cả thông tin đã được nhập và người dùng đã đồng ý điều khoản
      return (
        this.fullname &&
        this.username &&
        this.password &&
        this.confirmPassword &&
        this.email &&
        this.agree
      );
    },
    async registerUser() {
      if (!this.isRegisterValid()) {
        alert("Vui lòng điền đầy đủ thông tin và đồng ý với điều khoản.");
        return;
      }
      if (this.password !== this.confirmPassword) {
        alert("Mật khẩu không khớp. Vui lòng nhập lại.");
        return;
      }

      const response = await Post("register", {
        fullname: this.fullname,
        username: this.username,
        password: this.password,
        email: this.email,
      });

      if (response.msg === "Đăng ký thành công") {
        // Đăng ký thành công, bạn có thể thực hiện các hành động sau, ví dụ: chuyển hướng đến trang đăng nhập
        alert("Đăng ký thành công!");
        this.$router.push("/login");
      } else {
        // Đăng ký thất bại, xử lý thông báo lỗi hoặc hiển thị lỗi cho người dùng
        alert("Đăng ký thất bại: " + response.msg);
      }
    },
  },
};
</script>

<template>
  <div class="register">
    <div class="register-form">
      <div class="register-header">
        <h2>Đăng ký tài khoản mới miễn phí</h2>
      </div>
      <div class="register-body">
        <div class="register-body-input">
          <h4>Họ và tên</h4>
          <input type="text" class="login" placeholder="Nhập họ và tên của bạn" v-model="fullname">
        </div>
        <div class="register-body-input">
          <h4>Tên đăng nhập</h4>
          <input type="text" class="login" placeholder="Nhập tên đăng nhập của bạn" v-model="username">
        </div>
        <div class="register-body-input password">
          <h4>Nhập mật khẩu</h4>
          <input type="password" class="login" v-model="password">
        </div>
        <div class="register-body-input password">
          <h4>Nhập lại mật khẩu</h4>
          <input type="password" class="login" v-model="confirmPassword">
        </div>
        <div class="register-body-input">
          <h4>Email</h4>
          <input type="email" class="login" placeholder="Nhập email của bạn" v-model="email">
        </div>
        <div class="register-body-input checkbox-active">
          <input class="checkbox" type="checkbox" v-model="agree">
          <div class="agree"> Tôi đồng ý với <a href=""> các điều kiện và điều khoản </a> của </div>
        </div>
        <div class="footer-register">
          <div class="footer-items">
            <div class="signup-button">
              <div
                class="signup"
                @click="registerUser()"
                :style="
                  isRegisterValid()
                    ? {}
                    : { color: '#E5E6EC', background: '#BDBDBD' }
                "
              >
                Đăng ký
              </div>
            </div>
          </div>
          <div class="footer-items">
            <div class="signup-by">
              <div class="signup-by-or">
                <span> Hoặc </span>
              </div>
              <div class="signup-other">
                <i class="fab fa-facebook"></i>
                <i class="fab fa-google-plus-g"></i>
                <i class="fab fa-apple"></i>
              </div>
            </div>
          </div>
          <div class="footer-items">
            <p class="login-acc">Bạn đã có tài khoản ?<router-link to="/login" > Đăng nhập </router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 1050px;
}

.register {
  width: 600px;
  height: 900px;
  margin: 0 auto;
  display: flex;
  padding: 0px 16px;
  flex-direction: column;
  align-items: center;
  border-radius: 14px;
  background: #FFF;
  box-shadow: 0px 12px 40px 0px rgba(0, 0, 0, 0.16);
}

.register-form {
  padding: 0 0 24px 0;
}

.register-header h2{
  color: var(--main-text, #002352);
  text-align: center;
  font-family: Roboto;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
}

.register-body {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}


.register .register-body-input h4 {
  color: var(--light-greyscale-greyscale-900, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  margin-bottom: 3px;
}

.register .register-body-input i[class*="fa-circle"] {
  color:#C4C4C4;
  font-size: 8px;
}

.register .register-body .login{
  display: flex;
  width: 440px;
  height: 54px;
  padding: 0px 15px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #F7F7F7;  
  outline: none;
  border: none;
  color: #BDBDBD;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
}

.checkbox-active {
  display: flex;
  margin-top: 24px;
  display: flex;
  height: 18px;
}
input[type="checkbox"]{
  accent-color: #00bf6f;
  cursor: pointer;
}
.register .register-body-input .checkbox {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.register-body-input {
  color: var(--main-text, #002352);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 18.2px */
  
}

.login-items {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
}

.register .register-body-input a{
  color: var(--Link, #1890FF);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
} 

.agree {
  margin-top: 3px;
}

.login-acc a, 
.agree a {
  text-decoration: none;
  text-align: center;
}
.footer-register {
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  width: 432px;
  padding-top: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* gap: 24px; */
}

.footer-register .footer-items .signup{
  display: flex;
  width: 460px;
  justify-content: center;
  height: 50px;
  border-radius: 40px;
  border: none;
  color: var(--light-text-active, #fff);
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 50px;
  background: var(--Green, #00bf6f);
  cursor: pointer;
}

.footer-register .signup-by{
  width: 440px;
}

.footer-register .signup-by-or {
  position: relative;
  border-top: 1px solid #EEE;
  width: 300px;
  margin: auto;
  margin-top: 24px;
  
}

.footer-register .signup-by-or span {
  position: absolute;
  top: -10px;
  left: 50%;
  z-index: 1;
  text-align: center;
  transform: translateX(-50%);
  color: var(--main-text, #002352);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 18.2px */
  background: #fff;
  width: 53px;
  height: 18px;
}

.footer-register .signup-other {
  left: 50%;
  gap: 16px;
  height: 44px;
  margin-top: 24px;
  position: relative;
  align-items: center;
  display: inline-flex;
  transform: translateX(-50%);
}

.footer .signup-other i[class*="fa-brands"] {
  font-size: 25px;
  line-height: 2.2;
  gap: 3px;
  width: 28px;
  height: 28px;
  padding: 8px;
  display: flex;
  align-items: center;
  background: #FFF;
  border-radius: 100px;
  justify-content: center;
  border: 1px solid var(--border-input, #c8c3c3);
}
.footer-register .login-acc{
  color: var(--main-text, #002352);
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 20.8px */
  width: 432px;
}

.footer-register .login-acc a{ 
  color: var(--Link, #1890FF);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;

}
</style>
