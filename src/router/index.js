import { createRouter, createWebHistory } from "vue-router";
import MainComp from '../pages/MainComp'
import UploadComp from '../components/UploadComp'


const routes = [
    { path : '/', name : 'MainComp', component : MainComp },
    { path : '/fileupload', name : 'FileUpload', component : UploadComp },
    // { path : '/404', name : 'Not-Found', component : Error },
    // { path: '/:pathMatch(.*)*', redirect : '/404' }
]

const router = createRouter({
    history : createWebHistory(), routes
})

export default router;