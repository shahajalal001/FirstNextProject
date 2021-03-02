import {login} from '../app/features/admin'
import tw from 'tailwind-styled-components'
import {useRouter} from 'next/router'
import {Form, Input} from 'antd'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const Login = () => {

    let router = useRouter()
    const handleLogin = async admin => {
        let {error, msg, token} = await login(admin)
        if(error) {
            await Swal.fire('Error', msg, 'error')
        } else {
            Cookies.set('sr_token', token)
            await router.push('/')
        }
    }

    return (
        <Wrapper>
            <div className='w-full md:w-116 bg-white rounded md:shadow-c-2 p-6'>
                <h1 className='text-2xl text-center'>Login</h1>
                <div className='px-2 py-4'>
                    <Form layout='vertical' requiredMark={false} onFinish={handleLogin}>
                        <Form.Item 
                            name='user'
                            label='Username'
                            rules={[
                                {required: true, message: 'Please provide an Username'}
                            ]}
                        >
                            <Input size='large'/>
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Password'
                            rules={[
                                {required: true, message: 'Please provide a password'}
                            ]}
                        >
                            <Input.Password size='large'/>
                        </Form.Item>
                        <button className='bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded mt-1' type='submit'>Login</button>
                    </Form>
                </div>
            </div>
        </Wrapper>
    )
}

export default Login

let Wrapper = tw.section`
    fixed top-0 left-0 h-screen w-full
    flex justify-center items-center
    bg-white md:bg-gray-200
`