import mongoose from "mongoose";
import initApp from "./app";

const app = initApp();

const port = process.env.PORT || "5000";

app.set("port", port);

//connect to database
mongoose
  .connect("mongodb://localhost:27017/newsletter")
  .then(
    () => { console.log("Database connected Successfully"); },
    (err) => { console.error(err); }
  );


app.listen(port, () => console.log("Listening on " + port));
