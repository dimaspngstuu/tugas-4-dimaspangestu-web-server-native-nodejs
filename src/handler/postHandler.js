const postHandler = {}

postHandler.getAllPost = (req,res) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url)
    .then(response => {
        if(!response){
            throw new Error(`http eror! status : ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        res.end(JSON.stringify(data))
     
    })
}


postHandler.getAllComment = (req, res) => {
    const url = "https://jsonplaceholder.typicode.com/comments";
    fetch(url)
    .then(response => {
        if (!response ){
            throw new Error("http error!")
        }
        return response.json()
    })
    .then(data => {
        res.end(JSON.stringify(data))
    })

}

postHandler.getAllPostAndComment = async (req, res) => {

    const BothUrl = {
        urlPost : "https://jsonplaceholder.typicode.com/posts",
        urlComment : "https://jsonplaceholder.typicode.com/comments"
    }
  
    const FetchPost = await fetch(BothUrl.urlPost);
    const FetchComment = await fetch(BothUrl.urlComment);

    const dataPost = await FetchPost.json();
    const dataComment = await FetchComment.json();
    
    const combinedData = dataPost.map(post => {
        return {
            ...post,
            Comment : dataComment.filter(comment => {
                return comment.postId === post.id
            })
        }
    });

    res.end(JSON.stringify(combinedData))




}



module.exports = postHandler