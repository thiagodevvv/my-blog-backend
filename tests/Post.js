const assert = require('assert')
const axios = require('axios')

describe('Posts', () => {
    it('Excluir Post', async () => {
        const post = "612e71d536e0363fd0469d2d"
        const {data} = await axios.delete(`http://localhost:8000/post/delete/${post}`)
        assert.equal("Ok post deletado", data)
    })
})