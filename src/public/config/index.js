// import houseEditorConfig from './houseEditorConfig'
import DFMColorConfig from './DFMColorConfig'
import priorityConfig from './priorityConfig'
import houseMenuConfig from './houseMenuConfig'

const GLOBAL_HISTORY_AREA = "global_area_history"
const roleData = {
    "support": '支持',
    "plan": "策划",
    "client": "客户端",
    "server": "服务器",
    "multimedia": "多媒体",
    "TA": "TA",
    "concept": "原画",
    "model": "模型",
    "animator": "动作",
    "VFX": "特效",
    "sound": "音频",
    "APO": "APO",
    "UX": "UX",
    "PM": "PM",
    "QA": "QA"
}

const bugStatus = [
    {
        label: '新',
        value: 'new'
    },
    {
        label: '接受/处理',
        value: 'in_progress'
    },
    {
        label: '已解决',
        value: 'resolved'
    },
    {
        label: '重新打开',
        value: 'reopened'
    },
    {
        label: '已拒绝',
        value: 'rejected'
    },
    {
        label: '已关闭',
        value: 'closed'
    },
    {
        label: '挂起',
        value: 'suspended'
    },
]

const storyStatus = [
    {
        label: '未开始',
        value: 'new'
    },
    {
        label: '规划中',
        value: 'planning'
    },
    {
        label: '已评审',
        value: 'audited'
    },
    {
        label: '实现中',
        value: 'in_progress'
    },
    {
        label: '合入中',
        value: 'status_1'
    },
    {
        label: '验收中',
        value: 'product_experience'
    },
    {
        label: '测试中',
        value: 'testing'
    },
    {
        label: '已实现',
        value: 'resolved'
    },
    {
        label: '挂起',
        value: 'suspended'
    },
    
]

const storyPriority = [
    { value: '4', label: 'High' },
    { value: '3', label: 'Middle' },
    { value: '2', label: 'Low' },
    { value: '1', label: 'Nice To Have' },
]
const bugPriority = [
    { value: 'urgent', label: '紧急' },
    { value: 'high', label: '高' },
    { value: 'medium', label: '中' },
    { value: 'low', label: '低' },
    { value: 'insignificant', label: '无关紧要' },
]

const FILTER_TYPES = [
    {
        label: 'stroy',
        name: '需求'
    },
    {
        label: 'bug',
        name: '缺陷'
    }
]
const statusFilter = {
    developing:{
        name: '实现中',
        label: 'developing',
        bug:['new', 'in_progress', 'reopened'],
        story: ['new', 'planning', 'in_progress', 'audited', 'status_1']
    },
    acceptance: {
        name: '验收中',
        label: "acceptance",
        bug: ['resolved'],
        story: ['product_experience']
    },
    completed: {
        name: '已完成',
        label: 'completed',
        bug: ['rejected', 'closed', 'suspended'],
        story: ['testing', 'resolved', 'suspended']
    }
}

const fieldIds = isBug => new Proxy({
    bug: {
        'owner': 'current_owner',
        'dev': 'fixer',
        'tester': 'confirmer',
        'iterationId': 'iteration_id',
        'releaseId': 'release_id',
        'smallTeam': 'custom_field_16',
        'priority': 'priority'
    },
    story: {
        'dev': 'developer',
        'tester': 'custom_field_30',
        'iterationId': 'iteration_id',
        'releaseId': 'release_id',
        'smallTeam': 'custom_field_46',
        'priority': 'priority'
    }
}, {
    get(o, prop) {
        if (isBug && o.bug[prop]) {
            return o.bug[prop]
        } else if (!isBug && o.story[prop]) {
            return o.story[prop]
        }
        return prop
    }
})

export {
    roleData,
    bugStatus,
    storyStatus,
    storyPriority,
    bugPriority,
    statusFilter,
    fieldIds,
    FILTER_TYPES,
    GLOBAL_HISTORY_AREA,
    // houseEditorConfig,
    DFMColorConfig,
    priorityConfig,
    houseMenuConfig
}
