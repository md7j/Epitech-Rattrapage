const imgurApiUtils = {
    formatData: (responseData) => {
        let data = []

        responseData.forEach(item => {
            let itemData = {
                id: item.id,
                title: item.title,
                link: "",
                vote: item.vote || 'veto',
                ups: item.ups || 0,
                downs: item.downs || 0,
                comments: item.comment_count || 0,
                views: item.views,
                is_album: item.is_album
            }
            if (item.type && item.type.includes("image/")) {
                itemData.link = item.link
                data.push(itemData)
            }
            else if (item.images && item.images[0].type.includes("image/")) {
                itemData.link = item.images[0].link
                data.push(itemData)
            }
        })
        return data
    },
    getImageData: async (id) => {
        let image = await fetch('https://api.imgur.com/3/gallery/image/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Client-ID 2e6ef0fb1d5740c'
            }
        })
        if (!image.ok) {
            image = await fetch('https://api.imgur.com/3/image/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': 'Client-ID 2e6ef0fb1d5740c'
                }
            })
        }
        image = await image.json()
        return image.data
    },
    getAlbumData: async (id) => {
        let image = await fetch('https://api.imgur.com/3/gallery/album/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Client-ID 2e6ef0fb1d5740c'
            }
        })
        image = await image.json()
        return image.data
    }
}

export default imgurApiUtils;
