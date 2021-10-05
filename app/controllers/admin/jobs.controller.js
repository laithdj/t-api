const constants = require('../../helpers/constants.helpers');
const jobService = require('../../services/job.service');
const apiResp = require('../../helpers/apiResponse.helper');
const expressFile = require('../../helpers/expressFileUpload.helper')

module.exports = {
    create: async (req, res) => {
        const { title, description, catagory } = req.body;

        await jobService.create({ title, description, catagory })
        apiResp.sendMessage(res, constants.JOB_CREATED)
    },
    find: async (req, res) => {
        const { _id } = req.params;
        const task = await jobService.find(_id);
        const data = {
            _id: task._id,
            title: task.title,
            description: task.description,
            catagory: task.catagory,
            jobCreatedDate: new Date(task.createdAt).toLocaleString(),
        }
        apiResp.sendData(res, data, constants.DATA_LOADED)
    },
    list: async (req, res) => {
        let { page, keyword, perPage } = req.query
        let $where = {}
        if ((typeof page === 'undefined') || (page === null) || (parseInt(page) < 1)) {
            page = 0
        }
        if ((typeof perPage === 'undefined') || (perPage === null) || (parseInt(perPage) < 1)) {
            perPage = 10
        }
        page--
        page = Math.max(0, page)

        if (typeof keyword !== 'undefined' && keyword !== '' && keyword !== null && keyword !== 'null') {
            $where = { title: { $regex: '.*' + keyword + '.*' } }
        }
        const result = await jobService.get($where, parseInt(perPage), page)
        const totalRecord = await jobService.count($where)
        page++
        const list = []
        for (const task of result) {
            list.push({
                _id: task._id,
                title: task.title,
                description: task.description,
                catagory: task.catagory,
                taskCreatedDate: new Date(task.createdAt).toLocaleString(),
            })
        }
        const data = {
            page: page,
            perPage: perPage,
            totalRecords: totalRecord,
            data: list
        }

        apiResp.sendData(res, data, constants.DATA_LOADED)
    },

}
