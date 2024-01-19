const postLists=document.querySelector("#postLists")
const postBtn=document.querySelector("#postBtn")
const postTitle=document.querySelector("#postTitle")
const postDesc=document.querySelector("#postDesc")
const userNameInput=document.querySelector("#userNameInput")
const avatarUrlInput=document.querySelector("#avatarUrlInput")
const deleteBtn=document.querySelector("#deleteBtn")
const editBtn=document.querySelector("#editBtn")


const postContainer = document.querySelector(".postContainer");
const modalContainer = document.querySelector(".modalContainer");
const firstPostInput = document.getElementById("firstPostInput");

let data=[]
let userName;
let avatarUrl;

let isEditMode = false;
let editPostId = null;


document.addEventListener("DOMContentLoaded", function() {

    firstPostInput.addEventListener("click", function() {
        postContainer.classList.add("active");
        modalContainer.classList.add("active");
    });

    postBtn.addEventListener("click", function(event) {
        event.preventDefault(); 
        modalContainer.classList.remove("active");
        postContainer.classList.remove("active");

    });
});


// API's
async function getPosts(){
    try{
        const response=await fetch("https://blog-api-t6u0.onrender.com/posts", {
        method: "GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data=await response.json()
    console.log(data);
    return data
    }
    catch(err){console.log(err);}
}



async function getPostsID(id){
    try{
        const response=await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
        method: "GET",
        headers:{
            "Content-Type":"application/json"
        },
    })
    const data=await response.json()
    return data
    }
    catch(err){console.log(err);}
}

async function createPost(form){
    try{
        const response=await fetch("https://blog-api-t6u0.onrender.com/posts", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form)
        })
        const data=await response.json()
        return data
    }
    catch(err){
        console.log(err);
    }
}

async function updatePost(id,form){

    try{
        const response=await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form)
        })
        const data=await response.json()
    
        return data
       
    }
    catch(err){
        console.log(err);
    }
}

async function rmvPost(id){

    try{
        const response=await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            },
        })
        const data=await response.json()
        return data
    }
    catch(err){
        console.log(err);
    }
}



function renderPosts(data) {

    postLists.innerHTML = "";

    data.forEach(post => {
        const createdTime=convertTime(post.created)
        const postHTML = `
            <div class="col-md-12">
                <div class="d-flex flex-column" id="commentContainer">
                    <div class="bg-white">
                        <div class="flex-row gap-5 d-flex">
                            <div>
                                <img width="70" class="rounded-circle" src="${post.avatarUrl ? post.avatarUrl : 'https://static.thenounproject.com/png/854888-200.png'}"/>
                                <div class="d-flex flex-column justify-content-start">
                                    <span class="d-block text-center font-weight-bold name">${post.userName ? post.userName : 'Anonym'}</span>
                                </div>
                            </div>

                            <div id="textSection" class="mt-2" style="width: 80%;">
                                <h1 class="textTitle">${post.title}</h1>
                                <p class="textDesc">${post.body}</p>
                                <p class="card-text"><small class="text-body-secondary">${createdTime}</small></p>

                                <div class="btns d-flex gap-2">
                                    <button id="deleteBtn" type="button" class="btn" onclick="handleRemoveEl(${post.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                    </svg></button>

                                    <button id="editBtn" type="button" class="btn" onclick="editPostEl(${post.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                  </svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Append postHTML to postLists
        postLists.innerHTML += postHTML;
    });
}



    async function handleRemoveEl(id){
        try{
            await rmvPost(id)
            console.log(id);
            data=data.filter(post=>post.id !== id)
        
            renderPosts(data)
        }
        catch(err){
            console.log(err);
        }
        }

    
        function editPostEl(id) {
            const postToEdit = data.find(post => post.id === id);
        
            if (!postToEdit) {
                console.error(`Post with ID ${id} not found.`);
                return;
            }
        

            isEditMode = true;
            editPostId = id;
        
            postTitle.value = postToEdit.title;
            postDesc.value = postToEdit.body;
            userNameInput.value = postToEdit.userName;
            avatarUrlInput.value = postToEdit.avatarUrl;

            postBtn.textContent = 'Update';
            postContainer.classList.add("active");
            modalContainer.classList.add("active");
        }



        postBtn.addEventListener("click", async function () {
            const title = postTitle.value;
            const body = postDesc.value;
            const userName = userNameInput.value;
            const avatarUrl = avatarUrlInput.value;
        
            if (!title.trim() || !body.trim()) {
                console.error("Please fill in all required fields.");
                return;
            }
        
            const form = {
                title,
                body,
                userName,
                avatarUrl,
                created: new Date()
            };
        
            if (isEditMode) {

                try {
                    const updatedPost = await updatePost(editPostId, form);
                    console.log(updatedPost);
        
                    data = data.map(post => (post.id === editPostId ? updatedPost : post));
                    renderPosts(data);
        
                    isEditMode = false;
                    editPostId = null;
                    postBtn.textContent = 'Post';
                } catch (err) {
                    console.error(err);
                }
            } else {

                try {
                    const newPost = await createPost(form);
                    console.log(newPost);
        
                    data = [newPost, ...data];
                    renderPosts(data);
                } catch (err) {
                    console.error(err);
                }
            }
        
            postTitle.value = "";
            postDesc.value = "";
            userNameInput.value = "";
            avatarUrlInput.value = "";
        });
        

userNameInput.addEventListener("input", function(event) {
    userName = event.target.value;
});

avatarUrlInput.addEventListener("input", function(event) {
    avatarUrl = event.target.value;
});


async function App(){
    const posts = await getPosts()
    data=posts
    renderPosts(posts)
    }
    
    App()

