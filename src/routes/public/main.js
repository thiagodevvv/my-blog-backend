

function createTimeLinePosts(posts) {   
        let containerPost = document.createElement("div")
        containerPost.id="containerPost"
        containerPost.addEventListener('click', () => {
            let post = posts.title
            let description = posts.description
            let viewPost = document.getElementById("view-post")
            let title = document.createElement("h1")
            title.id="#title-view-post"
            title.innerText = post
            let viewDescriptionPost = document.createElement("p")
            viewDescriptionPost.id="viewDescriptionPost"
            viewDescriptionPost.innerText = description
            viewPost.appendChild(title)
            viewPost.appendChild(viewDescriptionPost)
            let timeLinePost = document.getElementById("timeline-posts")
            timeLinePost.style.display="none"
        })
        let post = document.createElement("h1")
        let tags = document.createElement("p")
        let author = document.createElement("h5")
        let containerLikesAndComments = document.createElement("div")
        containerLikesAndComments.style.display="flex"
        containerLikesAndComments.style.flexDirection="row"
        let imgHeart = document.createElement("img")
        let imgComments = document.createElement("img")
        imgHeart.src="/heart.png"
        imgComments.src="/comments.png"
        imgHeart.id="icons-post"
        imgComments.id="icons-post"
        let buttonHeart = document.createElement("button")
        let buttonComments = document.createElement("button")
        buttonHeart.id="buttonHeart"
        buttonComments.id="buttonComments"
        buttonHeart.appendChild(imgHeart)
        buttonComments.appendChild(imgComments)
        containerLikesAndComments.appendChild(buttonHeart)
        containerLikesAndComments.appendChild(buttonComments)
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

// function renderPost() {
//     console.log('testando o click')
//     let title = document.getElementById("post-text")
//     title.innerText = post
// }


// renderPost()