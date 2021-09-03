const assert = require('assert')
const axios = require('axios')

describe('Comentário', () => {
    it('Adicionar comentário', async () => {
        const {data} = await axios.post('http://localhost:8000/addcomment', {
            id: "612e718b36e0363fd0469d2a",
	        comment: "comentário 5"
        })
        assert.equal("Comentário adicionado", data)
    })
})