const optionList = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const options = data.data;
    const menuDiv = document.getElementById('menu-container');
    options.forEach(item => {
        const menu = document.createElement('div');
        menu.innerHTML = `
        <a onclick="handleVideo('${item.category_id}')" class="tab rounded-md text-black">${item.category}</a>
        `;
        menu.classList.add('w-28')
        menu.classList.add('px-4')
        menu.classList.add('py-1')
        menu.classList.add('bg-stone-300')
        menu.classList.add('rounded-md')
        menu.classList.add('text-center')
        menuDiv.appendChild(menu);
    });
}
let loadedData = null;
const handleVideo = async(videoItem)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${videoItem}`);
    const data = await res.json();
    loadedData = data.data;
    const videoContainer = document.getElementById('video-container');
    videoContainer.classList.add('grid')
    videoContainer.classList.add('grid-cols-1')
    videoContainer.classList.add('md:grid-cols-2')
    videoContainer.classList.add('lg:grid-cols-4')
    videoContainer.classList.add('gap-5')
    videoContainer.innerHTML = "";
    if(data.status ==true){
        data.data?.forEach((video)=>{
            const videoDiv = document.createElement('div');
            const myTime = 
    
        videoDiv.innerHTML = `
        <div class="card bg-base-100">
                <figure><img src="${video.thumbnail}" alt="Videos" class="h-40 w-full rounded-lg" /></figure>
                <div class="flex gap-3 mt-5 w-full">
                <div>
                <img src="${video.authors[0].profile_picture}" class="rounded-full w-10 h-10" alt="">
                </div>
                <div class="w-fit">
                    <h2 class="card-title">${video.title}</h2>
                    <div class="flex gap-3 ">
                    <div><p>${video.authors[0].profile_name}</p></div>
                    <div>
                    <div>${video.authors[0].verified ==true? "<img src='verified.svg'></img>":""}</div>
                    </div>
                    </div>
                    <p>${video.others.views} views</p>
                </div>
                </div>
            </div>
        `
        ;
        videoContainer.appendChild(videoDiv);
        
        
        });
    }else{
        if(data.status==true){
            videoContainer.classList.add('hidden')
        }else{
            videoContainer.classList.remove('grid')
            videoContainer.classList.remove('hidden')
        }
        
        const noVideoDiv = document.createElement('div');
        noVideoDiv.innerHTML = `
        <div class="mt-32 ">
        <div class="w-12/12 flex justify-center item-center"><img src="video.svg" alt=""></div>
        <h3 class="text-3xl font-bold text-center mt-5">Oops!! Sorry, There is no <br>content here</h3>
        </div>
        `
        ;
        
        videoContainer.appendChild(noVideoDiv);
    }
    
    
}
const sortView =()=>{
    // handleVideo();
    console.log(loadedData)
    // loadedData.forEach(loaded=>{
    //     const viewsLoad = parseFloat(loaded.others.views)
    //     console.log(viewsLoad)
    // viewsLoad.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
    // })
    loadedData.sort((a, b) => {
        const viewsA = parseFloat(a.others.views);
        const viewsB = parseFloat(b.others.views);
        console.log(viewsA)
        return viewsA - viewsB;
      });
    
    
    }


const blogHandler = ()=>{
    window.location.href = 'blog.html'
}
optionList();
handleVideo("1000");