const express = require("express");
const fs = require('fs');
const app = express();

const port = 3000;

var buffer = new Buffer.alloc(1024);

app.listen(port, () => console.log("server listening at port " + port));

app.use(express.static("public"));
app.use(express.json({
  limit: "1mb"
}))

app.post("/api", (request, response) => {
  //console.log(request.body);
  //console.log(JSON.stringify(request.body));
  const data = JSON.stringify(request.body);

  fs.open('public/nodefiletest/user.json', 'r+', function(err, fd) {
      if (err) {
        return console.error(err);
      }

      console.log("Reading the file");

      fs.read(fd, buffer, 0, buffer.length,
        0,
        function(err, bytes) {
          if (err) {
            console.log(err);
          }

          if (bytes > 0) {
            filecontent = buffer.slice(0, bytes).toString();
            //filecontentnospace = filecontent.replace(/ /g, "")
            filecontentTEMP = filecontent.slice(0, -4);
            console.log(filecontentTEMP);

            fs.writeFile("public/nodefiletest/user.json", filecontentTEMP, (err) => {
              if(err) {
                throw err;
              }

              console.log("TEMP written");
            });

            fs.writeFile("public/nodefiletest/user.json", ","+data + "]}",{
              flag: 'a'
            }, (err) => {
              if (err) {
                throw err;
              }
              console.log("JSON data is saved");
            });

        }
        console.log(bytes + " bytes read");

        // Close the opened file.
        fs.close(fd, function(err) {
          if (err) {
            console.log(err);
          }

          console.log("File closed successfully");
        });
      });
  });

response.json({
  status: 'success'
});
});
