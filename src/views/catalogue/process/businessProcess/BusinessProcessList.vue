<template>
  <div class="row" v-if="processes">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Processes
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'BusinessProcessNew' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="processes"
            :fields="fields"
            column-filter
            :items-per-page="10"
            hover
            sorter
            pagination
          >
            <template #show_update="{item}">
              <td class="py-2">
                <CButton
                  color="primary"
                  square
                  size="sm"
                  @click="editProcess(item)"
                  >Modifica</CButton
                >
              </td>
            </template>
            <template #show_delete="{item}">
              <td class="py-2">
                <CButton
                  color="primary"
                  square
                  size="sm"
                  @click="deleteProcess(item)"
                  >Elimina</CButton
                >
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosHack } from "@/http";
export default {
  name: "processlist",
  data() {
    return {
      processes: null,
      fields: [
        { key: "id", _style: "width:5%" },
        { key: "name", _style: "width:15%" },
        { key: "description", _style: "width:15%;" },
        { key: "label", _style: "width:20%;" },
        { key: "organization", _style: "width:10%;" },
        {
          key: "show_update",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        },
        {
          key: "show_delete",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        }
      ]
    };
  },
  created() {
    axiosHack.get("/processes").then(response => {
      console.log(response);
      this.processes = response.data;
    });
  },
  methods: {
    deleteProcess(item) {
      var index = this.processes.indexOf(item);
      //this.processes.splice(index, 1);
      axiosHack
        .delete("/processes/" + this.processes[index].id)
        .then(response => {
          console.log(response);
        });
      axiosHack.get("/processes").then(response => {
        console.log(response);
        this.processes = response.data;
      });
    },

    editProcess(item) {
      // eslint-disable-next-line no-redeclare
      var index = this.processes.indexOf(item);
      // this.processes.splice(index, 1);
      this.$router.push(
        "/catalogue/process/processedit/" + this.processes[index].id
      );
    }
  }
};
</script>

<style>
.card-header-actions {
  margin-right: 0;
}
.card-header-actions .material-design-icon > .material-design-icon__svg {
  width: 1.2rem;
  height: 1.2rem;
  bottom: auto;
}
</style>
