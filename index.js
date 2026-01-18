
const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("videoContainer").classList.add("hidden");
}

const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("videoContainer").classList.remove("hidden");
}

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (btn of activeButtons) {
        btn.classList.remove("active");
    }
}

function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => {
            showCategoryData(data.categories);
        })
};


function loadVideo(searchValue = "") {
    showLoader()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("all-btn").classList.add("active");
            displayVideo(data.videos);
        })
}


const loadCategoriesVideo = (id) => {
    showLoader()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {

            let clickButton = document.getElementById(`btn-${id}`)

            removeActiveClass();

            clickButton.classList.add("active");
            displayVideo(data.category);
        })
}

const loadVideoDetails = (videoId) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
        .then(res => res.json())
        .then(data => {
            showVideoDetails(data.video)
        })
}

// show function
function showCategoryData(data) {

    let categoryBtn = document.querySelector(".categoryBtn");

    for (singleData of data) {

        let newDiv = document.createElement("div");
        newDiv.innerHTML = `
            <button id="btn-${singleData.category_id}" onclick="loadCategoriesVideo(${singleData.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${singleData.category}</button>
        `;

        categoryBtn.appendChild(newDiv)

    }
}

const displayVideo = (videos) => {

    const videoContainer = document.querySelector("#videoContainer");
    videoContainer.innerHTML = "";

    if (videos.length === 0) {
        videoContainer.innerHTML = `
          
          <div class="col-span-full flex flex-col items-center PY-20">
            <img class="w-[150px]" src="./assets/Icon.png" alt="">
            <h1 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h1>
        </div>
        
          `
        hideLoader()
        return;
    }

    videos.forEach(video => {

        let videoCard = document.createElement("div");

        videoCard.innerHTML = `
      
        <div class="card bg-base-100 shadow-sm cursor-pointer">
            <figure class="relative">
                <img class ="w-full h-[150px] object-cover " src="${video.thumbnail}" alt="Shoes" />

                <span class="absolute bg-black text-white rounded p-2 bottom-2 right-2">3hrs 56 min ago</span>

            </figure>
            <div class="flex px-0 py-5 gap-3">

                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h1 class="text-sm font-semibold">${video.title}</h1>

                    <p class="text-gray-400 text-sm flex gap-1">${video.authors[0].profile_name}
                    

                    ${video.authors[0].verified == true ? `<img class="w-5 h-5 flex items-center" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="afd">` : ` `

            }

                 
                    
                    </p>


                    <p class="text-gray-400 text-sm">${video.others.views}</p>
                </div>

            </div>

            <button  onclick="loadVideoDetails('${video.video_id}')" class ="btn btn-block">view details</button>

        </div>
        `

        videoContainer.appendChild(videoCard);

    })

    hideLoader();
}

const showVideoDetails = (video) => {
    console.log(video);
    document.querySelector("#video_details").showModal();
    const video_container = document.querySelector("#video_container");

    video_container.innerHTML = `

    <img src="${video.thumbnail}" alt="">
     <h3 class="text-lg font-bold">${video.title}</h3>
    <p class="py-4">${video.description}</p>
    
    `
}


document.querySelector("#search-input").addEventListener("keyup", function (e) {
    const searchValue = e.target.value;

    loadVideo(searchValue)
})


loadCategories();