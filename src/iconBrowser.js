import $ from 'jquery'
import M from 'materialize-css'

var jQuery = $;
var iconBrowser = {
  'timer': null,
  'results': [],
};  
var icons = {
  'material':[],
  'font-awesome':[],
};

$.getJSON("data/fa-icons-full.json", function(json) 
{
    icons['font-awesome'] = json; 
    
    $.getJSON("data/md-icons.json", function(json) 
    {
      icons['material'] = json; 

      iconBrowser.search('');

      $('#loadingOverlay').hide();
            
      $(document).on('click', function() {
        $('#iconBrowser').focus();
      })
      $('#iconBrowser').focus();

    });
});

iconBrowser.results = [];

iconBrowser.search = function(term) {
  var i;
  var classname;
  var sub;
  var parent = this;

  this.results = [] // set the results array to an empty state

  $.each( icons['font-awesome'], function( key, icon ) {
     // if the array items name object includes the search term, add its ID to a temporary results array
     if ((icon.name.includes(term) == true) || (icon.keywords.includes(term)) || (term == '')) 
     {
      sub = (icon.styles.includes('brands')) ? 'fab' : 'fa';
      classname = sub+' fa-'+icon.name;
      iconBrowser.results.push({
           'name': icon.name,
           'markup': '<i class="'+classname+'"></i>',
        })
     }
     
  });

  $.each( icons['material'], function( key, icon ) {
     // if the array items name object includes the search term, add its ID to a temporary results array
     if ((icon.search.terms.includes(term) == true) || (key.includes(term)) || (term == '')) {
        iconBrowser.results.push({
           'name': key,
           'markup': '<i class=\"material-icons\">'+key+'</i>',
        })
     }
     
  });

  // initialize the showing of the results
  this.showsearchresults();
}

iconBrowser.showsearchresults = function() {
  var html = "<ul>";
  var i;

  // loop through the array holding results 
  // this will then get the name and write markup for each result
  for (i = 0; i < this.results.length; i++) 
  {
     var html = html + `
      <li class="icon-result-container">
         <a href="#!" class="icon-result" data-key="${this.results[i].name}">
            <div class="markup">${this.results[i].markup}</div> ${this.results[i].name}
         </a>
      </li>`
  }
  html += '</ul>';
  // put the markup of the results on the page
  $('#results').append(html);
  $('#count').html('('+this.results.length + ' icons found)');

  $('.icon-result').on('click', function() 
  {
     var icon = $('.markup', this).html();
     var markup = icon.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
     copyText(icon);
     notify('<p class="center-align">Copied <span style="margin-left: 5px; font-size: 1.5em;">'+icon+'</span> <span class="markup">'+markup+'</span></p>');

     //window.scrollTo(0,0);
     //$('#iconBrowser').focus();

     return false;
  });

  $('body').removeClass('loading');

}


function copyText(text) 
{
   var input = document.createElement('textarea');
   document.body.appendChild(input);
   input.value = text;
   input.select();
   document.execCommand('copy',false);
   input.remove();
}

function notify(message)
{
   M.toast({
      html: message,
      displayLength: 5000
   });
}


export default iconBrowser
