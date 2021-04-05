import imgurApiUtils from './utils'

const GalerieImgurApi = {
    getData: async (section, sort, len = 20) => {
        let response = await fetch('https://api.imgur.com/3/gallery/' + section + '/' + sort + '/day/0?showViral=true&mature=true&album_previews=false', {
            method: 'GET',
            headers: {
                'Authorization': 'Client-ID 2e6ef0fb1d5740c'
            }
        })
        response = await response.json()
        let data = imgurApiUtils.formatData(response.data)
        return (data.slice(0, len))
    },
    search: async (sort, searchQuery, len = 20) => {
        let response = await fetch('https://api.imgur.com/3/gallery/search/' + sort + '/all/0?q=' + searchQuery, {
            method: 'GET',
            headers: {
                'Authorization': 'Client-ID 2e6ef0fb1d5740c'
            }
        })
        response = await response.json()
        let data = imgurApiUtils.formatData(response.data)
        return (data.slice(0, len))
    },
    searchAutocomplete: async (query) => {
        let response = await fetch('https://api.imgur.com/3/suggest?&q=' + query + '&types=tags', {
            method: 'GET',
            headers: {
                'Authorization': 'Client-ID 2e6ef0fb1d5740c'
            }
        })
        response = await response.json()
        let data = response.data.tags
        console.log("searchAutocomplete", data)
        console.log("ez", data.sort((a, b) => a.images < b.images))
        console.log("searchAutocomplete", data)
        return (data.slice(0, 5))
    }
}

export default GalerieImgurApi;