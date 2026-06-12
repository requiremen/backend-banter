const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.get("/download", async (req, res) => {
    const cdnurl = "https://storage.cdnframe.com/cdn-yt-g634mnkhf/JZ3xgbdl_Mw/320.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=NoxBld6j6hfLPRSadWnB%2F20260612%2Fnl-east-host02%2Fs3%2Faws4_request&X-Amz-Date=20260612T163017Z&X-Amz-Expires=600&X-Amz-Signature=e1ac31d86108eace568b38aa898cf184b8f70bf6a8ca6f1e16958980e97328af&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22No%20Signal.mp3%22&x-amz-checksum-mode=ENABLED&x-id=GetObject";
    try {
        const response = await axios.get(cdnurl, {
            responseType: "stream",
        });
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="No Signal.mp3"'
        );
        response.data.pipe(res);
        response.data.on("error", (err) => {
            console.error(err);
            if (!res.headersSent) {
                res.status(500).send("Stream error");
            }
        });
    } catch (err) {
        console.error(err);
        const status = err.response?.status || 500;
        res.status(status).send(err.response?.statusText || "Download failed");
    }
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
