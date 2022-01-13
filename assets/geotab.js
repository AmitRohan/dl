/**
* @returns {{initialize: Function, focus: Function, blur: Function}}
*/
geotab.addin.driverList = () => {
  'use strict';

  /* Scope variables */
  let api; // Ref https://github.com/Geotab/mg-api-js
  let state;

  /**
   * Initialize the add-in
   */
  let initialize = () => {
      this.title = "Code Base Initialized"
      console.log(this.title);
  };

  /**
  * Render
  * App Logic
  */
  let render = () => {
        this.title ="Code Base Rendered";
        console.log(this.title);
        // api.call('Get', {
        //     typeName: 'User'
        // }, function (result) {
        //     if (result) {
        //         console.log("USERS Result ",result);
        //     }
        // }, function (err) {
        //     console.error("USERS ERR ",err);
        // });
        const startApplication = () => {        
            api.getSession(function (result) {
                console.log("Session ",result.sessionId);
                console.log("Session ",result.userName);
                console.log("Session ",result.database);
                window.myGeoKruzrNgAppRef.zone.run(() => { window.myGeoKruzrNgAppRef.loadGeoTabSDKData(result.database,result.sessionId,result.database); });  
            }); 
        };
         
        startApplication();
  }

  /**
   * Aborts
   */
  let abort = () => {
      this.title ="Code Base Aborted";
      console.log(this.title);
  };

  return {
      /*
      * Page lifecycle method: initialize is called once when the Add-In first starts
      * Use this function to initialize the Add-In's state such as default values or
      * make API requests (Geotab or external) to ensure interface is ready for the user.
      */
      initialize(freshApi, freshState, callback) {

          api = freshApi;
          state = freshState;

          initialize();
          if (callback) {
              callback();
          }
      },

      /*
      * Page lifecycle method: focus is called when the page has finished initialize method
      * and again when a user leaves and returns to your Add-In that has already been initialized.
      * Use this function to refresh state such as vehicles, zones or exceptions which may have
      * been modified since it was first initialized.
      */
      focus(freshApi, freshState) {
          console.log("Back In AddIn");
          api = freshApi;
          state = freshState;

          render();
      },

      /*
      * Page lifecycle method: blur is called when the user is leaving your Add-In.
      * Use this function to save state or commit changes to a datastore or release memory.
      */
      blur() {
          console.log("Left AddIn");
          abort();
      }
  };
};