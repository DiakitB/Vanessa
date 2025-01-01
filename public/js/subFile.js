// subFile.js

// Function to show the delete modal
function showDeleteModal(fileId) {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'block';
    deleteModal.setAttribute('data-file-id', fileId);
  }
  
  // Function to close the delete modal
  function closeDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'none';
  }
  
  // Function to confirm delete action
  function confirmDelete() {
    const deleteModal = document.getElementById('deleteModal');
    const fileId = deleteModal.getAttribute('data-file-id');
    
    // Perform the delete action (e.g., send a request to the server)
    // Example using fetch API:
    fetch(`/file/delet/${fileId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Handle successful delete (e.g., remove the row from the table)
        const row = document.querySelector(`tr[data-file-id="${fileId}"]`);
        if (row) {
          row.remove();
        }
        closeDeleteModal();
      } else {
        // Handle error
        console.error('Failed to delete file');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  // Ensure the modal is hidden by default and set up event listeners
  document.addEventListener('DOMContentLoaded', () => {
    closeDeleteModal();
  
    // Set up event listeners for delete buttons
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const fileId = event.currentTarget.getAttribute('data-file-id');
        showDeleteModal(fileId);
      });
    });
  
    // Set up event listeners for modal buttons
    document.getElementById('closeDeleteModalButton').addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDeleteButton').addEventListener('click', closeDeleteModal);
    document.getElementById('confirmDeleteButton').addEventListener('click', confirmDelete);
  });

