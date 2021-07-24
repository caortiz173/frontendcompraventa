<template>
  <div>
    <header class="bg_animate">
      <div class="header_nav">
        <div class="contenedor">
          <v-btn color="white" dark @click.stop="drawer = !drawer">
            <v-col>
              <v-btn icon color="black">
                <v-icon>mdi-cached</v-icon>
              </v-btn>
            </v-col>
          </v-btn>
          <h1>Inicio</h1>
         
          <button type="button" class="btn btn-light btn-lg">
            <h4 @click="cerrarSesion">Cerrar Sesión</h4>
          </button>
        </div>
      </div>

      <section class="banner contenedor">
        <section class="banner_title">
          <h2>Bienvenid@</h2>
        </section>
        <div class="banner_img">
          <img src="../assets/perfiles/disenotienda.png" alt="" />
        </div>
      </section>

      <div id="app">
        <v-app id="inspire">
          <v-sheet
            height="700"
            class="overflow-hidden"
            style="position: relative"
          >
            <v-navigation-drawer v-model="drawer" absolute temporary>
              <v-list-item class="lista">
                <v-list class="menuBajar" nav dense>
                  <v-app id="inspire">
                    <div>
                      <v-expansion-panels v-model="panel">
                        <v-expansion-panel>
                          <v-expansion-panel-header
                            >Almacen</v-expansion-panel-header
                          >
                          <v-expansion-panel-content class="contenido">
                            <router-link to="/categorias">
                              <v-btn
                                @click="cat"
                                id="linea"
                                text
                                color="secondary"
                                >Categorias</v-btn
                              ></router-link
                            >
                          </v-expansion-panel-content>
                          <v-expansion-panel-content class="contenido">
                            <router-link to="/articulos"
                              ><v-btn @click="art" text color="secondary"
                                >Articulos</v-btn
                              ></router-link
                            >
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                          <v-expansion-panel-header
                            >Compras</v-expansion-panel-header
                          >
                          <v-expansion-panel-content class="contenido">
                            <router-link to="/ingresos">
                              <v-btn @click="ing" text color="secondary"
                                >Ingresos</v-btn
                              ></router-link
                            >
                          </v-expansion-panel-content>
                          <v-expansion-panel-content class="contenido">
                            <router-link to="/proveedores">
                              <v-btn @click="prov" text color="secondary"
                                >Proveedores</v-btn
                              ></router-link
                            >
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                          <v-expansion-panel-header
                            >Ventas</v-expansion-panel-header
                          >
                          <v-expansion-panel-content class="contenido">
                            <router-link to="/ventas">
                              <v-btn @click="vent" text color="secondary"
                                >Ventas</v-btn
                              ></router-link
                            >
                          </v-expansion-panel-content>
                          <v-expansion-panel-content class="contenido">
                            <router-link to="/clientes">
                              <v-btn @click="cli" text color="secondary"
                                >Clientes</v-btn
                              ></router-link
                            >
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header
                            >Accesos</v-expansion-panel-header
                          >
                          <v-expansion-panel-content class="contenido">
                            <router-link to="/usuarios">
                              <v-btn @click="usu" text color="secondary"
                                >Usuarios</v-btn
                              ></router-link
                            >
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </div>
                  </v-app>
                </v-list>
              </v-list-item>
            </v-navigation-drawer>
          </v-sheet>
        </v-app>
        <div></div>
      </div>

      <div class="burbujas">
        <div class="burbuja"></div>
        <div class="burbuja"></div>
        <div class="burbuja"></div>
        <div class="burbuja"></div>
        <div class="burbuja"></div>
        <div class="burbuja"></div>
        <div class="burbuja"></div>
        <div class="burbuja"></div>
        <div class="burbuja"></div>
        <div class="burbuja"></div>
      </div>
    </header>
  </div>
</template>
<script>
import Swal from "sweetalert2";
//import Dropdown from "./Dropdown";
export default {
  name: "navigation",
  components: {},
  data() {
    return {
      detalles: [],
      selectedItem: 0,
      drawer: null,
      panel: [0, 1],
      disabled: false,
      readonly: false,
    };
  },
  methods: {
    cerrarSesion() {
      Swal.fire({
        background: "black",
        position: "top-center",
        icon: "success",
        title: "Su sesión ha finalizado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    cat() {
      Swal.fire({
        title: "Categorias",
        width: 400,
        height: 200,
        position: "center",
        padding: "3em",
        background:
          "url(https://cdn.pixabay.com/photo/2017/06/24/16/50/blue-2438160_960_720.png)",
        backdrop: `
       rgba(0,0,123,0.4)
       url("https://m.gifanimados.com/Gifs-Objetos/Animaciones-Hogar/Carros-Compra/Monigote-Con-Carro-90318.gif")
       center top
       no-repeat
       
      `,
      });
    },
    art() {
      Swal.fire({
        title: "Articulos",
        width: 600,
        position: "top-right",
        padding: "3em",
        background:
          "#fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53ScbtmdR9PK0FHkyZplXz-3wvoWRUKmzSQ&usqp=CAU)",
        backdrop: `
       rgba(0,0,123,0.4)
       url("https://img.pikbest.com/58pic/35/44/12/24b58PIC82IF4kBpkrc4b_PIC2018.gif!bw700")
       left top
       no-repeat
      `,
      });
    },
    ing() {
      Swal.fire({
        title: "Ingresos",
        width: 600,
        position: "top-right",
        padding: "3em",
        background:
          "#fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53ScbtmdR9PK0FHkyZplXz-3wvoWRUKmzSQ&usqp=CAU)",
        backdrop: `
       rgba(0,0,123,0.4)
       url("https://img.pikbest.com/58pic/35/44/12/24b58PIC82IF4kBpkrc4b_PIC2018.gif!bw700")
       left top
       no-repeat
      `,
      });
    },
    prov() {
      Swal.fire({
        title: "Proveedores",
        width: 600,
        position: "top-right",
        padding: "3em",
        background:
          "#fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53ScbtmdR9PK0FHkyZplXz-3wvoWRUKmzSQ&usqp=CAU)",
        backdrop: `
       rgba(0,0,123,0.4)
       url("https://img.pikbest.com/58pic/35/44/12/24b58PIC82IF4kBpkrc4b_PIC2018.gif!bw700")
       left top
       no-repeat
      `,
      });
    },
    vent() {
      Swal.fire({
        title: "ventas normales",
        width: 600,
        position: "top-right",
        padding: "3em",
        background:
          "#fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53ScbtmdR9PK0FHkyZplXz-3wvoWRUKmzSQ&usqp=CAU)",
        backdrop: `
       rgba(0,0,123,0.4)
       url("https://img.pikbest.com/58pic/35/44/12/24b58PIC82IF4kBpkrc4b_PIC2018.gif!bw700")
       left top
       no-repeat
      `,
      });
    },
    cli() {
      Swal.fire({
        title: "Clientes",
        width: 600,
        position: "top-right",
        padding: "3em",
        background:
          "#fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53ScbtmdR9PK0FHkyZplXz-3wvoWRUKmzSQ&usqp=CAU)",
        backdrop: `
       rgba(0,0,123,0.4)
       url("https://img.pikbest.com/58pic/35/44/12/24b58PIC82IF4kBpkrc4b_PIC2018.gif!bw700")
       left top
       no-repeat
      `,
      });
    },
    usu() {
      Swal.fire({
        title: "usuarios",
        width: 600,
        position: "top-right",
        padding: "3em",
        background:
          "#fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53ScbtmdR9PK0FHkyZplXz-3wvoWRUKmzSQ&usqp=CAU)",
        backdrop: `
       rgba(0,0,123,0.4)
       url("https://img.pikbest.com/58pic/35/44/12/24b58PIC82IF4kBpkrc4b_PIC2018.gif!bw700")
       left top
       no-repeat
      `,
      });
    },
    com() {
      Swal.fire({
        title: "Compras",
        width: 600,
        position: "top-right",
        padding: "3em",
        background:
          "#fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53ScbtmdR9PK0FHkyZplXz-3wvoWRUKmzSQ&usqp=CAU)",
        backdrop: `
       rgba(0,0,123,0.4)
       url("https://img.pikbest.com/58pic/35/44/12/24b58PIC82IF4kBpkrc4b_PIC2018.gif!bw700")
       left top
       no-repeat
      `,
      });
    },
    ventas() {
      Swal.fire({
        title: "ventas",
        width: 600,
        position: "top-right",
        padding: "3em",
        background:
          "#fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53ScbtmdR9PK0FHkyZplXz-3wvoWRUKmzSQ&usqp=CAU)",
        backdrop: `
       rgba(0,0,123,0.4)
       url("https://img.pikbest.com/58pic/35/44/12/24b58PIC82IF4kBpkrc4b_PIC2018.gif!bw700")
       left top
       no-repeat
      `,
      });
    },
  },
};
</script>
<style>

.contenido {
  font-size: 18px;
}
h3 {
  margin-top: 2px;
  font-size: 35px;
  text-transform: uppercase;
  font-family: "DM Serif Display", serif;
  color: black;
}
h4 {
  font-family: "DM Serif Display", serif;
  font-size: 24px;
}

.lista {
  margin-top: 12px;
  font-size: 24px;
  height: 60px;
  text-align: center;
}
.menuBajar {
  height: 20px;
  margin-top: 20px;
}












/*Grafico y Bienvenid@*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", "Sans serif";
}

.contenedor {
  width: 90%;
  max-width: 1200px;
  margin: auto;
}

.bg_animate {
  width: 100%;
  height: 100vh;
  background: url("https://www.webcoderskull.com/img/abouts-bg.png");
  position: relative;
  overflow: hidden;
}

.header_nav {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: black;
}

.header_nav .contenedor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.header_nav h1 {
  color: #fff;
  font-family: "Gagalin";
}

.header_nav nav a {
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
}

.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.banner_title h2 {
  color: #fff;
  font-size: 60px;
  font-weight: 800;
  margin-bottom: 20px;
}

.banner_img {
  animation: movimiento 2.5s linear infinite;
}

.banner_img img {
  width: 600px;
  display: block;
}

/* burbujas */

.burbuja {
  border-radius: 50%;
  background: rgb(255, 255, 255);
  opacity: 0.3;

  position: absolute;
  bottom: -150;

  animation: burbujas 3s linear infinite;
}

.burbuja:nth-child(1) {
  width: 80px;
  height: 80px;
  left: 5%;
  animation-duration: 3s;
  animation-delay: 3s;
}

.burbuja:nth-child(2) {
  width: 100px;
  height: 100px;
  left: 35%;
  animation-duration: 3s;
  animation-delay: 5s;
}

.burbuja:nth-child(3) {
  width: 20px;
  height: 20px;
  left: 15%;
  animation-duration: 1.5s;
  animation-delay: 7s;
}

.burbuja:nth-child(4) {
  width: 50px;
  height: 50px;
  left: 90%;
  animation-duration: 6s;
  animation-delay: 3s;
}

.burbuja:nth-child(5) {
  width: 70px;
  height: 70px;
  left: 65%;
  animation-duration: 3s;
  animation-delay: 1s;
}

.burbuja:nth-child(6) {
  width: 20px;
  height: 20px;
  left: 50%;
  animation-duration: 4s;
  animation-delay: 5s;
}

.burbuja:nth-child(7) {
  width: 20px;
  height: 20px;
  left: 50%;
  animation-duration: 4s;
  animation-delay: 5s;
}

.burbuja:nth-child(8) {
  width: 100;
  height: 100px;
  left: 52%;
  animation-duration: 5s;
  animation-delay: 5s;
}

.burbuja:nth-child(9) {
  width: 65px;
  height: 65px;
  left: 51%;
  animation-duration: 3s;
  animation-delay: 2s;
}

.burbuja:nth-child(10) {
  width: 40px;
  height: 40px;
  left: 35%;
  animation-duration: 3s;
  animation-delay: 4s;
}

@keyframes burbujas {
  0% {
    bottom: 0;
    opacity: 0;
  }
  30% {
    transform: translateX(30px);
  }
  50% {
    opacity: 0.4;
  }
  100% {
    bottom: 100vh;
    opacity: 0;
  }
}

@keyframes movimiento {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(30px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>