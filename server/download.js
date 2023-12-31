import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando o download do vídeo " + videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        //pegando o valor em milisegundos e convertendo para segundos
        const seconds = info.formats[0].approxDurationMs / 1000
        //caso a o video da url informada tenha mais que 60s vai me gerar um erro
        if (seconds > 60) {
          throw new Error("A duração deste vídeo é maior que 60 segundos.")
        }
      })
      .on("end", () => {
        console.log("Download do vídeo finalizado.")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possivel realizar o download do vídeo. Erro: ",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
