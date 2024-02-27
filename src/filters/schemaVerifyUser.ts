import yup from './settings'

const validateUser = yup.object().shape({
    username: yup.string().required('Username obrigatório'),
    password: yup.string().required('Senha obrigatória')
})

export default validateUser