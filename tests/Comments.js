const assert = require('assert')
const axios = require('axios')

describe('Comentário', () => {

    it('Adicionar comentário', async () => {
        const {data} = await axios.post('http://localhost:8000/addcomment', {
            idpost: "612e718b36e0363fd0469d2a",
            iduser: "32",
	        comment: "comentário tester collection posts"
        })
        assert.equal("Comentário adicionado", data)
    })

    it('Deletar comentário', async () => {
        const iduser = "32"
        const comment = "comentário tester collection posts"
        const {data} = await axios.delete(`http://localhost:8000/${comment}/${iduser}`)
        assert.equal("Ok deletado", data)
    })
})