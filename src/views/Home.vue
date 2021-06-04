<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <h1 class="mt-5 border-bottom pb-4">Gestor de proyectos</h1>
    </div>
    <div class="col-8">
      <projects-table></projects-table>
    </div>
  </div>
</template>

<script>
import ProjectsTable from "@/components/projects/ProjectsTable";

export default {
  name: "Home",
  components: {
    ProjectsTable,
  },
};
</script>
