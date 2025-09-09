
  const parts = document.querySelectorAll('.article-part');
  let currentPart = 0;

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressBar = document.getElementById('progressBar');
  const congratsModalEl = document.getElementById('congratsModal');
  const congratsModal = new bootstrap.Modal(congratsModalEl);

  function showPart(index) {
    // Hide current part with animation
    parts[currentPart].classList.remove('active');
    
    setTimeout(() => {
      // Hide all parts
      parts.forEach(part => {
        part.classList.remove('active');
      });
      
      // Show new part
      parts[index].classList.add('active');
      currentPart = index;

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === parts.length - 1;

      let progress = ((index + 1) / parts.length) * 100;
      progressBar.style.width = progress + "%";

      // Show popup when last part is reached
      if (index === parts.length - 1) {
        setTimeout(() => {
          congratsModal.show();
        }, 500);
      }
    }, 150); // Wait for fade out before switching content
  }

  prevBtn.addEventListener('click', () => {
    if (currentPart > 0) {
      showPart(currentPart - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPart < parts.length - 1) {
      showPart(currentPart + 1);
    }
  });

  // Reset to first part when modal is closed
  congratsModalEl.addEventListener('hidden.bs.modal', function() {
    showPart(0);
  });

  // Image loader
  const img = document.getElementById("articleImg");
  const skeleton = document.getElementById("imgSkeleton");
  img.onload = function() {
    skeleton.style.display = "none";
    img.style.display = "block";
  };

  // Initialize
  showPart(currentPart);
