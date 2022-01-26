/**
* @returns {{initialize: Function, focus: Function, blur: Function}}
*/
geotab.addin.driverList = () => {
  'use strict';

  /* Scope variables */
  let api; // Ref https://github.com/Geotab/mg-api-js
  let state;
  let angularAppInitCheckInterval;

  /**
   * Initialize the add-in
   */
  let initialize = () => {
      console.log("driverList Initialized");
  };

  /**
   * Clears Angular Init check interval
   */
  let clearAngularAppinitCheck = () => {
      clearInterval(angularAppInitCheckInterval);
  };

  let onAppStart = () => {
      api.getSession((result) => {
          angularAppInitCheckInterval = setInterval(() => {
              if(window.myDriverListNgAppRef && window.myDriverListNgAppRef.zone){
                  window.myDriverListNgAppRef.zone.run(() => { window.myDriverListNgAppRef.loadGeoTabSDKData(result.database,result.sessionId,result.database); });
                  clearAngularAppinitCheck();
              }else{
                  console.log("driverList app not ready yet, checking again");
              }
          },500)
      });
  };

  /**
  * Render
  * App Logic
  */
  let render = () => {
        console.log("driverList Rendered");
        onAppStart();
  }

  /**
   * Aborts
   */
  let abort = () => {
      console.log("driverList Aborted");
      clearAngularAppinitCheck();
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
          api = freshApi;
          state = freshState;

          render();
      },

      /*
      * Page lifecycle method: blur is called when the user is leaving your Add-In.
      * Use this function to save state or commit changes to a datastore or release memory.
      */
      blur() {
          abort();
      }
  };
};
