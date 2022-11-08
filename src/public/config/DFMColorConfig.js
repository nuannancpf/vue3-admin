// import {theme} from '@/config'
const theme = 'default'
const themeColors = ['Light3' , 'Light2' , 'Light1' , 'default' , 'Deep1' , 'Deep2']
if(!theme){theme ='default'}
const index = themeColors.indexOf(theme) || 3
const colors = {
    default:{
        Blue: '#0052d9', // default
        Red: '#e34d59', // Danger
        Orange: '#ed7b2f', // Warning
        Green: '#078d5c', // Success
        Grey: '#242424', // Info
        // 辅色
        Cyan: '#0594fa',
        Purple: '#834ec2',
        Yellow: '#ebb105',
        Pink: '#bc0088',
    },
    Deep1:{
        Blue: '#0034b5',
        Red: '#611826',
        Orange: '#9e3610',
        Green: '#056334',
        Grey: '#181818',
        Cyan: '#0068c0',
        Purple: '#6d3bac',
        Yellow: '#8c5f00',
        Pink: '#bc0088',
    },
    Deep2:{
        Blue: '#001697',
        Red: '#680506',
        Orange: '#842b0b',
        Green: '#044f2a',
        Grey: '#0d0d0d',
        Cyan: '#00417d',
        Purple: '#421381',
        Yellow: '#5e3a00',
        Pink: '#7b0052',
    },
    Light1:{
        Blue: '#699ef5',
        Red: '#f36d78',
        Orange: '#f2955f',
        Green: '#00a870',
        Grey: '#9f9f9f',
        Cyan: '#31adfb',
        Purple: '#ae78f0',
        Yellow: '#fbca25',
        Pink: '#f6c',
    },
    Light2:{
        Blue: '#bbd3fb',
        Red: '#f8b9be',
        Orange: '#f7c797',
        Green: '#85dbbe',
        Grey: '#dadada',
        Cyan: '#85daff',
        Purple: '#d8abff',
        Yellow: '#ffe478',
        Pink: '#ffb2f2',
    },
    Light3:{
        Blue: '#ecf2fe',
        Red: '#fdecee',
        Orange: '#fef3e6',
        Green: '#e8f8f2',
        Grey: '#f3f3f3',
        Cyan: '#d6f7ff',
        Purple: '#f3eOff',
        Yellow: '#fff868',
        Pink: '#ffe9ff',
    },
}
const DFMColorConfig = {
    // 主题色
    themes: themeColors.map(item=>colors[item]),
    backgorund: '#fbfbfb',
    DFM: '#adef86',
    Topbar: '#fff'
}
const scene = {
    default: 'Blue', // default
    Danger:  'Red', // Danger
    Warning: 'Orange', //Warning
    Success: 'Green', // Success
    Info: 'Grey'
}

const ColorConfig = new Proxy(DFMColorConfig, {
    get(target, propKey = 'Blue/0'){
        if(['backgorund', 'DFM', 'Topbar'].some(item => item === propKey)){
            return target[propKey]
        }
        const [color = 'Blue', sign = 0] = propKey.split('/')
        return target.themes[index + (+sign)][
            new Proxy(scene, {
                get(o,p){
                    return o[p] || p
                }
            })[color]
        ]
    }
})

export default ColorConfig
