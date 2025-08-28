document.addEventListener("DOMContentLoaded", function () {
  const fadeContainers = document.querySelectorAll(".omds__image-fade");

  fadeContainers.forEach((container) => {
    const images = container.querySelectorAll("img");
    let currentImageIndex = 0;

    // Mostra a primeira imagem
    images[currentImageIndex].classList.add("active");

    // Função para trocar as imagens
    function fadeNextImage() {
      // Remove a classe 'active' da imagem atual
      images[currentImageIndex].classList.remove("active");

      // Calcula o índice da próxima imagem
      currentImageIndex = (currentImageIndex + 1) % images.length;

      // Adiciona a classe 'active' à próxima imagem
      images[currentImageIndex].classList.add("active");
    }

    // Define o intervalo para trocar as imagens (ex: 3 segundos)
    setInterval(fadeNextImage, 5000);
  });
});