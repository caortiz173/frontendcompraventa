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

    <br />

    <div class="container">
      <v-data-table
        :headers="headers"
        :items="artic"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Articulos</v-toolbar-title>
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
                >
                  Nuevo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Articulos</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.categoria"
                          label="Categoria"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.codigo"
                          label="Código"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.descripcion"
                          label="Descripción"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.precioventa"
                          label="Precio_venta"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.stock"
                          label="Stock"
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
          <!--<v-icon small @click="Delete(item)"> mdi-delete </v-icon>-->
          <v-icon color="primary" small class="mr-2" @click="editar(item)">
            mdi-pencil
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
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  name: "articulos",
  components: {},
  data() {
    return {
      search: "",
      artic: [],
      zb: 0,
      dialog: false,
      headers: [
        {
          text: "Código",
          align: "start",
          sortable: false,
          value: "codigo",
        },
        { text: "Categoría", value: "categoria.nombre" },
        { text: "Nombre", value: "nombre" },
        { text: "Stock", value: "stock" },
        { text: "Precio", value: "precioventa" },
        { text: "Descripción", value: "descripcion" },
        { text: "Estado", value: "estado" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      editedItem: {
        codigo: "",
        categoria: "",
        nombre: "",
        stock: "",
        precioventa: 0,
        descripcion: "",
        estado: 0,
      },
    };
  },
  created() {
    this.listarArticulos();
  },
  methods: {
    listarArticulos() {
      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("artic", header)
        .then((response) => {
          console.log(response.data.artic);
          this.artic = response.data.articulo;
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
            "artic",
            {
              categoria: this.editedItem.categoria,
              codigo: this.editedItem.codigo,
              nombre: this.editedItem.nombre,
              descripcion: this.editedItem.descripcion,
              precioventa: this.editedItem.precioventa,
              stock: this.editedItem.stock,
              estado: this.editedItem.estado,
            },
            header
          )
          .then((response) => {
            console.log(response.data);
            me.listarArticulos();
            this.editedItem.categoria = "";
            this.editedItem.codigo = "";
            this.editedItem.nombre = "";
            this.editedItem.descripcion = "";
            this.editedItem.precioventa = "";
            this.editedItem.stock = "";
            this.editedItem.estado = "";
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        console.log("Estoy editando" + this.zb + " id " + this.id);
        const me = this;
        let header = { headers: { token: this.$store.state.token } };
        axios

          .put(
            `artic/${this.id}`,
            {
              categoria: this.editedItem.categoria.nombre,
              codigo: this.editedItem.codigo,
              nombre: this.editedItem.nombre,
              descripcion: this.editedItem.descripcion,
              precioventa: this.editedItem.precioventa,
              stock: this.editedItem.stock,
            },
            header
          )
          .then((response) => {
            console.log(response.data);
            me.listarArticulos();
            this.editedItem.categoria.nombre = "";
            this.editedItem.codigo = "";
            this.editedItem.nombre = "";
            this.editedItem.descripcion = "";
            this.editedItem.precioventa = "";
            this.editedItem.stock = "";
            this.editedItem.estado = "";
          })
          .catch(function (error) {
            console.log(error.data);
          });
      }
    },
    editar(item) {
      this.zb = 1;
      console.log(item);
      this.id = item._id;
      this.editedItem.categoria = item.categoria.nombre;
      this.editedItem.codigo = item.codigo;
      this.editedItem.nombre = item.nombre;
      this.editedItem.descripcion = item.descripcion;
      this.editedItem.precioventa = item.precioventa;
      this.editedItem.stock = item.stock;
      this.dialog = true;
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
            `artic/desactivar/${id}`,
            {
              estado: 0,
            },
            header
          )
          .then(function () {
            me.listarArticulos();
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
            `artic/activar/${id}`,
            {
              estado: 1,
            },
            header
          )
          .then(function () {
            me.listarArticulos();
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
        { title: "Codigo", dataKey: "codigo" },
        { title: "Nombre", dataKey: "nombre" },
        { title: "Categoria", dataKey: "categoria" },
        { title: "Stock", dataKey: "stock" },
        { title: "Precioventa", dataKey: "precioventa" },
        { title: "Descripcion", dataKey: "descripcion" },
        { title: "Estado", dataKey: "estado" },
      ];
      var rows = [];

      this.artic.map(function (x) {
        rows.push({
          codigo: x.codigo,
          nombre: x.nombre,
          categoria: x.categoria,
          stock: x.stock,
          precioventa: x.precioventa,
          descripcion: x.descripcion,
          estado: x.estado,
        });
      });
      var doc = new jsPDF("p", "pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Articulos", 40, 30);
        },
      });

      doc.save("Articulos.pdf");
    },
  },
};
</script>

<style>
/*.container {
  background-color: black;
  color: white;
}*/
</style>