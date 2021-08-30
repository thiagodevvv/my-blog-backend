const axios = require('axios')
async function getPosts() {
  const posts = await axios.get('http://localhost:8000/allposts')
  console.log(posts)
  ul = document.createElement('ul')
  document.getElementById("tester").appendChild(ul)
  posts.map((post) => {
    console.log(post)
    let li = document.createElement('li')
    ul.appendChild(li)
    li.innerHTML += post.title
  })
}
getPosts()
