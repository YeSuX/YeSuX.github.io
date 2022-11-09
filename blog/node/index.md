<script setup>
import {outline} from './outline.ts'
import { useData,useRouter } from 'vitepress'
import { darkTheme } from 'naive-ui'
import {computed} from 'vue'
import {title2route} from '/utils/common.ts'

const {isDark} = useData()
const {go,route} = useRouter()

const theme = computed(()=>{
    return isDark.value?darkTheme:null
})

const goto = (title)=>{
    const {path} = route
    go(title2route(title,path))
}

</script>
<style scoped>
    .node-outline{
        cursor: pointer;
    }
</style>
<style>
    .canHover::before {  
        transform: scaleX(0);
        transform-origin: bottom right;
    }

    .canHover:hover::before {
        transform: scaleX(1);
        transform-origin: bottom left;
    }

    .canHover::before {
        content: " ";
        display: block;
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        inset: 0 0 0 0;
        background: #65B687;
        z-index: -1;
        transition: transform 1s ease;
    }
</style>

# NodeJS Outline

<br/>

<n-config-provider :theme="theme">
    <n-timeline>
        <n-timeline-item
            v-for="item in outline"
            :type="item.type"
            :title="item.title"
            :content="item.content"
            :line-type="item.type?'default':'dashed'"
            class="node-outline canHover"
            @click="goto(item.title)"
        />
    </n-timeline>
</n-config-provider>