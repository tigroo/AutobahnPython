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

   function add_complex(args, kwargs) {
      console.log("Someone is calling me;)");
      return new autobahn.Result([], {c: args[0] + args[2], ci: args[1] + args[3]});
   }

   session.register(add_complex, 'com.myapp.add_complex').then(
      function (registration) {
         console.log("Procedure registered:", registration.id);
      },
      function (error) {
         console.log("Registration failed:", error);
      }
   );

   function split_name(args) {
      return new autobahn.Result(args[0].split(" "));
   }

   session.register(split_name, 'com.myapp.split_name').then(
      function (registration) {
         console.log("Procedure registered:", registration.id);
      },
      function (error) {
         console.log("Registration failed:", error);
      }
   );
};

connection.open();
