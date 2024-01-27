import yup from './settings'

const validateTransaction = yup.object().shape({
    value: yup.number().required().min(0),
    date: yup.date().required(),
    type: yup.string().required().oneOf(['entrada', 'saída'])
})

export default validateTransaction