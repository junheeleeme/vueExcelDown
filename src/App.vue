<template>
  <button @click="getExcel">Excel Download</button>
  <ag-grid-vue ref="gridRef"
    style="width: 500px; height: 200px"
    class="ag-theme-alpine"
    :columnDefs="columnDefs"
    :rowData="rowData"
  >
  </ag-grid-vue>
</template>

<script>
import { ref } from 'vue'
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import { AgGridVue } from "ag-grid-vue3"
import * as XLSX from 'xlsx/xlsx.mjs';

export default {
  name: "App",
  setup() {
    const gridRef = ref(null); //aggrid body
    const columnDefs = [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" },
    ];
    const rowData = ref([
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
    ]);

    const getExcel = () => {
      
      // const data = gridRef.value.gridOptions.rowData; //AG-Grid Data
      const data = gridRef.value.rowData; //AG-Grid Data
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
      XLSX.writeFile(wb, 'result.xlsx'); //xlsx 다운로드
    }

    return {
      gridRef,
      columnDefs,
      rowData,
      getExcel,
    };
  },
  components: {
    AgGridVue,
  },
};
</script>