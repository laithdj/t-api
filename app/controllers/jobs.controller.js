const constants = require('../helpers/constants.helpers');
const jobService = require('../services/job.service');
const jobApplicantService = require('../services/jobApplicant.service');
const apiResp = require('../helpers/apiResponse.helper');
const expressFile = require('../helpers/expressFileUpload.helper')
const emailHelper = require('../helpers/email.helper');

module.exports = {
    create: async (req, res) => {
        console.log(req)
        const { title, description, category, country, taskCreatedDate } = req.body;

        await jobService.create({ title, description, category, country, taskCreatedDate })
        apiResp.sendMessage(res, constants.JOB_CREATED)
    },
    list: async (req, res) => {
        let { page, keyword, perPage } = req.query
        let $where = {}
        if ((typeof page === 'undefined') || (page === null) || (parseInt(page) < 1)) {
            page = 0
        }
        if ((typeof perPage === 'undefined') || (perPage === null) || (parseInt(perPage) < 1)) {
            perPage = 200
        }
        page--
        page = Math.max(0, page)

        if (typeof keyword !== 'undefined' && keyword !== '' && keyword !== null && keyword !== 'null') {
            $where = {
                $or: [
                    { title: { $regex: '.*' + keyword + '.*' } },
                    { category: { $regex: '.*' + keyword + '.*' } }
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
                country: task.country,
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
        console.log(req.body)
        const checkAlreadyApply = await jobApplicantService.findByQuery({ email: email, jobId: jobId });
        if (checkAlreadyApply.length === 0) {

            let resume = "";

            if (req.files) {
                const result = await expressFile.uploadFile(req.files.resume, process.env.applicantsResume)
                if (!result.status) {
                    throw new Error(result.message)
                }
                resume = result.message
            } else {
                throw new Error(constants.RESUME_REQUIRED, constants.BAD_REQUEST_CODE)
            }
            const data = {
                name,
                email,
                jobId,
                resume: resume
            }
            await jobApplicantService.create(data)
            apiResp.sendMessage(res, constants.JOB_APPLIED)
            const jobData = await jobService.find(jobId)
            // to, subject, template, data
            emailHelper.send('laithajail@gmail.com', 'Job Application', 's', { name: name, title: jobData.title }, resume)
        } else {
            apiResp.sendError(res, constants.ALREADY_JOB_APPLIED, constants.BAD_REQUEST_CODE)
        }

    },
    jobtest:async (req, res) => {
        apiResp.sendData(res, req, constants.DATA_LOADED)
    }
}
