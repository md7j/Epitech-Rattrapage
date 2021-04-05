import imgurApiUtils from './utils'

const ImagesImgurApi = {
    renewData: async (data) => {
        let newData
        if (data.is_album == true)
            newData = await imgurApiUtils.getAlbumData(data.id)
        else
            newData = await imgurApiUtils.getImageData(data.id)
        newData = imgurApiUtils.formatData([newData])[0]
        return newData
    }
}

export default ImagesImgurApi;