//showing and hiding password
function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.querySelector(".toggle-password");
    
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.src = "./assets/eye.png"; 
    } else {
      passwordInput.type = "password";
      toggleIcon.src= "./assets/eye.png";
    }
  }
  function toggleConfirmPassword() {
    const confirmPasswordInput = document.getElementById("confirm-password");
    const toggleIcon = document.querySelector(".toggle-confirm-password");
    
    if (confirmPasswordInput.type === "password") {
      confirmPasswordInput.type = "text";
      toggleIcon.src = "./assets/eye.png"; 
    } else {
      confirmPasswordInput.type = "password";
      toggleIcon.src = "./assets/eye.png";
    }
  }

  // uploading and removing image
  document.addEventListener('DOMContentLoaded', function() {
    const avatarInput = document.getElementById('avatar');
    const avatarPreview = document.getElementById('avatar-preview');
    const uploadLink = document.querySelector('.upload-link');
    const removeLink = document.querySelector('.remove-link');

   
    avatarInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file.');
          return;
        }
        
        
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB.');
          return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
          avatarPreview.src = e.target.result;
          showRemoveLink();
        };
        reader.readAsDataURL(file);
      }
    });

    avatarPreview.addEventListener('click', function() {
      avatarInput.click();
    });

    function showRemoveLink() {
      removeLink.style.display = 'block';
    }

    function hideRemoveLink() {
      removeLink.style.display = 'none';
    }


      window.removeAvatar = function() {
      avatarPreview.src = './assets/upload-img.png';
      avatarInput.value = '';
      hideRemoveLink();
    };
  });


  
const cardsPerPage = 10;
const productsWrapper = document.querySelector('.products-wrapper');
const pagination = document.getElementById('pagination');
const prevButton = document.querySelector('.pagination-previous');
const nextButton = document.querySelector('.pagination-next');
const pageLinks = document.querySelectorAll('.page-link');
const pageNumbers = document.getElementById('page-numbers');

const cards = productsWrapper ? Array.from(productsWrapper.getElementsByClassName('product-card')) : [];
const totalPages = Math.max(1, Math.ceil(cards.length / cardsPerPage));
let currentPage = 1;

function displayPage(page) {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  cards.forEach((card, index) => {
    card.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
  });
}

function updatePagination() {
  if (pageNumbers) pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;

  if (prevButton) {
    prevButton.style.opacity = currentPage === 1 ? '0.5' : '1';
    prevButton.style.pointerEvents = currentPage === 1 ? 'none' : 'auto';
    prevButton.setAttribute('aria-disabled', currentPage === 1 ? 'true' : 'false');
  }

  if (nextButton) {
    nextButton.style.opacity = currentPage === totalPages ? '0.5' : '1';
    nextButton.style.pointerEvents = currentPage === totalPages ? 'none' : 'auto';
    nextButton.setAttribute('aria-disabled', currentPage === totalPages ? 'true' : 'false');
  }

  pageLinks.forEach(link => {
    const page = parseInt(link.getAttribute('data-page'), 10);
    if (!Number.isNaN(page)) link.classList.toggle('active', page === currentPage);
  });
}

if (prevButton) {
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
      updatePagination();
    }
  });
}

if (nextButton) {
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(currentPage);
      updatePagination();
    }
  });
}

pageLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = parseInt(link.getAttribute('data-page'), 10);
    if (Number.isNaN(page) || page === currentPage) return;
    currentPage = page;
    displayPage(currentPage);
    updatePagination();
  });
});

// initial
displayPage(currentPage);
updatePagination();
