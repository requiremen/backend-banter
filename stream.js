const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;
app.get("/download", async (req, res) => {
  const cdnurl ="https://storage.cdnframe.com/cdn-yt-g634mnkhf/JZ3xgbdl_Mw/320.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=NoxBld6j6hfLPRSadWnB%2F20260613%2Fnl-east-host02%2Fs3%2Faws4_request&X-Amz-Date=20260613T102206Z&X-Amz-Expires=600&X-Amz-Signature=5a9f9636283f9bdf71022c904d4b577e5a3602361d843d276caf413c5d6f23c0&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22No%20Signal.mp3%22&x-amz-checksum-mode=ENABLED&x-id=GetObject";

  try {
    const response = await axios.get(cdnurl, {
      responseType: "stream",
    });

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", 'attachment; filename="No Signal.mp3"');

    response.data.on("error", (err) => {
      console.error(err);
      if (!res.headersSent) res.status(500).end();
    });

    response.data.pipe(res);
  } catch (err) {
    console.error(err.message);
    const status = err.response?.status || 500;
    res.status(status).json({ msg: err.message });
  }
});





app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
