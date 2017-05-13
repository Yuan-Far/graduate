<template>
    <div class="about-header">
        <div class="about-title">
            <div class="about-wrapper">
                <i class="fa fa-angle-left" @click="back()"></i>                
                <p class="about-name"> {{headerTitle}} </p>
                <div>  </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: ['headerTitle'],
        name: 'v-about',
        data () {
            return {
                
            }
        },
        methods: {
            back() {
                history.go(-1)
            }
        }
    }
</script>
<style lang="less">
    .about-header {
        width: 100%;
        .about-title {
            height: 50px;
            background: #428DFF;
            line-height: 50px;
            .about-wrapper {
                margin: 0 4%;
                display: flex;
                justify-content: space-between;
                color: #fff;  
                i {
                    line-height: 50px;
                    display: inline-block;
                    font-size: 26px;
                }
                p {
                    font-size: 18px;
                }
            }
        }
    }
</style>