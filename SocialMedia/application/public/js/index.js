var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
var num=0;

/*
async function fetchWithString() {
    try {
        var response = await fetch(url);
        var data = await response.json();
        var htmlString = data.reduce(function(prev, photos){
            return (prev + 
            `<div class = "picture" id="picture">
            <img class="photo-img" src="${photos.thumbnailUrl}">
            <div class="photo-name">
                <p class="photo-title">${photos.title}</p>
            </div>
        </div>`
        );
        },"");
        document.getElementById('Photo-list').innerHTML = htmlString;
        document.getElementById("picture").addEventListener("click",remove("picture"));

    } catch(error){
        console.log(error) 
    }
}
fetchWithString();
*/

function BuildC(data) {
    var Card=document.createElement("div");
    Card.setAttribute("class", "picture");

    var PhoPic=document.createElement("img");
    PhoPic.setAttribute("class", "photo-img");
    PhoPic.setAttribute("src", data.thumbnailUrl);

    var PhosName=document.createElement("div");
    PhosName.setAttribute("class", "photo-name");

    var PhoTitl=document.createElement("p");
    PhoTitl.setAttribute("class", "photo-title");
    PhoTitl.appendChild(document.createTextNode(data.title));

    PhosName.appendChild(PhoTitl);

    Card.appendChild(PhoPic);
    Card.appendChild(PhosName)
    
    Card.addEventListener("click", fadeOut);

    return Card;

}

async function fetchWithDOM() {
    
    try {
        var response = await fetch(url);
        var data = await response.json();
        var elements = data.map(BuildC);

        data.forEach(Card => {
            num++
        });

        document.getElementById("NumberAmount").innerHTML=`${num} Photos`;

        document.getElementById("Photo-list").append(...elements);
    } catch(error){
        console.log(error) 
    }

   
}
fetchWithDOM();



function fadeOut(ev) {
    var ele= ev.currentTarget;
    var op = 1;
    
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            ele.remove();
            num--;
            document.getElementById(
                "NumberAmount"
              ).innerHTML = `<div>${num} Photos</div>`;
    }
    ele.style.opacity=op;
    op -= 0.2;
    }, 25);

    
  }