try {
   var autobahn = require('autobahn');
} catch (e) {
   // when running in browser, AutobahnJS will
   // be included without a module system
}

var connection = new autobahn.Connection({
   url: 'ws://127.0.0.1:9000/',
   realm: 'realm1'}
);

connection.onopen = function (session) {

   var received = 0;

   function on_event(args, kwargs, details) {

      console.log("Got event, publication ID " +
                  details.publication + ", publisher " +
                  details.publisher + ": " + args[0]);

      received += 1;
      if (received > 5) {
         console.log("Closing ..");
         connection.close();
      }
   }

   session.subscribe(on_event, 'com.myapp.topic1');
};

connection.open();
