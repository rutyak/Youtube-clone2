const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyCNC3iYUkDD4nU2QR7vJfaSMIRBRsPbRG4";

const container = document.getElementById("videos-container");

async function getVideos(q){
   const url = `${BASE_URL}/search?key=${API_KEY}&q=${q}&type=videos&maxResults=20`;
   const response = await fetch(url,{
      method: "get",
   });
   const data = await response.json();

   const videos = data.items;
   // console.log("get videosPart >> ",videos);
   getVideoData(videos);
}

async function getVideoData(videos){
   let videoData = [];
   for(let i=0;i<videos.length;i++){
      const video = videos[i];
      const videoId = video.id.videoId;
      videoData.push(await getVideoDetails(videoId));
   }
   console.log(videoData);
   renderVideos(videoData);
}

async function getVideoDetails(videoId){
   const url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;
   const response = await fetch(url,{
      method : "get",
   });
   const data = await response.json();
   // console.log("Video detailsPart >> ",data)
   return data.items[0];
}


function renderVideos(videos){
   container.innerHTML = ``;
   for(let i=0;i<videos.length;i++){
      const video = videos[i];
      const videourl = video.snippet.thumbnails.high.url;
      const title =video.snippet.title; 
      container.innerHTML += `
      
      <div class="video-info" onclick="openVideoDetails('${video.id}')">
      <div class="video-image">
        <img src="${videourl}" alt="video-title" />
      </div> 
      <div class="video-description">
        <div class="channel-avatar">
          <img src="" alt="" />
        </div>
        <div class="video-title">${title}</div>
          <div class="channel-discription">
            <p class="channel-name">channel</p>
            <p class="views">15k views</p>
            <p class="video-time">1 week ago</p>
          </div>
      </div>
    </div>`;
   }
}

function openVideoDetails(videoId){
   localStorage.setItem("videoId",videoId)
   window.open("/videoDetails.html")
}
getVideos("");

// getVideoDetails("VyEvrQA9DT0");