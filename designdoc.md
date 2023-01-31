**# WDB BACKEND RECRUITMENT PROJECT DESIGN DOCUMENT**


OVERVIEW: 

    STACK:
        MongoDB / JavaScript with Node.js
        
    FUNCTIONAL PROPERTIES:
        * REGISTER UNICORN 
        * GET ALL UNICORNS
        * UNICORN COLOR FILTER (INDUSTRY)
        * RIDE UNICORN
        * GET LONGEST RIDER
        * UPDATING UNICORN REGISTRY (NOT IN SPEC, ADDITIONAL)
        * DELETE UNICORN RIDE HISTORY (NOT IN SPEC, ADDITIONAL)
    
    NON-FUNCTIONAL PROPERTIES:
        * UNICORN RIDE CONDITION CHECK (INDUSTRY)
        * ADOPT UNICORN (INDUSTRY)
        * GET ADOPTED UNICORNS (INDUSTRY)


DESIGN / ARCHITECTURAL CHOICES:

    This API utilizes 3 routes (unicorns, rideLogs, and longest-rider) and 2 Schemas (rideLog and unicorn) which can be described as follows:

    ROUTING: 
        *UNICORNS
         Unicorns route handles all requests related to unicorns. Handling unicorn data and unicorn rides separately is a design choice because they don't share any information that the other one requires to listen and make changes. Thus, saving them separately prevents complexity and provides ease of use for both routes. Also a PATCH request is present to update registered unicorns which was not included in the spec, because it added additional support during the development/testing to the developer. Unicorns route utilize an async function called "getUnicorn" in every request except POST for modular development purposes. getUnicorn method identifies the wanted unicorn through its ID, and passes it to the appropriate request handlers. 
        
        *RIDELOGS
        RideLogs route handles requests related for riding unicorns. Having a separate route to handle unicorn ride requests is beneficial in terms of modular development, and provides ease to the developer when requests for the longest riden unicorn is made. It does not listen to the unicorns route because we don't intent to make changes to unicorn properties after they are riden, but similar to the unicorn route, it utilizes a similar "getRideLog" async function to delete the given ride log, which was not a part of the spec, but there to help developer for testing. 
        
        *LONGEST-RIDER
        LongestRider route listens to changes in only ride logs, because no additional futures of a unicorn that is not present in rideLogs, but in unicorns are necessary in terms of the scope of the project. When the longest rider of a given unicorn is asked, it searches RideLog database for the given unicorn, sorts by duration, then user alphabetical name with the appropriate limit to present the longest rider to the user. This method is prefered instead of aggregates, because its faster. 

    SCHEMAS:

        *RIDELOG
        Represents the data of each ride, including user, unicorn, and duration all of which are required. Client is provided with the appropriate error message if every field is not provided. 

        *UNICORN
        Represents the data of each unicorn, including name, fur, hornLength, isBaby, and owner all of which except owner are required. Client is provided with the appropriate error message if required fields are not provided. 

    ERROR CODES:

        *500 is presented to the client when an error occurs during a call to the database, and the problem is on our server's side.

        *201 is presented to the client when the object that the client wants to create is successfully created used with POST routes specifically. 

        *404 is presented to the client when the error is on the client's side. It is used when a certain ride log or a certain unicorn is requested with typos or other possible errors.

        *400 is presented to the client when the user provides the client with bad data. 

        404 error code is followed by user-friendly error codes since it's error message can create confusion on the user. 