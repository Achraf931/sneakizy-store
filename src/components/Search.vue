<template>
    <div style="width: fit-content; margin: auto">
        <input autocomplete="off" v-model="search" @keyup.enter="sendWithEnter" type="text" placeholder="ex. Air Jordan 1">
        <font-awesome-icon @click="sendSearch" style="color: #2c3e50; font-size: 20px; cursor: pointer" icon="search"/>
    </div>
</template>
<script>
    export default {
        props: ['isSearching'],
        data() {
            return {
                search: ''
            }
        },
        methods: {
            sendSearch() {
                if (this.search === '') {
                    return
                }
                this.bus.$emit('search', this.strUcFirst(this.search))
            },
            sendWithEnter() {
                this.sendSearch()
                if (this.search != '') {
                    if (this.$route.name !== 'searchingPage') {
                        this.$router.push({name: 'searchingPage'})
                    }
                }
                this.search = ''
            },
            strUcFirst(a) {
                return (a+'').charAt(0).toUpperCase()+a.substr(1)
            }
        }
    }
</script>
<style lang="scss" scoped>
    div {
        position: relative;
        width: 100%;
        height: 100%;
        max-height: 38px;

        svg {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: darkgrey!important;
        }
        input {
            width: 150px;
            padding: 4px 40px 4px 12px;
            font-size: 1rem;
            color: #000000;
            line-height: 1.4;
            text-transform: none;
            border-radius: 10px;
            background-clip: padding-box;
            background-color: #f5f4fa;
            border: none;
            box-sizing: border-box;
        }
        input::placeholder {
            color: darkgrey;
        }
    }
</style>
