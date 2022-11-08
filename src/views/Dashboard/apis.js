import {
      SmallTeams
} from "./Data/SmallTeams"
import {
      ReleaseList
} from "./Data/Release"
import {
      PlanList
} from './Data/Plan'
export const getSmallTeams = () => {
      const res = SmallTeams
      return res
}
export const queryReleaseName = () => {
      const res = ReleaseList
      return res
}
const getCache = () => {
      return {
            admin: false,
            areas: [],
      }
}
export const checkUserRole = async () => {
      const result = await getCache()
      return result
}

export const getDevPlan = async ({
      smallTeams,
      releases
}) => {
      const params = {
            "area": '',
            "smallteam": smallTeams,
            "releases": releases
      }
      if (smallTeams.length === 1 && smallTeams[0] === 'null') {
            params.area = 'null'
            params.smallteam = []
      } else if (smallTeams.length === 0) {
            params.area = ''
      } else {
            params.area = smallTeams[0].split('/')[0]
      }

      const res = PlanList
      return res
}
export const updateReleaseLock = async (params) => {
      // const result = await axios.post('/development_plan/update_release_lock', params)
      const result = {
            data: null,
            msg: "权限不足",
            result_code: "500",
            show_msg: true,
      }
      console.log(result, 'updateReleaseLock   =====>');
      return result
}
export const copyTask = async (params) => {
      const result = {
            data: []
      }
      // await axios.postForce('/development_plan/copy_task', params)
      return result.data
}

import {
      rolesData
} from './Data/Roles'
export const getRolesByPid = async () => {
      const roles = rolesData
      return roles
}

/*
删除任务
/api/v1/development_plan/delete_task
post请求
{
"task_uid":"997981074f9e41469adbd748e735fdaf",//必填
}
*/
export const deleteTask = (params) => {
      const result = {
            data: null,
            msg: "权限不足",
            result_code: "500",
            show_msg: true,
      }
      return result
}
const updateTask = async (params, callback) => {
      try {
            const result = {
                  data: null,
                  msg: "权限不足",
                  result_code: "500",
                  show_msg: true,
            }
            console.log(result.data, 'result.data');
            if (result.data.result_code === '500') {
                  return Promise.reject(result.data.msg || '')
            }
            return result
      } catch (e) {
            console.error(e);
            callback && callback(e)
            return Promise.reject(e)
      }

}

const addReleaseOnline = async ({
      release,
      start_time
}) => {
      const getHtmlTemplate = (release) => {
            return (
                  `<div style="color: #000;">
                  <div style="margin-bottom: 5px; text-align: left;">
                      <div style="margin-bottom: 5px; text-align: center;">
                          <strong>攻防CE</strong>
                      </div>
                      <div style="margin-bottom: 5px; text-align: center;">
                          <strong>${release} (10.31-12.11) (12.12-12.25) (12.26-1.1) </strong>
                      </div>
                      <div style="margin-bottom: 5px; text-align: center;">
                          <strong>开发6周+转测2周+含比赛1周</strong>
                      </div>
                      <div style="margin-bottom: 5px; text-align: left;">
                          <strong>测试目标：</strong>
                      </div>
                      <div style="margin-bottom: 5px; text-align: left;">
                          <strong>攻防CE、Raid完整版CE、SOL 新手体验CE</strong>
                      </div>
                  </div>
              </div>`)
      }
      const params = {
            release,
            start_time,
            plan_base_info: getHtmlTemplate(release),
            area_core: `<strong style="color:#000;font-size:14px;">Area核心目标：</strong><br/><span style="color:#aaa;font-size:12px">xxxxxx.</span>`
      }
      const res = await postInterrupt()
      return res
}
const postInterrupt = () => {
      return {
            data: null,
            msg: "请填写正确日期格式 2099-09-21 11:11:11",
            result_code: "500",
            show_msg: true,
      }
}
