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
  let onAppStart = () => {
      title = "driverList Initialized"
      console.log(title);
  };

  /**
  * Render
  * App Logic
  */
  let onAppLoad = () => {
        title ="driverList Rendered";
        console.log(title);
        // api.call('Get', {
        //     typeName: 'User'
        // }, function (result) {
        //     if (result) {
        //         console.log("USERS Result ",result);
        //     }
        // }, function (err) {
        //     console.error("USERS ERR ",err);
        // });
        startApplication();
  }

    /**
     * Aborts
     */
    let onAppClose = () => {
        title ="driverList Aborted";
        console.log(title);
        clearAngularAppinitCheck();
    };

    /**
    * Clears Angular Init check interval
    */
    let clearAngularAppinitCheck = () => {
        clearInterval(angularAppInitCheckInterval);
    };

    let onAppStart = () => {        
        api.getSession((result) => {
            console.log("Session ",result.sessionId);
            console.log("Session ",result.userName);
            console.log("Session ",result.database);
            angularAppInitCheckInterval = setInterval(() => {
                if(window.myDriverListNgAppRef && window.myDriverListNgAppRef.zone){
                    window.myDriverListNgAppRef.zone.run(() => { window.myDriverListNgAppRef.loadGeoTabSDKData(result.database,result.sessionId,result.database); });
                    this.clearAngularAppinitCheck();
                }else{
                    console.log("driverList app not ready yet, checking again");
                }
            },500)
        }); 
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

          onAppStart();
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

          onAppLoad();
      },

      /*
      * Page lifecycle method: blur is called when the user is leaving your Add-In.
      * Use this function to save state or commit changes to a datastore or release memory.
      */
      blur() {
          onAppClose();
      }
  };
};