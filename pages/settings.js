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

    return (
        <>
            <div className='py-2 mb-6'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                    <Link href='/'>
                            <a className='hover:text-gray-800'>Home</a>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Settings</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/3 pr-6'>
                    <div className='bg-white p-6 shadow-c-2 rounded'>
                        <h1 className='text-lg font-bold mb-4'>Product count range</h1>
                        <hr className='w-12 mb-4'/>
                        <Form layout='vertical' form={productForm} onFinish={handleUpdate}>
                            <FormItem name='products_count_range'/>
                            <button className='bg-primary text-white px-6 py-2 rounded hover:text-white hover:bg-primary-hover mb-2'>
                                Update
                            </button>
                        </Form>
                    </div>
                </div>
                <div className='w-full md:w-1/3 pr-6'>
                    <div className='bg-white p-6 shadow-c-2 rounded'>
                        <h1 className='text-lg font-bold mb-4'>Cashback Range</h1>
                        <hr className='w-12 mb-4'/>
                        <Form layout='vertical' form={cashbackForm} onFinish={handleUpdate}>
                            <FormItem name='products_count_range'/>
                            <button className='bg-primary text-white px-6 py-2 rounded hover:text-white hover:bg-primary-hover mb-2'>
                                Update
                            </button>
                        </Form>
                    </div>
                </div>
                <div className='w-full md:w-1/3 pr-6'>
                    <div className='bg-white p-6 shadow-c-2 rounded'>
                        <h1 className='text-lg font-bold mb-4'>Welcome Offer Range</h1>
                        <hr className='w-12 mb-4'/>
                        <Form layout='vertical' form={offerForm} onFinish={handleUpdate}>
                            <FormItem name='products_count_range'/>
                            <button className='bg-primary text-white px-6 py-2 rounded hover:text-white hover:bg-primary-hover mb-2'>
                                Update
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings

const FormItem = ({name}) => {
    return (
        <div>
            <FormItemRange label='Poor' name={name} sub_name='poor'/>
            <FormItemRange label='Average' name={name} sub_name='average'/>
            <FormItemRange label='Good' name={name} sub_name='good'/>
            <FormItemRange label='Very Good' name={name} sub_name='very_good'/>
            <FormItemRange label='Exceptional' name={name} sub_name='exceptional'/>
        </div>
    )
}

const FormItemRange = ({label, name, sub_name}) => {
    let floatPattern =  /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/
    let rules = [
        {required: true, message: 'Please insert a value'},
        {pattern: floatPattern, message: 'Please insert a valid value'}
    ]
    let filter = value => floatPattern.test(value) ? +value : value

    return (
        <>
            <div className='text-sm font-medium py-1.5'>{label}</div>
            <div className='flex justify-between'>
                <div className='w-1/2 pr-2'>
                    <Form.Item name={[name, sub_name, 'start']} rules={rules} normalize={filter}>
                        <Input prefix={<span className='mr-1'>Start : </span>} size='large'/>
                    </Form.Item>
                </div>
                <div className='w-1/2 pl-2'>
                    <Form.Item name={[name, sub_name, 'end']} rules={rules} normalize={filter}>
                        <Input prefix={<span className='mr-1'>End : </span>} size='large'/>
                    </Form.Item>
                </div>
            </div>
        </>
    )
}