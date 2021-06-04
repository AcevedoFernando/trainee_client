<template>
  <div class="row">
    <div class="col-12 bg-info d-flex justify-content-end mt-5">
      <button
        type="menu"
        class="btn mx-1 text-white border-white m-2"
        @click="$vfm.show('project-modal', { action: 'create' })"
      >
        <i class="fa fa-plus text-white"></i> Nuevo Projecto
      </button>
    </div>
    <div class="col-sm-12 col-md-12">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Fecha de entrega</th>
            <th scope="col">Status</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.name }}</td>
            <td>$ {{ project.price }}</td>
            <td>{{ project.delivery_at }}</td>
            <td>
              {{
                arrayStatus[project.status - 1]
                  ? arrayStatus[project.status - 1].name
                  : null
              }}
            </td>
            <td>
              <div class="justify-content-center">
                <button
                  type="menu"
                  class="btn mx-1"
                  @click="
                    $vfm.show('project-modal', {
                      action: 'show',
                      id: project.id,
                    })
                  "
                >
                  <i class="fa fa-eye text-info"></i>
                </button>
                <button
                  type="menu"
                  class="btn mx-1"
                  @click="
                    $vfm.show('project-modal', {
                      action: 'edit',
                      id: project.id,
                    })
                  "
                >
                  <i class="fa fa-pencil text-warning"></i>
                </button>
                <button type="menu" class="btn mx-1">
                  <i
                    class="fa fa-trash text-danger"
                    @click="deleteElement(project.id)"
                  ></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <project-modal @reload="reloadTable"></project-modal>
  </div>
</template>

<script>
import ProjectModal from "@/components/projects/ProjectModal";

export default {
  name: "ProjectsTable",
  components: {
    ProjectModal,
  },
  data: () => ({
    projects: [],
    count: 0,
    arrayStatus: [
      { id: 1, name: "Pendiente" },
      { id: 2, name: "Iniciado" },
      { id: 3, name: "Terminado" },
    ],
  }),
  mounted() {
    this.reloadTable();
  },
  methods: {
    reloadTable() {
      this.$axios
        .get("/projects")
        .then((res) => {
          this.$set(this, "count", res.data.count);
          this.$set(this, "projects", res.data.rows);
        })
        .catch((err) => {
          console.log(err.messsage);
        });
    },
    deleteElement(id) {
      this.$confirm("¿Estas Seguro?").then(() => {
        this.$axios
          .delete(`/projects/${id}`)
          .then(() => {
            this.reloadTable();
            this.$fire({
              title: "Excelente!",
              text: "El proyecto se elimino correctamente",
              type: "success",
              timer: "3000",
            }).then(() => {});
          })
          .catch((err) => {
            // Error Message
            console.log(err.message);
          });
      });
    },
  },
};
</script>
