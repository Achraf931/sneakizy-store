<template>
    <article>
        <div>
            <h3 class="colorUmbrella fontBold">{{article.title}}</h3>
            <h4>{{article.content.slice(0, 220)}}...</h4>
            <router-link class="seeArticle" :to="{name: 'singleArticle', params: {id: article.id}}">
                <button class="button colorUmbrella mrBottom20">Lire l'article</button>
            </router-link>
        </div>
        <div>
            <img :src="article.banner" :alt="article.title">
        </div>
    </article>
</template>
<script>
    export default {
        props: ['article']
    }
</script>
<style lang="scss" scoped>
    article {
        height: 100%;
        display: flex;
        flex-direction: row;
        width: 100%;

        & > div:first-child {
            width: 35%;
            padding: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: white;
            border-radius: 10px 0 0 10px;

            h4 {
                line-height: 25px;
                margin: 20px 0;
            }

            .seeArticle {
                width: fit-content;

                button {
                    border: 1px solid #591df1;
                    font-family:  Norms, Arial, sans-serif;
                    font-size: 16px;
                    padding: 10px 15px;
                    border-radius: 10px;
                    background: white;
                    cursor: pointer;
                    transition: background .2s;
                }
            }
            .seeArticle:hover > button {
                background: #591df1;
                color: white!important;
            }
        }
        & > div:last-child {
            width: 65%;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 0 10px 10px 0;
            }
        }
    }
    @media all and (max-width: 749px) {
        article {
            flex-direction: column;

            & > div {
                width: 100%!important;
                height: 100%;
                max-height: 300px;
                border-radius: 0!important;

                img {
                    border-radius: 0!important;
                }
            }
        }
    }
    @media all and (max-width: 334px) {
        article > div:first-child h4 {
            line-height: initial;
        }
    }
</style>
