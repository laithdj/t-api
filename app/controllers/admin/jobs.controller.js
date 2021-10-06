const constants = require('../../helpers/constants.helpers');
const jobService = require('../../services/job.service');
const jobApplicantService = require('../../services/jobApplicant.service');
const apiResp = require('../../helpers/apiResponse.helper');
const expressFile = require('../../helpers/expressFileUpload.helper')

module.exports = {
    create: async (req, res) => {
        const { title, description, category } = req.body;

        await jobService.create({ title, description, category })
        apiResp.sendMessage(res, constants.JOB_CREATED)
    },
    find: async (req, res) => {
        const { _id } = req.params;
        const task = await jobService.find(_id);
        const data = {
            _id: task._id,
            title: task.title,
            description: task.description,
            category: task.category,
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
            $where = {
                $or: [
                    { title: { $regex: '.*' + keyword + '.*' } },
                    { category: { $regex: '.*' + keyword + '.*'} }
                ]
            }
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
                category: task.category,
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
    jobApplication: async (req, res) => {
        const { jobId, name, email } = req.body;
        let resume = ""
        if (req.files) {

            const result = await expressFile.uploadFile(req.files.resume, process.env.applicantsResume)
            if (!result.status) {
                throw new Error(result.message)
            }
            resume = result.message
        }
        else {
            throw new Error("Kindly upload your resume")
        }
        const data = {
            name,
            email,
            jobId,
            resume: resume
        }
        await jobApplicantService.create(data)
        apiResp.sendMessage(res, constants.JOB_APPLIED)
    },
}
