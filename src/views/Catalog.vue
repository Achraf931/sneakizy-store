<template>
    <div class="catalog">
        <div id="boxBrands" class="boxShadow">
            <router-link :to="{name: 'catalog'}" :class="{line: brandName == 0}" style="border-bottom: 1px solid transparent; height: 50px; margin-right: 10px; display: flex; align-items: center; justify-content: center">
                <p @click="brandName = 0" class="all">All</p>
            </router-link>
            <div id="containerBrands">
                <router-link :to="{name: 'brandProducts', params: {id: brand.id}}" :class="{line: brandName == brand.id}" class="brands" v-for="brand in brands" :key="brand.index">
                    <img @click="brandName = brand.id" :src="brand.image" :alt="brand.name">
                </router-link>
            </div>
            <div class="mrLeft10 dFlex alignCenter justifyCenter flexColumn">
                <p class="fontS12">Total</p>
                <p style="width: 20px; height: 20px" class="dFlex justifyCenter alignCenter colorWhite bgUmbrella fontS12 bRadius">{{infos.total}}</p>
            </div>
        </div>

<!--        <div v-if="banner !== 'All' && banner !== ''" class="banner">
            <img :src="banner" :alt="banner">
        </div>-->
            <Brand/>
            <div class="containerButtonsPage" v-if="infos.last_page > 1">
                <button :class="{disabled: infos.current_page === 1}" class="arrowPagination boxShadow" :disabled="infos.current_page === 1" @click="routeName === 'catalog' ? getProducts(1) : brandProducts(routeBrandId, 1)"><font-awesome-icon icon="angle-double-left"/></button>
                <button :class="{disabled: infos.current_page === 1}" class="arrowPagination boxShadow" :disabled="infos.current_page === 1" @click="routeName === 'catalog' ? getProducts(infos.current_page-1) : brandProducts(routeBrandId, infos.current_page-1)"><font-awesome-icon icon="angle-left"/></button>
                <div :class="{isActive: infos.current_page === page}" class="buttonPage" v-for="page in infos.last_page" @click="routeName === 'catalog' ? getProducts(page) : brandProducts(routeBrandId, page)">{{page}}</div>
                <button :class="{disabled: infos.current_page === infos.last_page}" class="arrowPagination boxShadow" :disabled="infos.current_page === infos.last_page" @click="routeName === 'catalog' ? getProducts(infos.current_page+1) : brandProducts(routeBrandId, infos.current_page+1)"><font-awesome-icon icon="angle-right"/></button>
                <button :class="{disabled: infos.current_page === infos.last_page}" class="arrowPagination boxShadow" :disabled="infos.current_page === infos.last_page" @click="routeName === 'catalog' ? getProducts(infos.last_page) : brandProducts(routeBrandId, infos.last_page)"><font-awesome-icon icon="angle-double-right"/></button>
            </div>
    </div>
</template>

<script>
    import Brand from '../components/catalog/Brand'
    import {mapGetters} from 'vuex'

    export default {
        name: 'catalog',
        data() {
            return {
                banner: '',
                count: '',
                brandName: Object.keys(this.$route.params).length === 0 ? 0 : this.$route.params.id
            }
        },
        components: {
            Brand
        },
        watch: {
            routeBrandId(newVal) {
                this.toggleProducts(newVal)
            }
        },
        computed: {
            routeName() {
                return this.$route.name
            },
            routeBrandId() {
                return this.$route.params.id
            },
            ...mapGetters({
                infos: 'products/infos',
                brands: 'brands/brands'
            })
        },
        mounted() {
            this.$store.dispatch('brands/getBrands')
            this.toggleProducts(this.routeBrandId)

            setTimeout(() => {
                let elem = document.getElementById('containerBrands')
                    elem.style.display = '-webkit-inline-box'
                    elem.style.opacity = '1'
            }, 50)
        },
        methods: {
            toggleProducts(id) {
                if(this.routeName === 'brandProducts') {
                    this.$store.dispatch('products/getBrandProducts', {id: id, page: 1})
                }
                else if(this.routeName === 'catalog') {
                    this.$store.dispatch('products/getProductsWithPaginate', {page: 1})
                }
            },
            getProducts(page) {
                this.brandId = 0
                this.$store.dispatch('products/getProductsWithPaginate', {page})
            },
            brandProducts(id, page) {
                this.brandId = id
                this.$store.dispatch('products/getBrandProducts', {id, page})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .disabled {
        background-color: #F9F9FC!important;

        svg {
            color: #E1E4F5;
        }
    }
    .isActive {
        background: #591df1!important;
        color: white!important;
    }
    .line {
        border-bottom: 1.5px solid black!important;
    }
    .catalog {
        margin-top: 20px;
        padding-bottom: 40px;
    }

    .banner {
        display: flex;
        justify-content: center;
        width: 100%;

        & > img {
            max-width: 600px;
            width: 100%;
            max-height: 250px;
            height: 100%;
        }
    }

    .containerButtonsPage {
        max-width: 290px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction:row;
        margin: 20px auto auto auto;
        background: white;
        padding: 15px;
        border-radius: 10px;

        .buttonPage, .arrowPagination {
            cursor: pointer;
            color: #93a2dd;
            width: 30px;
            border: none;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            margin: 0 8px;
            padding: 10px 15px;
            transition: all .3s ease;
        }

        .buttonPage:hover, .arrowPagination:hover {
            background-color: #591df1;
            color: white;
        }

        .arrowPagination {
            background-color: #f0f3ff;
        }
    }

    #boxBrands {
        max-width: calc(100% - 200px);
        width: 100%;
        margin: auto;
        display: flex;
        border-radius: 10px;
        background: white;
        padding: 5px 15px;

        .all {
            scroll-snap-align: start;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            color: white;
            font-weight: bold;
            background: black;
            border-radius: 100%;
            font-size: 12px;
            cursor: pointer;
        }

        #containerBrands {
            display: none;
            opacity: 0;
            margin: auto;
            width: fit-content;
            overflow-x: auto;
            overflow-y: hidden;
            overscroll-behavior-x: contain;
            scroll-snap-type: x mandatory;

            .brands {
                scroll-snap-align: center;
                width: 50px;
                height: 50px;
                margin: 0 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid transparent;

                & > img {
                    width: 100%;
                    cursor: pointer;
                    transition-duration: 200ms;
                }
            }
            .brands:hover > img{
                transition-duration: 200ms;
                transform: scale(1.1);
            }
            .brands:first-child {
                margin-left: 0;
            }
        }
    }
    .containerProducts {
        margin-top: 20px;
        display: grid;
        grid-gap: 46px;
        width: 100%;
        justify-content: center;
        grid-template-columns: repeat(auto-fit, 300px);
    }
    @media all and (max-width: 838px) {
        #boxBrands {
            max-width: 100%;
        }
        ::-webkit-scrollbar {
            display: none;
        }
    }
    @media all and (max-width: 645px) {
        .containerProducts {
            grid-gap: 10px;
        }
    }

    @media all and (max-width: 616px) {
        section {
            padding-bottom: 20px;
        }
    }
</style>
