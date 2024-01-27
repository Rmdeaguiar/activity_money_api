import yup from './settings'

const validateUser = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
})

export default validateUser