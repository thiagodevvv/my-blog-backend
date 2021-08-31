



function createTimeLinePosts(posts) {
        console.log(posts)
        let containerPost = document.createElement("div")
        containerPost.style.width="100%"
        containerPost.style.height="auto"
        containerPost.style.backgroundColor="#4F4F4F"
        containerPost.style.marginRight="100px"
        containerPost.style.marginLeft="10px"
        let post = document.createElement("h1")
        let tags = document.createElement("p")
        let containerLikesAndComments = document.createElement("div")
        containerLikesAndComments.style.display="flex"
        containerLikesAndComments.style.flexDirection="row"
        let imgHeart = document.createElement("img")
        imgHeart.style.width="20px"
        imgHeart.style.heigth="20px"
        imgHeart.src="/heart.png"
        containerLikesAndComments.appendChild(imgHeart)
        tags.innerHTML = posts.tags
        post.innerHTML = posts.title
        containerPost.appendChild(post)
        containerPost.appendChild(tags)
        containerPost.appendChild(containerLikesAndComments)
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