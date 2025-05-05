// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Form validation
    const form = document.getElementById('registrationForm');
    
    // Add input event listeners for real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            // Collect form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                eventType: document.getElementById('eventType').value,
                eventDate: document.getElementById('eventDate').value,
                specialRequirements: document.getElementById('specialRequirements').value,
                lunchOption: document.getElementById('lunchOption').checked,
                materialsOption: document.getElementById('materialsOption').checked
            };

            // Here you would typically send the data to a server
            console.log('Form Data:', formData);
            
            // Show success message
            showAlert('Registration successful! Thank you for registering.', 'success');
            
            // Reset form
            form.reset();
        }
    });
});

// Validate individual input
function validateInput(input) {
    if (input.validity.valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}

// Validate entire form
function validateForm() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.validity.valid) {
            isValid = false;
            input.classList.add('is-invalid');
        }
    });

    return isValid;
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const form = document.getElementById('registrationForm');
    form.parentNode.insertBefore(alertDiv, form);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Phone number validation
document.getElementById('phone').addEventListener('input', function(e) {
    // Remove any non-digit characters
    let value = e.target.value.replace(/\D/g, '');
    
    // Format phone number as (XXX) XXX-XXXX
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    e.target.value = value;
}); 