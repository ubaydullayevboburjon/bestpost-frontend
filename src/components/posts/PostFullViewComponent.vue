<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
props:{
    id:Number,
    title:String,
    description:String,
    imagPath:String,
    createdAt:String,
    updatedAt:String,
},
data(){
    
},
methods:{
    data(){
        const postId = this.$route.params.id
        console.log(postId);
    }
},
created(){

},
});
</script>

<template>

<div>
    <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, qui! Veniam reprehenderit tenetur explicabo dolores cupiditate quia voluptatem recusandae sapiente velit earum! Iusto aspernatur explicabo odit tempore, error adipisci quis!</h2>
</div>

</template>