const assert = require('assert')
const axios = require('axios')

describe('Likes', () => {

    // it('Adicionar Like', async () => {
    //     const idpost = "612e718b36e0363fd0469d2a"
    //     const {data} = await axios.post(`http://localhost:8000/addlike/${idpost}`, {
    //     })
    //     assert.equal("Like adicionado", data)
    // })

    it('Remove Like', async () => {
        const idpost = "612e718b36e0363fd0469d2a"
        const {data} = await axios.delete(`http://localhost:8000/removelike/${idpost}`)
        assert.equal("Like removido", data)
    })
})