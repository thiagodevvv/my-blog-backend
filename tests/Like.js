const assert = require('assert')
const axios = require('axios')

describe('Likes', () => {

    it('Adicionar Like', async () => {
        const idpost = "612e718b36e0363fd0469d2a"
        const {data} = await axios.post(`http://localhost:8000/addlike/${idpost}`, {
        })
        assert.equal("Like adicionado", data)
    })

    // it('Remove Like', async () => {
    //     const iduser = "32"
    //     const comment = "comentário tester collection posts"
    //     const {data} = await axios.delete(`http://localhost:8000/${comment}/${iduser}`)
    //     assert.equal("Ok deletado", data)
    // })
})