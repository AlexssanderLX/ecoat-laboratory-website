Coloque aqui o video do mergulho:
  process.mp4   (obrigatorio - Safari/Chrome)
  process.webm  (opcional - melhor compressao)

O componente ProcessStory ja aponta pra estes arquivos e passa a
scrubar (rolagem = mergulho) automaticamente quando eles existirem.

Primeiro teste: solte so o process.mp4 cru do Kling/Luma.
Se o scrub ficar "travadinho", a gente reencoda all-keyframe:
  ffmpeg -i bruto.mp4 -an -vf "scale=1600:-2,fps=30" -c:v libx264 -preset slow -crf 20 \
    -x264-params "keyint=1:min-keyint=1:scenecut=0" -movflags +faststart process.mp4
