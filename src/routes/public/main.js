



function createTimeLinePosts(posts) {
        console.log(posts)
        let containerPost = document.createElement("div")
        containerPost.style.width="100%"
        containerPost.style.height="auto"
        containerPost.style.marginLeft="10"
        containerPost.style.backgroundColor="#4F4F4F"
        let post = document.createElement("h1")
        let tags = document.createElement("p")
        tags.innerHTML = posts.tags
        post.innerHTML = posts.title
        containerPost.appendChild(post)
        containerPost.appendChild(tags)
        console.log(containerPost)
        return containerPost
}

async function getPosts() {
    fetch('/allposts')
    .then((res) => res.json())
    .then((posts) => {
        const doc = document.getElementById("timeline-posts")
        posts.forEach(element => {
            let post = createTimeLinePosts(element)
            doc.appendChild(post)

    })        
    })
}
getPosts()