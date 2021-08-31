



function createTimeLinePosts(posts) {
        console.log(posts)
        let post = document.createElement("p")
        post.innerHTML = posts.title
        return post
}

async function getPosts() {
    fetch('/allposts')
    .then((res) => res.json())
    .then((posts) => {
        const doc = document.getElementById("tester")
        posts.forEach(element => {
            let post = createTimeLinePosts(element)
            doc.appendChild(post)

    })        
    })
}
getPosts()