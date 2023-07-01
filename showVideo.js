const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyCNC3iYUkDD4nU2QR7vJfaSMIRBRsPbRG4";

const commentsContainer = document.getElementById("comments");

const video_container = document.getElementById("yt-video");
const videoId = localStorage.getItem("videoId");

video_container.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;

async function getComments(){
    const url = `${BASE_URL}/commentThreads?key=${API_KEY}&videoId=${videoId}&maxResults=80&order=time&part=snippet`;
    const response = await fetch(url,{
       method: "get",
    });
    const data = await response.json();
    // console.log(data);
    const comments =  data.items;
    console.log(comments);
    renderComments(comments);
}

function renderComments(comments){
    commentsContainer.innerHTML = ``;
    comments.forEach((comments)=>{
        commentsContainer.innerHTML += `
            <p>${comments.snippet.topLevelComment.snippet.textDisplay}</p>
        `;
    });
}
getComments() ;