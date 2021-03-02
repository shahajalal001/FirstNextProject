import {login} from '../app/features/admin'
import tw from 'tailwind-styled-components'
import {useRouter} from 'next/router'
import {Form, Input} from 'antd'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const Login = () => {

    let router = useRouter()
    const handleLogin = async admin => {
        console.log(admin)
    }

    return (
        <Wrapper>
            <div>
                <h1>Login</h1>
                <div>
                    <Form>
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
                        <button className='bg-primary' type='submit'>Login</button>
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