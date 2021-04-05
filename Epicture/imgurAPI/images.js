import imgurApiUtils from './utils'

const ImageImgurApi = {
    getData: async (accountUsername, accessToken, len = 20) => {
        let images = []

        let idsResponse = await fetch('https://api.imgur.com/3/account/' + accountUsername + '/images/ids/0', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        idsResponse = await idsResponse.json()
        for (const id of idsResponse.data) {
            let image = await imgurApiUtils.getImageData(id)
            images.push(image)
        }
        let data = imgurApiUtils.formatData(images)
        return (data.slice(0, len))
        // return ([])
    }
}

export default ImageImgurApi;
