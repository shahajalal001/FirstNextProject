import {graphqlClient} from '../graphql'
import {useState, useEffect} from 'react'
import {notification} from 'antd'
import {pipe, subscribe} from 'wonka'
import Cookies from 'js-cookie'
import {useRouter} from 'next/router'

const NewOwnerSubscription = () => {
    let router = useRouter()
    const [subscribed, setSubscribed] = useState(false)
    let query = `
        subscription {
            ownerAdded {
                error
                msg
                data {
                    _id
                }
            }
        }
    `
    let client = graphqlClient(Cookies.get('sr_token'))
    useEffect(() => {
        if(!subscribed) {
            setSubscribed(true)
            const {unsubscribe} = pipe(
                client.subscription(query),
                subscribe(({data}) => {
                    notification.open({
                        message: 'Notification',
                        duration: 10,
                        description: 'A new owner request received',
                        onClick: () => {
                            console.log('Working')
                        }
                    })
                })
            )
            router.events.on('routeChangeStart', url => unsubscribe())
        }
    })
    return <></>
}

export default NewOwnerSubscription