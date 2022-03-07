
import $ from 'jquery'
import iconBrowser from '../iconBrowser'


const SearchForm = () => {

   return (
      <div className="SearchForm">
         <div className="container">
            <div className="row center">

               <h3><i className="fa fa-search"></i> Icon Search</h3>

               <div className="form-group">
                     <input 
                     id="iconBrowser" 
                     className="form-control"
                     type="text" 
                     defaultValue="" 
                     placeholder="Search" 
                     onChange={(e) => SearchForm.updateSearch(e.currentTarget.value)}
                     />
               </div>

               <div id="count"></div>

            </div>

            <div id="results" className="row"></div>
         </div>
      </div>
   )
}

SearchForm.updateSearch = function(text)
{
   clearTimeout(this.timer);
   var term = text.toLowerCase();
   this.timer = setTimeout(function()
   { 
         $('#results').html('');
         iconBrowser.search(term); 
   }, 500);

};


export default SearchForm