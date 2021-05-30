
$('div.menu').find('a').click(function () {
  var $href = $(this).attr('href');
  var $anchor = $('#' + $href).offset();
  $('body').animate({ scrollTop: $anchor.top });
  return false;
});

$(document)
  .ready(function () {

    $(document).ready(function () {
     
      $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=covid19 world&domains=us.cnn.com,cbsnews.com,cbc.ca,bbc.co.uk,axios.com,aljazeera.com,abcnews.go.com,bloomberg.com,wired.com,reuters.com,wsj.com,nytimes.com&sortBy=publishedAt&apiKey=3ae30d398e914295b27c15aeddce8ec5",
        method: "GET"
      }).then(function (response) {
        

        for (var i = 0; i < 3; i++){
            

              var websiteUrl = response.articles[i].url;
              var websiteTitle = response.articles[i].title;
              var publisher = response.articles[i].source.name;
              var textContent = response.articles[i].description;
              var author = response.articles[i].author;


              var column = $("<div>").addClass("column news").attr("style","width: 30%; padding: 20px;");
              var card = $("<a>").addClass("ui fluid centered card").attr("href", websiteUrl);
              var content = $("<div>").addClass("content");
              var header = $("<div>").addClass("header").text(websiteTitle).attr("style", "padding-bottom: 7px;");
              var meta = $("<div>").addClass("meta");
              var subHead = $("<span>").addClass("category").text(publisher);
              var description = $("<div>").addClass("description");
              var descriptionText = $("<p>").text(textContent);
              var extraContent = $("<div>").addClass("extra content");
              var authorTag = $("<div>").addClass("right floated author").text(author).attr("style", "color: #c7383d");
              

              meta.append(subHead);
              description.append(descriptionText);
              extraContent.append(authorTag);
              $(".middle.aligned.row").append(column.append(card.append(content.append(header, meta, description), extraContent)));
              
            }


          });

        });
    
    $(document).on('keypress', function (enter) {
      if (enter.which == 13) {
        var countryName = $("#search").val();
        $("#loading").addClass("loading");
        

        $(".column.news").remove();
      
        $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=covid " + countryName + "&domains=us.cnn.com,cbsnews.com,cbc.ca,bbc.co.uk,axios.com,aljazeera.com,abcnews.go.com,bloomberg.com,wired.com,reuters.com,wsj.com,nytimes.com,foxnews.com&sortBy=relevancy,publishedAt&apiKey=3ae30d398e914295b27c15aeddce8ec5",
        method: "GET"
      }).then(function (response) {
      

        for (var i = 0; i < 3; i++){
              
              $("#loading").removeClass("loading");


              $("#countryName").text(countryName);
              

              var websiteUrl = response.articles[i].url;
              var websiteTitle = response.articles[i].title;
              var publisher = response.articles[i].source.name;
              var textContent = response.articles[i].description;
              var author = response.articles[i].author;

              var column = $("<div>").addClass("column news").attr("style","width: 30%; padding: 20px;");
              var card = $("<a>").addClass("ui fluid centered card").attr("href", websiteUrl);
              var content = $("<div>").addClass("content");
              var header = $("<div>").addClass("header").text(websiteTitle).attr("style", "padding-bottom: 7px;");
              var meta = $("<div>").addClass("meta");
              var subHead = $("<span>").addClass("category").text(publisher);
              var description = $("<div>").addClass("description");
              var descriptionText = $("<p>").text(textContent);
              var extraContent = $("<div>").addClass("extra content");
              var authorTag = $("<div>").addClass("right floated author").text(author).attr("style", "color: #c7383d");

              meta.append(subHead);
              description.append(descriptionText);
              extraContent.append(authorTag);
              $(".middle.aligned.row").append(column.append(card.append(content.append(header, meta, description), extraContent)));
              
            }
         });

        //get related articles by country on covid
        // var queryURL = 'https://content.guardianapis.com/search?q=%22covid%20' + countryName + '%22&api-key=1cd5cbec-afb6-4aea-b671-03563ccf7f61';
        // $.ajax({
        //   url: queryURL,
        //   method: "GET"
        // }).then(function (response) {
        //   console.log(response.response.results);
        //   for (var i = 0; i < response.response.results.length;i++){
        //     if (i>3){
        //       break;
        //     }
        //     var websiteUrl = response.response.results[i].webUrl;
        //     var websitetitle = response.response.results[i].webTitle;
        //   }
        //   

        // });

        
        
        // get stats covid by country
        var URL = 'https://api.covid19api.com/total/country/' + countryName;
        $.ajax({
          url: URL,
          method: "GET"
        }).then(function (response) {
          console.log(response);
          var lastIndex = response.length-1;
          var dateOf = response[lastIndex].Date;
          var confirmedCases = response[lastIndex].Confirmed;
          var activeCases = response[lastIndex].Active;
          var deathNum = response[lastIndex].Deaths;
          var recoveredNum = response[lastIndex].Recovered;

          
          $("#searchContainer").fadeOut(500, function() {

          var country = $("<h1>").addClass("ui inverted header covid").text(countryName).attr("style","margin-top: 2.5em;");
          $("#country").append(country);
          var currentCases = $("<h1>").addClass("ui red header covid").text(activeCases).attr("style","margin: 20px;");
          $("#head").append(currentCases);
          var currentCasesText = $("<h3>").addClass("ui inverted header covid").text("Current Confirmed Cases");
          $(currentCases).append(currentCasesText);
          var totalCases = $("<h1>").addClass("ui red header covid").text(confirmedCases).attr("style","margin: 20px;");
          $("#head").append(totalCases);
          var totalCasesText = $("<h3>").addClass("ui inverted header covid").text("Total Confirmed Cases");
          $(totalCases).append(totalCasesText);
          
          $(".covid").fadeIn(3000, function() {
            
            
           
          });
        });
            
            var dead = $("<h1>").addClass("ui red header covid").text(deathNum).attr("style","margin-top: 0em;");
            $("#dead").append(dead);
            var deadText = $("<h3>").addClass("ui inverted header covid").text("Deaths");
            $(dead).append(deadText);
            var recovered = $("<h1>").addClass("ui green header covid").text(recoveredNum).attr("style","margin-top: 0em;");
            $("#recovered").append(recovered);
            var recoveredText = $("<h3>").addClass("ui inverted header covid").text("Recovered");
            $(recovered).append(recoveredText);
            // var dateOfText = $("<h1>").addClass("ui inverted header covid").text(dateOf).attr("style","opacity: 5%;");
            // $("#dateof").append(dateOfText);
        
            // var extend = $("<div>").addClass("ui inverted vertical stripe segment covid");
            // $("#extend").append(extend);

            $('#caseContainer').animate({
              'marginBottom' : "+=300px" //moves down
              },5000);






           
           
      });
    }
});







  // fix menu when passed
  $('.masthead')
    .visibility({
      once: false,
      onBottomPassed: function() {
        $('.fixed.menu').transition('fade in');
      },
      onBottomPassedReverse: function() {
        $('.fixed.menu').transition('fade out');
      }
    });

  // create sidebar and attach to menu open
  $('.ui.sidebar')
    .sidebar('attach events', '.toc.item')
  ;

  $(window).ready(function() {
    $(".ui.text.container").fadeIn(500);
  });
});

