<template>
  <div class="container-fluid">
    <br />
    <div class="container">
      <div class="login-wrap"></div>

      <div class="d-flex justify-content-center">
        <div class="brand_logo_container">
          <img
            src="../assets/perfiles/almacenista.jpg"
            class="brand_logo"
            alt="Logo"
          />
        </div>
      </div>

      <div class="login-html">
        <input
          id="tab-1"
          type="radio"
          name="tab"
          class="sign-in"
          checked
        /><label for="tab-1" class="tab">almacenista</label>
        <input id="tab-2" type="radio" name="tab" class="for-pwd" /><label
          for="tab-2"
          class="tab"
        ></label>
        <div class="login-form">
          <div class="sign-in-htm">
            <div class="group">
              <label for="user" class="label">Usuario o Email</label>
              <input v-model="usuario.user" id="user" type="text" class="input" />
            </div>
            <div class="group">
              <label for="pass" class="label">Contraseña</label>
              <input
                v-model="usuario.pass"
                id="pass"
                type="password"
                class="input"
                data-type="password"
              />
            </div>
            <div class="group">
              <input @click="entrar" type="submit" class="button" value="Entrar" />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>

    <link rel="stylesheet" href="css/all.min.css" />
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "loginalmacenista",
  data() {
    return {
      usuario:{
        "user":null,
        "pass":null,

      }
    }
  },
  props: {
    loginalmacenista: String,
  },
  methods:{
    entrar(){
      const me=this;
      axios.post(`user/login`,{
        "email":me.usuario.user,
        "password":me.usuario.pass

      })
      .then(function(response){
        //const payload={nombre:rta.usuario.nombre,email:rta.usuario.email,rol:rta.usuario.rol};
        me.$store.dispatch('setToken',response.data);
        //me.$store.dispatch('setUsuario',payload);
        me.$router.push("/menu");
      })
      .catch(function({response}){
        console.log(response.data.msg)
      })
        
    
    }
  }
};
</script>
<style>
/*imagenlogo*/
.brand_logo_container {
  position: absolute;
  margin-top: 80px;
  margin-right: 2000px;
  height: 300px;
  width: 300px;
}
.brand_logo_container {
  position: absolute;
  height: 450px;
  width: 450px;

  border-radius: 100%;
  background: gray;
  padding: 25px;
  text-align: center;
}
.brand_logo {
  height: 400px;
  width: 400px;
  border-radius: 50%;
}

/*Roles */
body {
  margin: 0;
  color: #edf3ff;
  background: #c8c8c8;
  background-size: cover;
  font: 600 16px/18px "Open Sans", sans-serif;
}
:after,
:before {
  box-sizing: border-box;
}
.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  display: block;
}
a {
  color: inherit;
  text-decoration: none;
}

.login-wrap {
  overflow: hidden;
  float: left;
  width: 100%;
  margin: auto;
  max-width: 1300px;
  min-height: 590px;
  position: relative;
  background: url(https://image.freepik.com/foto-gratis/equipo-negocios-oficina-negro-sobre-fondo-negro_1387-732.jpg)
    no-repeat center;
  background-size: cover;
}
.v-main{
    position: relative;
  background-color: grey;
  background-size: cover;
}
.login-html {
  position: absolute;
  top:80px;
  right:220px;
  padding: 20px 70px 50px 70px;
  background: rgba(0, 0, 0, 0.5);
}
.login-html .sign-in-htm {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all 0.4s linear;
  transition: all 0.4s linear;
}
.login-html .sign-in,
.login-html .for-pwd,
.login-form .group .check {
  display: none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button {
  text-transform: uppercase;
}
.login-html .tab {
  font-size: 35px;
  margin-right: 15px;
  padding-bottom: 5px;
  margin: 20px 10px 20px 80px;
  display: inline-block;
}
.login-html .sign-in:checked + .tab,
.login-html .for-pwd:checked + .tab {
  color: #fff;
  border-color: #1161ee;
}
.login-form {
  min-height: 345px;
  position: relative;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.login-form .group {
  margin-bottom: 15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button {
  width: 100%;
  color: #fff;
  display: block;
}
.login-form .group .input,
.login-form .group .button {
  border: none;
  padding: 15px 20px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
}
.login-form .group input[data-type="password"] {
  -text-security: circle;
  -webkit-text-security: circle;
}
.login-form .group .label {
  color: #aaa;
  font-size: 12px;
}
.login-form .group .button {
  background: #1161ee;
}
.login-form .group label .icon {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  position: relative;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after {
  content: "";
  width: 10px;
  height: 2px;
  background: #fff;
  position: absolute;
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
}
.login-form .group label .icon:before {
  left: 3px;
  width: 5px;
  bottom: 6px;
  -webkit-transform: scale(0) rotate(0);
  transform: scale(0) rotate(0);
}
.login-form .group label .icon:after {
  top: 6px;
  right: 0;
  -webkit-transform: scale(0) rotate(0);
  transform: scale(0) rotate(0);
}
.login-form .group .check:checked + label {
  color: #fff;
}
.login-form .group .check:checked + label .icon {
  background: #1161ee;
}
.login-form .group .check:checked + label .icon:before {
  -webkit-transform: scale(1) rotate(45deg);
  transform: scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after {
  -webkit-transform: scale(1) rotate(-45deg);
  transform: scale(1) rotate(-45deg);
}
.login-html
  .sign-in:checked
  + .tab
  + .for-pwd
  + .tab
  + .login-form
  .sign-in-htm {
  -webkit-transform: rotate(0);
  transform: rotate(0);
}
.login-html .for-pwd:checked + .tab + .login-form .for-pwd-htm {
  -webkit-transform: rotate(0);
  transform: rotate(0);
}
.foot-lnk {
  text-align: center;
}
</style>

