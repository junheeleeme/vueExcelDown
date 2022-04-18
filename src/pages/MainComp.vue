<template>

    <div class="top-wrap">
        <button @click="getExcelDown">샘플 엑셀 다운로드</button>
        <input type="file" @change="setExcelUpload" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
    </div>

    <ag-grid-vue ref="gridRef"
        style="width: 500px; height: 200px"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="excelData"
    />
    <p>1. 샘플 엑셀 다운로드 클릭</p>
    <p>2. 파일 저장</p>
    <p>3. 파일 선택 클릭 후 다운받은 엑셀 파일 선택</p>

<!-- <button @click="openWindow">Open Window</button> -->
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

        // const openWindow = () => {
        //     const _window = window.open('http://127.0.0.1:8080/fileupload', '', "width=600,height=400,left=200,top=200");
        //     console.log(_window)
        // }

        return {
            gridRef,
            columnDefs,        
        };
    },
    data(){
        return{
            sampleData : [
                { make: "Toyota", model: "Celica", price: 35001 },
                { make: "Ford", model: "Mondeo", price: 32000 },
                { make: "Porsche", model: "Boxter", price: 72000 },
            ],
            excelData : [] //업로드 후 받아올 데이터
        }
    },
    methods : {
        getExcelDown(){            
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(this.sampleData);      //JSON to Sheet
            XLSX.utils.book_append_sheet(wb, ws, 'sheet1'); //시트 생성
            XLSX.writeFile(wb, 'result.xlsx'); //xlsx 다운로드
        },
        setExcelUpload(e){
            const file = e.target.files[0];
            const reader = new FileReader();
            let tmpResult = {};
            reader.onload = () => {
                const data = reader.result;
                let workbook = XLSX.read(data, {type: 'binary'});
                workbook.SheetNames.forEach(sheetName => {
                    const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    tmpResult = roa;
                });
                this.excelData=tmpResult;
                console.log(this.excelData)
            };
            reader.readAsBinaryString(file);
        }
    },
    components: {
        AgGridVue,
    },
}
</script>
<style>
.top-wrap>input{
    margin: 0.5rem;
}
</style>