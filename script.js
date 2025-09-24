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

  // Pagination 
  document.addEventListener('DOMContentLoaded', function() {
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentPage = 1;

    paginationNumbers.forEach((btn, index) => {
      btn.addEventListener('click', function() {
        if (!this.classList.contains('pagination-ellipsis')) {
          paginationNumbers.forEach(num => num.classList.remove('active'));
          this.classList.add('active');
          currentPage = parseInt(this.textContent);
          updatePaginationState();
        }
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
          currentPage--;
          updateActivePage();
          updatePaginationState();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (currentPage < 10) { 
          currentPage++;
          updateActivePage();
          updatePaginationState();
        }
      });
    }

    function updateActivePage() {
      paginationNumbers.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.textContent) === currentPage) {
          btn.classList.add('active');
        }
      });
    }

    function updatePaginationState() {
      if (prevBtn) prevBtn.disabled = currentPage === 1;
      if (nextBtn) nextBtn.disabled = currentPage === 10; 
    }

    updatePaginationState();
  });


  //pagination
  const cardsPerPage = 10
  const productsWrapper = document.querySelector('.products-wrapper');
  const pagination = document.getElementById('pagination');
  const prevButton = document.querySelector('.pagination-previous');
  const nextButton = document.querySelector('.pagination-next');
  const pageLinks = document.querySelectorAll('.page-link');

  const cards = Array.from(productsWrapper.getElementsByClassName('product-card'));

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  let currentPage = 1;

  function displayPage(page){
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex =  startIndex + cardsPerPage;
    cards.forEach((card, index)=>{
      if(index >= startIndex && index < endIndex){
        card.style.display = 'block';
      }else{
        card.style.display = 'none';
      }
    })
  }

  //pagination update
  function updatePagination(){
    pageNumbers.TextContent = 
      `Page ${currentPage} of ${totalPages}`;
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
      pageLinks.forEach((link)=>{
        const page = parseInt(link.getAttribute('data-page'));
        link.classList.toggle('activate', page === currentPage)
      })
  }

  //previous button event
  prevButton.addEventListener('click', ()=>{
    if(currentPage > 1){
      currentPage--;
      displayPage(currentPage);
      updatePagination();
    }
  });

  //next button event
  nextButton.addEventListener('click', ()=>{
    if(currentPage < totalPages){
      currentPage++;
      displayPage(currentPage);
      updatePagination()
    }
  })
  
  //page number event
  pageLinks.forEach((link)=>{
    link.addEventListener(click, (e)=>{
      e.preventDefault();
      const page = parseInt(link.getAttribute('data-page'));
      if(page !== currentPage){
        currentPage = page;
        displayPage(currentPage);
        updatePagination();
      }
    });
  });

  //initial display
  displayPage(currentPage);
  updatePagination();