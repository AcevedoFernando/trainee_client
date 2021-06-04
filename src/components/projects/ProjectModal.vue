<template>
  <div>
    <vue-final-modal
      v-model="showModal"
      :clickToClose="false"
      name="project-modal"
      content-class="modal-content"
      classes="modal-container"
      @before-open="beforeOpen"
    >
      <div class="modal__header">
        <span class="modal__title"
          >{{ title ? title.name : null }} proyecto</span
        >
        <button type="close" @click="close">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <div class="modal__content">
        <div class="row g-3">
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                name="name"
                :disabled="action == 'show'"
                placeholder="Nombre"
                v-model="project.name"
              />
              <span v-if="inError('name')" class="text-danger">{{
                inError("name")
              }}</span>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <flat-pickr
                class="form-control"
                v-model="project.delivery_at"
                :config="config"
                placeholder="Selecciona una fecha"
                name="delivery_at"
              >
              </flat-pickr>
              <!-- <input
                type="text"
                class="form-control"
                name="delivery_at"
                :disabled="action == 'show'"
                placeholder="Fecha de entrega"
                v-model="project.delivery_at"
              /> -->
              <span v-if="inError('delivery_at')" class="text-danger">{{
                inError("delivery_at")
              }}</span>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">$</span>
                <input
                  type="text"
                  class="form-control"
                  name="price"
                  :disabled="action == 'show'"
                  placeholder="Precio"
                  aria-label="Precio"
                  aria-describedby="basic-addon1"
                  v-model="project.price"
                />
              </div>
              <span v-if="inError('price')" class="text-danger">{{
                inError("price")
              }}</span>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">$</span>
                <input
                  type="text"
                  class="form-control"
                  name="cost"
                  :disabled="action == 'show'"
                  placeholder="Costo"
                  aria-label="costo"
                  aria-describedby="basic-addon1"
                  v-model="project.cost"
                />
              </div>
              <span v-if="inError('cost')" class="text-danger">{{
                inError("cost")
              }}</span>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <input
                type="text"
                :disabled="action == 'show'"
                class="form-control"
                name="type"
                placeholder="Tipo"
                v-model="project.type"
              />
              <span v-if="inError('type')" class="text-danger">{{
                inError("type")
              }}</span>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <input
                type="text"
                :disabled="action == 'show'"
                class="form-control"
                name="machine"
                placeholder="Máquina"
                v-model="project.machine"
              />
              <span v-if="inError('machine')" class="text-danger">{{
                inError("machine")
              }}</span>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group">
              <textarea
                type="text"
                :disabled="action == 'show'"
                class="form-control"
                name="description"
                v-model="project.description"
              ></textarea>
              <span v-if="inError('description')" class="text-danger">{{
                inError("description")
              }}</span>
            </div>
          </div>
          <template v-if="action == 'show'">
            <div class="col-sm-12 col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="createdAt"
                  disabled
                  v-model="project.createdAt"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="updatedAt"
                  disabled
                  v-model="project.updatedAt"
                />
              </div>
            </div>
          </template>
        </div>
        <div class="row m-3 border-top pt-4">
          <div class="col-12 d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-danger btn-lg"
              @click="close"
              :disabled="onSave"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success btn-lg"
              @click="save"
              v-if="action != 'show'"
              :disabled="onSave"
            >
              {{ !onSave ? "Guardar" : null }}
              <!--Loading Start-->
              <div v-if="onSave" class="loading">
                <div class="d-flex justify-content-center">
                  <div
                    class="spinner-border"
                    style="width: 1rem; height: 1rem"
                    role="status"
                  ></div>
                </div>
              </div>
              <!--Loading End-->
            </button>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import { Spanish } from "flatpickr/dist/l10n/es.js";

const project_template = {
  name: "",
  description: "",
  type: "",
  delivery_at: "2020-01-01",
  price: "",
  cost: "",
  machine: "",
};
export default {
  data: () => ({
    showModal: false,
    project: Object.assign({}, project_template),
    titles: [
      { action: "create", name: "Crear" },
      { action: "edit", name: "Editar" },
      { action: "show", name: "Ver" },
    ],
    action: "",
    onSave: false,
    errors: [],
    hasError: false,
    config: {
      wrap: true,
      altFormat: "M j, Y",
      altInput: true,
      dateFormat: "Y-m-d",
      locale: Spanish,
    },
  }),
  methods: {
    close() {
      this.project = Object.assign({}, project_template);
      this.$vfm.hide("project-modal");
    },
    beforeOpen() {
      this.errors = [];
      this.hasError = false;
      this.onSave = false;
      this.project = Object.assign({}, project_template);
      this.$set(this, "action", this.$vfm.modals[0].params.action);
      if (this.action == "show" || this.action == "edit") {
        this.getProject(this.$vfm.modals[0].params.id);
      }
    },
    getProject(id) {
      this.$axios
        .get(`/projects/${id}`)
        .then((res) => {
          this.$set(this, "project", res.data);
        })
        .catch((err) => {
          console.log(err.messsage);
        });
    },
    save() {
      this.hasError = false;
      this.errors = [];
      this.onSave = true;
      if (this.action == "create") {
        this.$axios
          .post("/projects", this.project)
          .then(() => {
            // Success Message
            this.onSave = false;
            this.isSuccess();
          })
          .catch((err) => {
            // Error Message
            this.onSave = false;
            this.hasError = true;
            this.isError(err.response.data.errors);
          });
      } else {
        this.$axios
          .put(`/projects/${this.project.id}`, this.project)
          .then(() => {
            // Success Message
            this.onSave = false;
            this.isSuccess();
          })
          .catch((err) => {
            // Error Message
            this.onSave = false;
            this.isError(err.response.data.errors);
          });
      }
    },
    isSuccess() {
      this.close();
      this.$emit("reload");
      this.$fire({
        title: "Excelente!",
        text: "El proyecto se guardo correctamente",
        type: "success",
        timer: "3000",
      }).then(() => {});
    },
    isError(errors) {
      this.$set(this, "errors", errors);
    },
    inError(field) {
      if (this.hasError) {
        let error = Object.keys(this.errors).find((err) => {
          return err == field;
        });
        if (error) return this.errors[error].join();
      }
      return false;
    },
  },
  computed: {
    title() {
      return this.titles.find((title) => {
        return title.action == this.action;
      });
    },
  },
};
</script>

<style scoped>
::v-deep .modal-content {
  position: relative;
  display: flex;
  border-radius: 0.25rem;
  flex-direction: column;
  width: 700px;
  padding: 15px;
}
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__header > button {
  background: transparent;
  border: none;
  float: right;
}
.modal__header > .modal__title {
  color: #6e6e6e;
  font-size: 1.4rem;
}
.modal__header {
  padding: 0.6rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #6e6e6e;
  text-align: start;
}
</style>
