<template>
    <button @click="getExcel">Excel Download</button>
    <ag-grid-vue ref="gridRef"
        style="width: 500px; height: 200px"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
    />
    <input type="text" name="" id="fileInput">
    <button @click="openWindow">Open Window</button>
</template>
<script>
import { ref } from 'vue'
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import { AgGridVue } from "ag-grid-vue3"
import * as XLSX from 'xlsx/xlsx.mjs';

export default {
    name : 'MainComp',
    setup(){
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
        const data = gridRef.value.rowData; //AG-Grid Data
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);      //JSON to Sheet
        XLSX.utils.book_append_sheet(wb, ws, 'sheet1'); //시트 생성
        XLSX.writeFile(wb, 'result.xlsx'); //xlsx 다운로드
        }

        const openWindow = () => {
            const _window = window.open('http://127.0.0.1:8080/fileupload', '', "width=600,height=400,left=200,top=200");
            console.log(_window)
        }

        return {
            gridRef,
            columnDefs,
            rowData,
            getExcel,
            openWindow
        };
    },
    components: {
        AgGridVue,
    },
}
</script>
