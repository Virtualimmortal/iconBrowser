import $ from 'jquery'
import M from 'materialize-css'

var jQuery = $;
var iconBrowser = {
  'results': [],
};  
var icons = {
  'material':[],
  'font-awesome':[],
  'sources': {
    'dev': {
      'fa': '//vi.local/cdn/font-awesome/5.13.0/metadata/fa-icons-full.json',
      'md': '//vi.local/cdn/material-design-icons/3.0.1/metadata.json',
    },
    'prod': {
      'fa': 'data/fa-icons-full.json',
      'md': 'data/md-icons.json',
    }
  }
};

/**
 * Initialize page components
 */
document.addEventListener('DOMContentLoaded', function() 
{
  /**
   * Ctrl+f - Search
   */
  $(window).bind('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch (String.fromCharCode(e.which).toLowerCase()) {
          case 'f':
            e.preventDefault();
            window.scrollTo(0,0);
            $('#iconBrowser').focus();      
            break;
        }
    }
});

  /**
   * Floating Action Menu
   */
  var elems = document.querySelectorAll('.fixed-action-btn');
  var fixedActionButtons = M.FloatingActionButton.init(elems, {
    'hoverEnabled': false,
  });

  $('#floatingActionMenu .searchBtn').on('click', function(e) {
    e.preventDefault();
    window.scrollTo(0,0);
    $('#iconBrowser').focus();
    fixedActionButtons[0].close();
  })

  $('#floatingActionMenu .toTopBtn').on('click', function(e) {
    e.preventDefault();
    window.scrollTo(0,0);
    fixedActionButtons[0].close();
  })

  $('#floatingActionMenu .toBottomBtn').on('click', function(e) {
    e.preventDefault();
    window.scrollTo(0,document.body.scrollHeight);
    fixedActionButtons[0].close();
  })

});

/**
 * Import Json data
 */
var faJsonFile = icons.sources.prod.fa;
var mdJsonFile = icons.sources.prod.md;

if (window.location.href.includes(':3000/'))
{
  faJsonFile = icons.sources.dev.fa;
  mdJsonFile = icons.sources.dev.md;
}

$.getJSON(faJsonFile, function(json) 
{
    icons['font-awesome'] = json; 
    
    $.getJSON(mdJsonFile, function(json) 
    {
      icons['material'] = json; 

      iconBrowser.search('');

      $('#loadingOverlay').fadeOut(600, function() { $(this).css('display', 'none')});
      
      $('#iconBrowser').focus();

    });
});


/**
 * Search and sort results in to alphabetical array
 */
iconBrowser.search = function(term) {
  var i;
  var classname;
  var sub;
  var parent = this;

  $.each( icons['font-awesome'], function( key, icon ) {
     // if the array items name object includes the search term, add its ID to a temporary results array
     if ((icon.name.includes(term) == true) || (icon.keywords.includes(term)) || (term == '')) 
     {
        icon.name.replace(' ', '');
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

  iconBrowser.results.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

  // initialize the showing of the results
  this.showSearchResults();
}


/**
 * Display search results
 */
iconBrowser.showSearchResults = function() {
  var html = "<ul>";
  var i;

  // loop through the array holding results 
  // this will then get the name and write markup for each result
  for (i = 0; i < this.results.length; i++) 
  {
     var html = html + `<li class="icon-result-container"><a href="#!" class="icon-result" data-key="${this.results[i].name}"><div class="markup">${this.results[i].markup}</div><div class="label">${this.results[i].name}</div></a></li>`
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