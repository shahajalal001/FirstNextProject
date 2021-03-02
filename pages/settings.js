import {Breadcrumb, Form, Input} from 'antd'
import {useEffect} from 'react'
import Link from 'next/link'
import {getSettings, updateSettings} from '../app/features/settings'
import Swal from 'sweetalert2'

const Settings = () => {
    const [productForm] = Form.useForm()
    const [cashbackForm] = Form.useForm()
    const [offerForm] = Form.useForm()

    useEffect(() => {
        getSettings().then(({error, data}) => {
            if(!error) {
                productForm.setFieldsValue(data)
                cashbackForm.setFieldsValue(data)
                offerForm.setFieldsValue(data)
            }
        })
    }, [])

    const handleUpdate = async settings => {
        let {error, msg, data} = await updateSettings(settings)
        if(error){
            await Swal.fire('Error', msg, 'error')
        }else{
            await Swal.fire('Success', 'Store updated successfully', 'success')
            productForm.setFieldsValue(data)
            cashbackForm.setFieldsValue(data)
            offerForm.setFieldsValue(data)
        }
    }
}