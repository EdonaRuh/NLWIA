import { server } from "./server"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoUrl = input.value
  if (!videoUrl.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece um shorts")
  }

  const [_, params] = videoUrl.split("/shorts/") //separa o conteudo da url para pegar o id que vem depois do /shorts/
  const [videoId] = params.split("?si") //separa novamente o conteudo para evitar que peguemos algo mais alem do id do video

  content.textContent = "Obtendo o texto do audio..."

  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Resumindo...."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
