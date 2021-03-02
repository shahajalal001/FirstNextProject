import {graphqlClient} from '../graphql'
import Cookies from 'js-cookie'

let values = `
    poor {
        start
        end
    }
    average {
        start
        end
    }
    good {
        start
        end
    }
    very_good {
        start
        end
    }
    exceptional {
        start
        end
    }
`
let output = `
    products_count_range {
        ${values}
    }
    cashback_range {
        ${values}
    }
    welcome_offer_range {
        ${values}
    }
`

export const getSettings = async () => {
    let query = `
        query {
            getSettings {
                error
                msg
                data {
                    ${output}
                }
            }
        }
    `
    let client = graphqlClient(Cookies.get('sr_token'))
    let {error, data} = await client.query(query).toPromise()
    if(error) {
        return {error: true, msg: 'Connection Failed'}
    }
    let {getSettings} = data
    return getSettings
}

export const updateSettings =  async settings => {
    let mutation = `
        mutation ($settings: SettingDataInput) {
            upsertSettings(settingInput: $settings ) {
                error
                msg
                data {
                    ${output}
                }
            }
        }
    `
    let client = graphqlClient(Cookies.get('sr_token'))
    let {error, data} = await client.mutation(mutation, {settings}).toPromise()
    if(error) {
        return {error: true, msg: 'Connection Failed'}
    }
    let {upsertSettings} = data
    return upsertSettings

}