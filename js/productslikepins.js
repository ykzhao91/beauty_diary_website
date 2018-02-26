var ecwid_array_of_image = [];
var ecwid_array_of_link = [];
var ecwid_array_of_price = [];
var ecwid_array_of_name=[];
var ecwid_array_of_createddate=[];
var ecwid_array_of_description=[];

//var profile=[];

var array_of_image = [];
var array_of_link = [];
var array_of_price = [];
var array_of_name=[];
var array_of_createddate=[];
var array_of_description=[];
var index=0;
var length=0;
var ecwid_end_of_items=false;
var count_image=0;
var ecwid_count_of_image_onscroll=30;

function ecwid_get_information_about_product()
{
    //http://app.ecwid.com/api/v1/"+ecwid_storeId+"/products?&callback=?
    $.ajax({
    url: "http://api.tumblr.com/v2/blog/prettylittlefashionxo.tumblr.com/posts/photo?api_key=z4gXnMp2sRuQUef80tJW6lm7t8UyU9pfbsJkwsShNqDvKEHi0n&filter=text",
 
    // The name of the callback parameter, as specified by the YQL service
    jsonp: "callback",
 
    // Tell jQuery we're expecting JSONP
    dataType: "jsonp",
 
    // Tell YQL what we want and that we want JSON
  
 
    // Work with the response
    success: function(data ) { 
        global_data = data;
   for( var i = 0; i < data.response.posts.length; i++)  
   {            
    //ecwid_array_of_image.push((data[i].imageUrl).substr(5));
    //ecwid_array_of_image.push((data[i].imageUrl);
    //ecwid_array_of_createddate.push((data[i].created).substr(0,10));
    //ecwid_array_of_link.push((data[i].url).substr(5));
    //ecwid_array_of_name.push(data[i].name);
    //ecwid_array_of_price.push(data[i].price);         
    //ecwid_array_of_description.push((data[i].description).replace(/<\/?[^>]+>/gi, "").substr(0,150));
    ecwid_array_of_image.push((data.response.posts[i].photos[0].alt_sizes[0].url).substr(5));
    ecwid_array_of_createddate.push((data.response.posts[i].date).substr(0,10));
    ecwid_array_of_link.push((data.response.posts[i].short_url).substr(5));
    ecwid_array_of_name.push(data.response.posts[i].blog_name);
    ecwid_array_of_price.push(data.response.posts[i].note_count);         
    ecwid_array_of_description.push((data.response.posts[i].caption).replace(/<\/?[^>]+>/gi, "").substr(0,150));
   }
   count_image=data.response.posts.length;  
  }
});
}
ecwid_get_information_about_product();

function get_favorite_json()
{
    //$("#myFavorite").bind("click", function(){
    $.ajax({
            url: 'load.php',
            type: 'POST',
            dataType: 'json'
            //data: myData
        })
        .success(onFavoriteSuccess)
        .error(onFavoriteError);      
    
}
                     
    function onFavoriteError(response) 
    {
        alert("Error!");
    }
    
    function onFavoriteSuccess(response) 
    
    {
       
        $("#myFavoriteDiv").empty();
        n = Object.keys(response).length;
        responseData = response;
        
        for(i=0;i<n;i++)
        {
            //var jsonResponse = JSON.parse(response[i]);
            var jsonData = responseData[i];
            array_of_image.push((jsonData.url).substr(5));
            array_of_createddate.push((jsonData.date).substr(0,10));
            array_of_link.push((jsonData.short_url).substr(5));
            array_of_name.push(jsonData.blog_name);
            array_of_price.push(jsonData.note_count);         
            array_of_description.push((jsonData.caption).replace(/<\/?[^>]+>/gi, "").substr(0,150));
        }
         generate_htmlpage();
        apply_masonry();
    }
   

//get_favorite_json();

function ecwid_generate_htmlpage()
{  
  if(count_image<=ecwid_count_of_image_onscroll+index)
  {
   for( var i = index; i<count_image; i++)  
   {
    index++;
    if(index==count_image)
    {
     $('#loaderCircle').hide(); 
     $('#loader').append($('<p>'+'no more products to load'+'</p>')); 
     ecwid_end_of_items=true;
    }
    else
    {
      $boxes = $('<div class="masonryImage">'
      +'<div class="brick-inner">'
      +'<div class="image">'
      +'<a href="'+ecwid_array_of_image[i]+'" rel="rr" onclick="return jsiBoxOpen(this)" title="'+ecwid_array_of_name[i]+'"><img src="'+ ecwid_array_of_image[i]+'" class="thumb"/></a>'
      +'<a href="'+ecwid_array_of_link[i]+'" class="cart"><span>IconBayEcwid</span></a>'
      +'</div>'
      +'<a href="'+ecwid_array_of_link[i]+'"><p>'+ecwid_array_of_name[i]+'</p></a>'
      +'<p class="enable">created: '+ecwid_array_of_createddate[i]+'</p>'
      +'<div class="line">'+"_________________"+'</div>'
      +'<p class="description">'+ecwid_array_of_description[i]+"..."+'</p>'
      +'</div>'
      //+'<div class="post-price"><span>'+ecwid_currency_prefix+ecwid_array_of_price[i]+ecwid_currency_suffix+'</span></div></div>');
      +'<div class="post-price"><span class="pin_it" id="b'+i+'">Pin it</span></div></div>');  
      //idStr = "#b" + i;
            
            //$("#tableDiv table #"+i).append("<td><button id='" + idStr + "'>+</button></td>");
            //$("#" + idStr).bind("click", bHandler);
      
      $('#container').append($boxes);                  
    }      
   }
  }
    if(count_image>=ecwid_count_of_image_onscroll+index)
    {
      for( var i = index; i <index+ecwid_count_of_image_onscroll; i++)  
      {
        length++;            
        $boxes = $('<div class="masonryImage">'
        +'<div class="brick-inner">'
        +'<div class="image">'
        +'<a href="'+ecwid_array_of_image[i]+'" rel="rr" onclick="return jsiBoxOpen(this)" title="'+ecwid_array_of_name[i]+'"><img src="'+ ecwid_array_of_image[i]+ '" class="thumb"/></a>'
        +'<a href="'+ecwid_array_of_link[i]+'" class="cart"><span>IconBayEcwid</span></a>'
        +'</div>'
        +'<a href="'+ecwid_array_of_link[i]+'"><p>'+ecwid_array_of_name[i]+'</p></a>'
        +'<p class="enable">created: '+ecwid_array_of_createddate[i]+'</p>'
        +'<div class="line">'+"_________________"+'</div>'
        +'<p class="description">'+ecwid_array_of_description[i]+"..."+'</p>'
        +'</div>'
        //+'<div class="post-price"><span>'+ecwid_currency_prefix+ecwid_array_of_price[i]+ecwid_currency_suffix+'</span></div></div>');
        +'<div class="post-price"><span>Pin it</span></div></div>');  
        $('#container').append($boxes);               
      }
      index=length;
    }   
}

function generate_htmlpage()
{  
    //$("#myFavorite").bind("click", function(){
   for( var i = 0; i<n; i++)  
   {
      $boxes1 = $('<div class="masonryImage">'
      +'<div class="brick-inner">'
      +'<div class="image">'
      +'<a href="'+array_of_image[i]+'" rel="rr" onclick="return jsiBoxOpen(this)" title="'+array_of_name[i]+'"><img src="'+ array_of_image[i]+'" class="thumb"/></a>'
      +'<a href="'+array_of_link[i]+'" class="cart"><span>IconBayEcwid</span></a>'
      +'</div>'
      +'<a href="'+array_of_link[i]+'"><p>'+array_of_name[i]+'</p></a>'
      +'<p class="enable">created: '+array_of_createddate[i]+'</p>'
      +'<div class="line">'+"_________________"+'</div>'
      +'<p class="description">'+array_of_description[i]+"..."+'</p>'
      +'</div>'
      //+'<div class="post-price"><span>'+ecwid_currency_prefix+ecwid_array_of_price[i]+ecwid_currency_suffix+'</span></div></div>');
      +'<div class="post-price"><span>Pinned!</span></div></div>');  
      $('#myFavoriteDiv').append($boxes1);  
    }      
}


jQuery(window).load(function()   
{
  ecwid_generate_htmlpage();
});

jQuery(window).load(function()   
{
  //generate_htmlpage(); 
});

var myAdd = new Object();
myAdd.fileName = 'music.json';
    
function onClick()
{
    $(".pin_it").bind("click",
                      
    function(){
    //alert("The paragraph was clicked.");
        buttonId = this.id;
        data = global_data;
        var mySongData = data.response.posts[buttonId.slice(1)];
        var myAddObj = new Object();
        myAddObj.url = mySongData.photos[0].alt_sizes[0].url;
        myAddObj.date = mySongData.date;
        myAddObj.short_url = mySongData.short_url;
        myAddObj.blog_name = mySongData.blog_name;
        myAddObj.caption = mySongData.caption;
        myAdd.addObj = myAddObj;
        $.ajax({
            url: 'add.php',
            type: 'POST',
            dataType: 'json',
            
            data : myAdd
        })
        .success(onAddSuccess)
        .error(onAddError);  
    });    
}
    function onAddError(response) 
    {
        alert("Error!");
    }
    
    function onAddSuccess(response) 
    
    {
        alert("Add Successfull!");
    } 

jQuery(window).load(function()   
{
  onClick();
});

function ecwid_apply_masonry()
{
  var $container = $('#container').masonry({columnHeight:3});
  $container.imagesLoaded( function()
  {
    $container.masonry(
    {    
      itemSelector : '.masonryImage',
      isAnimated: true,                    
    });         
  });     
  $('#container').masonry('reload'); 
}

jQuery(window).load(function()   
{ 
  $('#container').show();
  ecwid_apply_masonry(); 
});

function apply_masonry()
{
  var $favorite = $('#myFavoriteDiv').masonry({columnHeight:3});
  $favorite.imagesLoaded( function()
  {
    $favorite.masonry(
    {    
      itemSelector : '.masonryImage',
      isAnimated: true,                    
    });         
  });     
  $('#myFavoriteDiv').masonry('reload'); 
}

jQuery(window).load(function()   
{ 
    $('#myFavoriteDiv').hide();
    //apply_masonry(); 
   
});
function ecwid_scroll_items()
{  
  window.onscroll = function () 
  {        
    if(ecwid_end_of_items==false)
    {
      if (document.body.scrollHeight == (document.body.scrollTop + document.body.clientHeight))
      { 
        setTimeout(function(){ecwid_generate_htmlpage();
        ecwid_apply_masonry();              
        ecwid_hover_image()},3000);                                                
      }
    }
  }
}
jQuery(window).load(function()    
{ 
  ecwid_scroll_items();
});

jQuery(document).ready(function()
{
  $(window).scroll(function () {if ($(this).scrollTop() > 0) {$('#scroller').fadeIn();} else {$('#scroller').fadeOut();}});
  $('#scroller').click(function () {$('body,html').animate({scrollTop: 0}, 400); return false;});
});