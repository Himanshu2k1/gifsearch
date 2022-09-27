// taking input data 
document.querySelector(".js-search").addEventListener('click',function(){
    var input=document.querySelector("input").value;
    callajax(makeurl(input));
    
});

document.querySelector(".js-userinput").addEventListener('keyup',function(e){
    var input=document.querySelector("input").value;
    if(e.which === 13){
        callajax(makeurl(input));
    }   
});

//funtion to generate url using which ajax request will fetch data
function makeurl(input){
    var url="http://api.giphy.com/v1/gifs/search?q="+input+"&api_key=dc6zaTOxFJmzC";
    return url;
}

//ajax request

function callajax(url){
    var GiphyAJAXCall= new XMLHttpRequest();
    GiphyAJAXCall.open('GET',url);
    GiphyAJAXCall.send();

    GiphyAJAXCall.addEventListener('load',function(e){
    var data=e.target.response;
    //console.log(data); 
    pushtoDOM(data);
    });    
}

//function to clear content present currently when a new search is made. 
function clear(item) {
    item.innerHTML = "";
}

//show the gif
function pushtoDOM(input){
    var response = JSON.parse(input); //parsing data fetched using api
    var imageurls=response.data;      //extracting data elements from complete data.
    var container=document.querySelector(".js-container");
    clear(container);
    imageurls.forEach(function(image){
        var src=image.images.fixed_height.url;               //extracting link from data of every image.
        container.innerHTML=container.innerHTML + "<img src=\"" + src + "\" class=\"container-image\">";
    });
}
