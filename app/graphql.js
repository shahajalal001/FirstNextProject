import {SubscriptionClient} from 'subscriptions-transport-ws'
import {Client, createClient, defaultExchanges, subscriptionExchange} from 'urql'

const SERVER_URL = process.env.backend_server_url
const SUBSCRIPTION_URL = process.env.backend_subscription_url

const subscriptionClient = process.browser ? new SubscriptionClient(SUBSCRIPTION_URL, { reconnect: true }) : null

export const graphqlClient = token => {
    return process.browser ? new Client({
        url: SERVER_URL,
        fetchOptions: {
            headers: {
                Authorization: `Authorization ${token || ''}`
            }
        },
        exchanges: [
            ...defaultExchanges,
            subscriptionExchange({
                forwardSubscription(operation) {
                    return subscriptionClient.request(operation)
                }
            })
        ]
    }) : createClient({
        url: SERVER_URL,
        fetchOptions: {
            headers: {
                Authorization: `Authorization ${token || ''}`
            }
        }
    })
}