<template>
  <div>
    <div>
      <v-toolbar app class="black">
        <v-btn class="ma-2" color="primary" dark @click="atras">
          <v-icon dark left> mdi-arrow-left </v-icon>Atrás
        </v-btn>

        <v-spacer></v-spacer>

        <v-text-field
          dark
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-badge bordered color="error" icon="mdi-lock" overlap>
          <v-btn class="black--text" color="white" depressed @click="cerrar">
            Cerrar Sesión
          </v-btn>
        </v-badge>
      </v-toolbar>
    </div>

    <br /><br />
    <div class="container">
      <template v-if="tabla2 == 0">
        <v-data-table
          :headers="headers"
          :items="vent"
          :search="search"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Ventas</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-btn @click="imprimir()"><v-icon>mdi-printer</v-icon></v-btn>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" persistent max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="nuevaVenta"
                  >
                    Nuevo
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Compras</span>
                  </v-card-title>

                  <v-card-text>
                    <!-- Es la tabla principal de compras y debe estar en cero -->
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.usuario"
                            label="Usuario"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.persona"
                            label="Persona"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.tipoComprobante"
                            label="TipoComprobante"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.serieComprobante"
                            label="SerieComprobante"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.numComprobante"
                            label="NumComprobante"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.impuesto"
                            label="Impuesto"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.total"
                            label="Total"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.estado"
                            label="Estado"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="guardar">
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="Modal" max-width="290">
                <v-card>
                  <v-card-title class="headline" v-if="Accion == 1">
                    Activar Item
                  </v-card-title>
                  <v-card-title class="headline" v-if="Accion == 2">
                    Desactivar Item
                  </v-card-title>
                  <v-card-text>
                    Estás a punto de <span v-if="Accion == 1">activar </span>
                    <span v-if="Accion == 2">desactivar </span> el item
                    {{ Nombre }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="activarDesactivarCerrar()"
                      color="primary"
                      flat="flat"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      v-if="Accion == 1"
                      @click="activar()"
                      color="primary"
                      flat="flat"
                    >
                      Activar
                    </v-btn>
                    <v-btn
                      v-if="Accion == 2"
                      @click="desactivar()"
                      color="primary"
                      flat="flat"
                    >
                      Desactivar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.opciones`]="{ item }">
            <v-icon color="primary" small class="mr-2" @click="editItem(item)">
              folder_open
            </v-icon>

            <template v-if="item.estado">
              <v-icon small @click="activarDesactivarMostrar(2, item)">
                mdi-block-helper
              </v-icon>
            </template>
            <template v-else>
              <v-icon small @click="activarDesactivarMostrar(1, item)">
                mdi-check
              </v-icon>
            </template>
          </template>

          <template v-slot:[`item.estado`]="{ item }">
            <div v-if="item.estado">
              <span class="green--text">Activo</span>
            </div>
            <div v-else>
              <span class="red--text">Inactivo</span>
            </div>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </template>

      <!--       Segunda tabla: mostrar información detalles -->
      <template v-if="tabla2 == 1">

        <v-card class="mx-auto" max-width="1300">
        <v-row>

        <v-col>
        <v-card class=" pa-2" outlined tile>
        <v-text-field v-model="a" label="Nombre_usuario"></v-text-field>
        <v-text-field v-model="b" label="Nombre_Proveedor"></v-text-field>
        </v-card>
        </v-col>

        <v-col>
        <v-card class="pa-2" outlined tile>
        <v-text-field v-model="c" label="Tipo de Comprobante"></v-text-field>
        <v-text-field v-model="d" label="Serie de Comprobante "></v-text-field>
        </v-card>
        </v-col>

        <v-col>
        <v-card class="pa-2" outlined tile>     
        <v-text-field v-model="e" label="Número de Comprobante"></v-text-field>
        <v-text-field v-model="f" label="Impuesto"></v-text-field>
        </v-card>
        </v-col>

        </v-row>
        </v-card>

        <v-data-table
          :headers="headerVentas"
          :items="detalles"
          :search="buscar"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Detalles de Ventas</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-btn @click="imprimir()"><v-icon>mdi-printer</v-icon></v-btn>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" persistent max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="guardarDetalle"
                  >
                    Guardar_detalle
                  </v-btn>
                </template>
                <v-btn color="primary" dark class="mb-2" v-if="tabla2 == 0">
                  salir
                </v-btn>
                <template> </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Compras</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="detallados._id"
                            label="ID"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="detallados.articulo"
                            label="Articulo"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="detallados.cantidad"
                            label="Cantidad"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="detallados.precio"
                            label="Precio"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="detallados.descuento"
                            label="Descuento"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="detallados.subtotal"
                            label="Subtotal"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text  @click="guardarDetalle">
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.subtotal`]="{ item }">
            <span>
              {{ (item.precio * item.cantidad) / item.descuento }}
            </span>
          </template>
          <v-btn
            v-if="tabla == 1"
            color="blue darken-1"
            flat
            @click.native="ocultarNuevo()"
            >Cancelar</v-btn
          >
        </v-data-table>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  name: "ventas",
  components: {},
  data() {
    return {
      search: "",
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      tabla2: 0,
      detalles: [],
      vent: [],
      zb: 0,
      dialog: false,
      headers: [
        {
          text: "Usuario",
          align: "start",
          sortable: false,
          value: "usuario.nombre",
        },
        { text: "Cliente", value: "persona.nombre" },
        { text: "TipoComprobante", value: "tipoComprobante" },
        { text: "SerieComprobante", value: "serieComprobante" },
        { text: "NumComprobante", value: "numComprobante" },
        { text: "Impuesto", value: "impuesto" },
        { text: "Total", value: "total" },
        { text: "Estado", value: "estado" },
        { text: "Opciones", value: "opciones" },
      ],
      headerVentas: [
        { text: "ID", value: "_id", sortable: false },
        { text: "Articulo", value: "articulo", sortable: false },
        { text: "cantidad", value: "cantidad", sortable: false },
        { text: "Precio", value: "precio", sortable: false },
        { text: "Descuento", value: "descuento", sortable: false },
        { text: "Subtotal", value: "subtotal", sortable: false },
      ],
      editedItem: {
        usuario: "",
        persona: "",
        tipoComprobante: "",
        serieComprobante: "",
        numComprobante: "",
        impuesto: "",
        total: "",
        detalles: "",
        estado: 0,
      },
      detallados: {
        _id: 0,
        articulo: "",
        cantidad: 0,
        precio: 0,
        descuento: 0,
        subtotal: 0,
      },
    };
  },

  created() {
    this.listarVentas();
  },
  methods: {
    listarVentas() {
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("vent", header)
        .then((response) => {
          console.log(response.data.vent);
          this.vent = response.data.venta;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    guardarDetalle(){
       console.log("Estoy guardando");
        const me = this;
        let header = { headers: { token: this.$store.state.token } };
        axios
          .post(
            "vent",
            {
              _id: me.detallados._id,
              articulo: me.detallados.articulo,
              cantidad: me.detallados.cantidad,
              precio: me.detallados.precio,
              subtotal: me.detallados.subtotal,
              estado: me.editedItem.estado,
            },
            header
          )
          .then((response) => {
            console.log(response.data);
            me.listarVentas();
            me.detallados._id = "";
            me.detallados.articulo = "";
            me.detallados.cantidad = "";
            me.detallados.precio = "";
            me.detallados.subtotal = "";
            // me.$router.push("/categorias")
            this.dialog = false;
          })
          .catch((error) => {
            console.log(error.response);
          });
    },
    guardar() {
      if (this.zb == 0) {
        console.log("Estoy guardando", this.zb);
        const me = this;
        let header = { headers: { token: this.$store.state.token } };
        axios
          .post(
            "vent",
            {
              usuario: me.editedItem.usuario.nombre,
              persona: me.editedItem.persona.nombre,
              tipoComprobante: me.editedItem.tipoComprobante,
              serieComprobante: me.editedItem.serieComprobante,
              numComprobante: me.editedItem.numComprobante,
              impuesto: me.editedItem.impuesto,
              total: me.editedItem.total,
              detalles: [
                { _id: me.detallados._id },
                { articulo: me.detallados.articulo },
                { cantidad: me.detallados.cantidad },
                { precio: me.detallados.precio },
                { subtotal: me.detallados.subtotal },
              ],
              estado: me.editedItem.estado,
            },
            header
          )
          .then((response) => {
            console.log(response.data);
            me.listarVentas();
            me.editedItem.usuario.nombre = "";
            me.editedItem.persona.nombre = "";
            me.editedItem.tipoComprobante = "";
            me.editedItem.serieComprobante = "";
            me.editedItem.numComprobante = "";
            me.editedItem.impuesto = "";
            me.editedItem.total = "";
            me.editedItem.detalles = "";
            me.editedItem.descuento = "";
            me.editedItem.estado = "";
            // me.$router.push("/categorias")
            this.dialog = false;
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        console.log("Estoy editando" + this.zb + " id " + this.id);
        let header = { headers: { token: this.$store.state.token } };
        const me = this;
        axios
          .put(
            `vent/${me.id}`,
            {
              usuario: me.editedItem.usuario,
              persona: me.editedItem.persona,
              tipoComprobante: me.editedItem.tipoComprobante,
              serieComprobante: me.editedItem.serieComprobante,
              numComprobante: me.editedItem.numComprobante,
              impuesto: me.editedItem.impuesto,
              total: me.editedItem.total,
              detalles: [
                { _id: me.editedItem.detalles._id },
                { articulo: me.editedItem.detalles.articulo },
                { cantidad: me.editedItem.detalles.cantidad },
                { precio: me.editedItem.detalles.precio },
                { descuento: me.editedItem.detalles.descuento },
              ],
            },
            header
          )
          .then(function () {
            me.listarVentas();
          })
          .catch(function (error) {
            console.log(error.data);
          });
      }
    },
    nuevaVenta() {
      this.tabla2 = 1;
    },
    editItem(item) {
      this.zb = 1;
      console.log(item._id);
      this.tabla2 = 1;
      this.listarDetallesVentas(item._id);
      this.a = item.usuario.nombre;
      this.b = item.persona.nombre;
      this.c = item.tipoComprobante;
      this.d = item.serieComprobante;
      this.e = item.numComprobante;
      this.f = item.impuesto;
    },
    listarDetallesVentas(id) {
      let me = this;
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get(`vent/${id}`, header)
        .then(function (response) {
          me.detalles = response.data.venta.detalles;
          console.log(response.data.venta.detalles);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    activarDesactivarMostrar(accion, item) {
      let id = item._id;
      console.log(accion);
      if (accion == 2) {
        console.log(id);
        let me = this;
        let header = { headers: { token: this.$store.state.token } };
        axios
          .put(
            `vent/desactivar/${id}`,
            {
              estado: 0,
            },
            header
          )
          .then(function () {
            me.listarVentas();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (accion == 1) {
        console.log(id);
        let me = this;
        let header = { headers: { token: this.$store.state.token } };
        axios
          .put(
            `vent/activar/${id}`,
            {
              estado: 1,
            },
            header
          )
          .then(function () {
            me.listarVentas();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    activar() {
      let me = this;
      let header = { headers: { token: this.$store.state.token } };
      axios
        .put(`categoria/activar/${me.Id}`, {}, header)
        .then(function () {
          me.Modal = 0;
          me.Accion = 0;
          me.Nombre = "";
          me.Id = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      let header = { headers: { token: this.$store.state.token } };
      axios
        .put(`categoria/desactivar/${me.Id}`, {}, header)
        .then(function () {
          me.Modal = 0;
          me.Accion = 0;
          me.Nombre = "";
          me.Id = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    atras() {
      this.$router.push("/menu");
    },
    cerrar() {
      Swal.fire({
        background: "black",
        position: "top-center",
        icon: "success",
        title: "Su sesión ha finalizado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      this.$store.dispatch("setToken", "");
      this.$router.push("/roles");
    },
    imprimir() {
      var columns = [
        { title: "Usuario", dataKey: "usuario" },
        { title: "Persona", dataKey: "persona" },
        { title: "TipoComprobante", dataKey: "tipoComprobante" },
        { title: "SerieComprobante", dataKey: "serieComprobante" },
        { title: "NumComprobante", dataKey: "numComprobante" },
        { title: "Impuesto", dataKey: "impuesto" },
        { title: "total", dataKey: "total" },
        { title: "Detalles", dataKey: "detalles" },
        { title: "Estado", dataKey: "estado" },
      ];
      var rows = [];

      this.vent.map(function (x) {
        rows.push({
          usuario: x.usuario,
          persona: x.persona,
          tipoComprobante: x.tipoComprobante,
          serieComprobante: x.serieComprobante,
          numComprobante: x.numComprobante,
          impuesto: x.impuesto,
          total: x.total,
          detalles: x.detalles,
          estado: x.estado,
        });
      });
      var doc = new jsPDF("p", "pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Ventas", 40, 30);
        },
      });

      doc.save("Ventas.pdf");
    },
  },
};
</script>

<style>
/*.container {
  background-color: black;
  color: white;
}*/
/*#second{
  background-image: url(https://acegif.com/wp-content/gifs/starfall-gif-22.gif);
  background-size: 100% 100%;
  background-attachment: fixed;
}*/
</style>