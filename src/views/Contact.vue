<template>
    <div class="contact">
        <div class="boxShadow">
            <div class="left" style="margin-top: 20px">
                <h2 class="sendTitle colorUmbrella">Envoyez nous un message</h2>
                <div class="formGroup">
                    <div class="vuelidate" :class="{errorForm: $v.form.lastname.$error}">
                        <label class="labelColor" for="lastname">Nom</label>
                        <input type="text" id="lastname" v-model="form.lastname" @input="setLastname($event.target.value)" placeholder="Entrez votre nom">
                    </div>
                    <div class="vuelidate" :class="{errorForm: $v.form.firstname.$error}">
                        <label class="labelColor" for="firstname">Prénom</label>
                        <input type="text" id="firstname" v-model="form.firstname" @input="setFirstname($event.target.value)" placeholder="Entrez votre prénom">
                    </div>
                </div>
                <div class="group vuelidate" :class="{errorForm: $v.form.email.$error}">
                    <label class="labelColor" for="email">Email</label>
                    <input type="email" id="email" v-model="form.email" @input="setEmail($event.target.value)" placeholder="Entrez votre adresse mail">
                </div>
                <div class="group vuelidate" :class="{errorForm: $v.form.object.$error}">
                    <label class="labelColor" for="object">Objet</label>
                    <input type="text" id="object" v-model="form.object" @input="setObject($event.target.value)" placeholder="Objet">
                </div>
                <div class="vuelidate" :class="{errorForm: $v.form.message.$error}">
                    <label class="labelColor" for="message">Message</label>
                    <textarea id="message" v-model="form.message" @input="setMessage($event.target.value)" placeholder="Entrez votre message"></textarea>
                </div>
                <button class="buttonSend" @click.prevent="sendMail">Envoyer</button>
                <p style="font-size: 10px" class="labelColor mrTop10 fontItalic">Tous les champs sont obligatoires.</p>
            </div>
            <div class="right bgUmbrella">
                <h2>Contact</h2>
                <p>19 rue Yves Toudic 75010 Paris</p>
                <p>01 42 41 97 76</p>
                <p>contact@ecole-webstart.com</p>
            </div>
        </div>
        <iframe class="boxShadow" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.3564642210686!2d2.3608514158922684!3d48.87048077928859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e0989542143%3A0x9384848c375ced98!2s%C3%89cole%20Webstart!5e0!3m2!1sfr!2sfr!4v1587739659654!5m2!1sfr!2sfr" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    </div>
</template>
<script>
    import axios from 'axios'
    import {required, email} from 'vuelidate/lib/validators'

    export default {
        name: 'contact',
        data() {
            return {
                form: {
                    lastname: '',
                    firstname: '',
                    email: '',
                    object: '',
                    message: ''
                }
            }
        },
        validations: {
            form: {
                lastname: {
                    required
                },
                firstname: {
                    required
                },
                email: {
                    email,
                    required
                },
                object: {
                    required
                },
                message: {
                    required
                }
            }
        },
        methods: {
            setLastname(value) {
                this.form.lastname = value
                this.$v.form.lastname.$touch()
            },
            setFirstname(value) {
                this.form.firstname = value
                this.$v.form.firstname.$touch()
            },
            setEmail(value) {
                this.form.email = value
                this.$v.form.email.$touch()
            },
            setObject(value) {
                this.form.object = value
                this.$v.form.object.$touch()
            },
            setMessage(value) {
                this.form.message = value
                this.$v.form.message.$touch()
            },
            sendMail() {
                this.$v.form.$touch()
                if (this.$v.$invalid) {
                    this.$store.dispatch("notifications/AddNotification", {notification: "Le formulaire n'est pas rempli correctement, veuillez bien remplir les champs en rouge", type: 0})
                } else {
                    this.$store.dispatch("loader/OpenLoader", true)
                    axios.post('/api/contact', this.form).then(() => {
                        this.form = {}
                        this.$v.$reset()
                        this.$store.dispatch("loader/OpenLoader", false)
                        this.$store.dispatch("notifications/AddNotification", {notification: "Message envoyé avec succès !", type: 1})
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .errorForm {
        label {
            color: red;
        }
        input, textarea {
            border: 1px solid red!important;
        }
    }
    .notError {
        label {
            color: initial;
        }
        input, textarea {
            border: 1px solid rgba(116, 142, 170, 0.25);
        }
    }
    .contact {
        margin-bottom: 70px!important;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        iframe {
            margin: 40px 0 20px 0;
            max-width: 1000px;
            width: 100%;
        }
        h2 {
            margin-bottom: 20px;
        }

        & > div {
            border-radius: 10px;
            max-width: 1000px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .left {
                background-color: white;
                width: 60%;
                padding: 20px;
                border-radius: 10px;

                .buttonSend {
                    color: white;
                    background-color: #6FBD13;
                    display: inline-block;
                    font-weight: 400;
                    text-align: center;
                    margin-top: 20px;
                    vertical-align: middle;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    padding: .375rem .75rem;
                    font-size: 1rem;
                    line-height: 1.5;
                    border-radius: 10px;
                    cursor: pointer;
                    border: 1px solid #6FBD13;
                }

                #message {
                    min-height: 100px;
                }
                .group {
                    margin-bottom: 20px;
                }
                .formGroup {
                    display: flex;
                    margin-bottom: 20px;
                    flex-direction: row;
                    justify-content: space-between;

                    & > div {
                        display: flex;
                        flex-direction: column;
                        width: 50%;
                    }
                    & > div:first-child {
                        padding-right: 10px;
                    }
                    & > div:last-child {
                        padding-left: 10px;
                    }
                }

                label {
                    font-size: 13.333px;
                }

                input, textarea {
                    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                    margin-top: 3px;
                    padding: 15px;
                    width: 100%;
                    border-radius: 5px;
                    border: 1px solid #dcdcdc;
                }

                input:focus, textarea:focus {
                    border: 1px solid #591df1;
                }
            }
            .right {
                color: white;
                border-radius: 0 10px 10px 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                padding: 40px;
                width: 40%;
                font-family: NormsBold, Norms, Arial, sans-serif;
            }
        }
    }
    @media all and (max-width: 837px) {
        .contact > div {
            flex-direction: column;

            .left, .right {
                border-radius: 0;
                width: 100%;
            }
        }
    }
</style>
