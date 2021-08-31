
function createTimeLinePosts(posts) {   
        let containerPost = document.createElement("div")
        containerPost.id="containerPost"
        let post = document.createElement("h1")
        let tags = document.createElement("p")
        let author = document.createElement("h5")
        let containerLikesAndComments = document.createElement("div")
        containerLikesAndComments.style.display="flex"
        containerLikesAndComments.style.flexDirection="row"
        let imgHeart = document.createElement("img")
        let imgComments = document.createElement("img")
        imgHeart.style.width="20px"
        imgHeart.style.heigth="20px"
        imgHeart.style.marginLeft="10px"
        imgHeart.style.marginBottom="10px"
        imgHeart.src="/heart.png"
        imgComments.style.width="20px"
        imgComments.style.heigth="20px"
        imgComments.style.marginLeft="10px"
        imgComments.style.marginBottom="10px"
        imgComments.src="/comments.png"
        containerLikesAndComments.appendChild(imgHeart)
        containerLikesAndComments.appendChild(imgComments)
        tags.innerHTML = posts.tags
        post.innerHTML = posts.title
        author.innerHTML = "por " + posts.author
        post.style.textAlign="left"
        post.style.marginLeft="10px"
        tags.style.textAlign="left"
        tags.style.marginLeft="10px"
        tags.style.color="#D3D3D3"
        author.style.color="#A9A9A9"
        author.style.marginLeft="10px"
        author.style.fontFamily="Segoe UI"
        containerPost.appendChild(author)
        containerPost.appendChild(post)
        containerPost.appendChild(tags)
        containerPost.appendChild(containerLikesAndComments)
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