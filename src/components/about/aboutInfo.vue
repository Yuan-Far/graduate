<template lang="html">
    <div class="info-content">
        <v-about  header-title="关于"></v-about> 
        <div class="info-about">
            <img class="info-logo" src="../../assets/images/ico.png">
            <div class="info-aboutme">
                Yuan
            </div>
            <div class="info-version">
                version 0.0.9
            </div>
            <div class="info-copyright">
                &copy Copyright 2017 All Rights Reserved
            </div>
        </div>
    </div> 
</template>

<script>
import vAbout from './aboutHeader.vue'
export default {
    components: {
        vAbout
    }
}
</script>

<style lang="less">
    .info-about {
        margin-top: 60px;
        line-height: 40px;
        .info-logo {
            width: 60px;
            height: 60px;
        }
    }
</style>
