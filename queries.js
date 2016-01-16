/* Fill out these functions using Mongoose queries*/
var mongoose = require('mongoose'),
  Listing = require('./ListingSchema.js'),
  config = require('./config');

mongoose.connect(config.db.uri);

var findLibraryWest = function() {
  //find according to schema
  Listing.findOne({name: 'Library West'}, function(err, data){
    if(err) throw err;
    console.log("Data of Library West"+"\n");
    console.log(data+"\n");
  });
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
};
var removeCable = function() {
  Listing.findOne({code: 'CABL'}, function(err, data){
    if(err) throw err;
    console.log("Data of Cable TV"+"\n")
    console.log(data+"\n");
    data.remove(function(err){
      if(err) throw err;
      console.log("Deleted Listing!"+"\n");
    });
  });

  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
};
var updatePhelpsMemorial = function() {

  Listing.findOneAndUpdate({code: 'PHL'},{address: '100 Phelps Lab P.O. Box 116350 Gainesville, FL  32611'},{'new': true}, function(err, data){
    if(err) throw err;
    console.log("Updated PHL"+"\n")
    console.log(data+"\n");
  });
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */
};
var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */
   Listing.find({}, function(err,data){
     if(err) throw err;
     console.log("All listings in the database"+"\n");
     console.log(data+"\n");
   })
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
