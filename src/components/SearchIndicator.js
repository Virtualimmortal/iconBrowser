
const SearchIndicator = () => {
  return (
    <div id="loadingIndicator">
      <div className="loader">
        <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-blue">
              <div className="circle-clipper left">
                  <div className="circle"></div>
              </div>
              <div className="gap-patch">
                  <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                  <div className="circle"></div>
              </div>
            </div>

            <div className="spinner-layer spinner-red">
              <div className="circle-clipper left">
                  <div className="circle"></div>
              </div><div className="gap-patch">
                  <div className="circle"></div>
              </div><div className="circle-clipper right">
                  <div className="circle"></div>
              </div>
            </div>

            <div className="spinner-layer spinner-yellow">
              <div className="circle-clipper left">
                  <div className="circle"></div>
              </div><div className="gap-patch">
                  <div className="circle"></div>
              </div><div className="circle-clipper right">
                  <div className="circle"></div>
              </div>
            </div>

            <div className="spinner-layer spinner-green">
              <div className="circle-clipper left">
                  <div className="circle"></div>
              </div><div className="gap-patch">
                  <div className="circle"></div>
              </div><div className="circle-clipper right">
                  <div className="circle"></div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SearchIndicator