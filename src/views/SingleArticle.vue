<template>
    <div class="article">
        <div class="boxShadow bRadius bgWhite padding15">
            <h2>{{article.title}}</h2>
            <img :src="article.banner" :alt="article.title">
            <h2 class="marginBottom">{{article.summary}}</h2>
            <p>{{article.content}}</p>
            <p class="mrTop20">Author: {{article.author}}</p>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'singleArticle',
        computed: {
            ...mapGetters({
                article: 'news/article'
            })
        },
        beforeMount() {
            this.$store.dispatch('news/getArticle', this.$route.params.id)
        }
    }
</script>
<style lang="scss" scoped>
    .article {
        max-width: 1500px;
        width: 100%;
        margin: 20px 0 80px 0!important;
        padding: 0 100px 40px 100px;

        .marginBottom {
            margin-bottom: 20px;
        }
        img {
            width: 100%;
            margin: 20px 0;
        }
        p {
            text-align: justify;
        }
    }
    @media all and (max-width: 616px) {
        .article {
            padding: 0 15px 15px 15px;
        }
    }
</style>
