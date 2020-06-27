<template>
    <div class="containerProducts">
        <p class="bgWhite bRadius padding10 widthContent mrAuto" v-if="products.length === 0">Il n'y a aucune paire pour cette marque</p>
        <Product v-else v-for="product in products" :key="product.id" :brands="brands" :product="product"/>
    </div>
</template>
<script>
    import {mapGetters} from "vuex"
    import Product from "../Product"
    import Vue from 'vue'

    export default {
        name: 'brand',
        computed: {
            ...mapGetters({
                brands: 'brands/brands',
                products: 'products/productsWithPaginate'
            })
        },
        components: {
            Product
        }
    }
</script>
